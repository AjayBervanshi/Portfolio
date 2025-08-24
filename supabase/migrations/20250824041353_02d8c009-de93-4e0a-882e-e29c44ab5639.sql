-- Drop overly permissive SELECT policies that expose PII
DROP POLICY IF EXISTS "Messages are publicly readable" ON public.messages;
DROP POLICY IF EXISTS "Notification logs are publicly readable" ON public.notification_logs;
DROP POLICY IF EXISTS "Visitors are publicly readable" ON public.visitors;

-- Create a service role function for secure data insertion
CREATE OR REPLACE FUNCTION public.secure_insert_message(
  p_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_subject TEXT,
  p_message TEXT,
  p_visitor_id UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  message_id UUID;
BEGIN
  -- Server-side validation
  IF LENGTH(TRIM(p_name)) < 2 THEN
    RAISE EXCEPTION 'Name must be at least 2 characters';
  END IF;
  
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  IF LENGTH(TRIM(p_subject)) < 5 THEN
    RAISE EXCEPTION 'Subject must be at least 5 characters';
  END IF;
  
  IF LENGTH(TRIM(p_message)) < 10 THEN
    RAISE EXCEPTION 'Message must be at least 10 characters';
  END IF;
  
  -- Insert message
  INSERT INTO public.messages (name, email, phone, subject, message, visitor_id)
  VALUES (TRIM(p_name), TRIM(p_email), TRIM(p_phone), TRIM(p_subject), TRIM(p_message), p_visitor_id)
  RETURNING id INTO message_id;
  
  RETURN message_id;
END;
$$;

-- Create function for secure notification logging
CREATE OR REPLACE FUNCTION public.secure_insert_notification_log(
  p_message_id UUID,
  p_recipient_type TEXT,
  p_channel TEXT,
  p_recipient_email TEXT DEFAULT NULL,
  p_recipient_phone TEXT DEFAULT NULL,
  p_status TEXT DEFAULT 'sent',
  p_error TEXT DEFAULT NULL,
  p_provider_type TEXT DEFAULT 'notificationapi',
  p_provider_message_id TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.notification_logs (
    message_id, recipient_type, channel, recipient_email, 
    recipient_phone, status, error, provider_type, provider_message_id
  )
  VALUES (
    p_message_id, p_recipient_type, p_channel, p_recipient_email,
    p_recipient_phone, p_status, p_error, p_provider_type, p_provider_message_id
  )
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- IP or email
  action TEXT NOT NULL, -- contact_form, etc.
  attempts INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for efficient rate limit lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action ON public.rate_limits(identifier, action);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start ON public.rate_limits(window_start);

-- Enable RLS on rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier TEXT,
  p_action TEXT,
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_attempts INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Calculate window start time
  window_start := now() - (p_window_minutes || ' minutes')::INTERVAL;
  
  -- Clean up old rate limit records
  DELETE FROM public.rate_limits 
  WHERE window_start < window_start;
  
  -- Get current attempts in window
  SELECT COALESCE(SUM(attempts), 0) INTO current_attempts
  FROM public.rate_limits
  WHERE identifier = p_identifier 
    AND action = p_action 
    AND window_start >= window_start;
  
  -- Check if rate limit exceeded
  IF current_attempts >= p_max_attempts THEN
    RETURN FALSE;
  END IF;
  
  -- Record this attempt
  INSERT INTO public.rate_limits (identifier, action, window_start)
  VALUES (p_identifier, p_action, now())
  ON CONFLICT (id) DO NOTHING;
  
  RETURN TRUE;
END;
$$;