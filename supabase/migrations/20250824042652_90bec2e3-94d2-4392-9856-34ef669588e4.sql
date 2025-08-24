-- Fix critical rate limiting bug - properly increment attempts
CREATE OR REPLACE FUNCTION public.check_rate_limit(p_identifier text, p_action text, p_max_attempts integer DEFAULT 5, p_window_minutes integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
  
  -- FIXED: Properly record this attempt with incremented counter
  INSERT INTO public.rate_limits (identifier, action, attempts, window_start)
  VALUES (p_identifier, p_action, 1, now())
  ON CONFLICT (identifier, action, window_start) 
  DO UPDATE SET attempts = rate_limits.attempts + 1;
  
  RETURN TRUE;
END;
$function$;

-- Add unique constraint to prevent race conditions
ALTER TABLE public.rate_limits 
ADD CONSTRAINT unique_rate_limit_entry 
UNIQUE (identifier, action, window_start);

-- Lock down PII tables - remove permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Anyone can insert notification logs" ON public.notification_logs;
DROP POLICY IF EXISTS "Anyone can insert visitor data" ON public.visitors;

-- Create secure policies that only allow the edge function (service role) to insert
CREATE POLICY "Service role can insert messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (current_setting('role') = 'service_role');

CREATE POLICY "Service role can insert notification logs" 
ON public.notification_logs 
FOR INSERT 
WITH CHECK (current_setting('role') = 'service_role');

CREATE POLICY "Service role can insert visitor data" 
ON public.visitors 
FOR INSERT 
WITH CHECK (current_setting('role') = 'service_role');

-- Add input size limits to prevent abuse
ALTER TABLE public.messages 
ADD CONSTRAINT message_size_limit CHECK (length(message) <= 5000),
ADD CONSTRAINT name_size_limit CHECK (length(name) <= 100),
ADD CONSTRAINT email_size_limit CHECK (length(email) <= 320),
ADD CONSTRAINT subject_size_limit CHECK (length(subject) <= 200),
ADD CONSTRAINT phone_size_limit CHECK (length(phone) <= 20);

-- Update secure functions to include additional validation
CREATE OR REPLACE FUNCTION public.secure_insert_message(p_name text, p_email text, p_phone text, p_subject text, p_message text, p_visitor_id uuid DEFAULT NULL::uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  message_id UUID;
BEGIN
  -- Enhanced server-side validation
  IF LENGTH(TRIM(p_name)) < 2 OR LENGTH(TRIM(p_name)) > 100 THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR LENGTH(p_email) > 320 THEN
    RAISE EXCEPTION 'Invalid email format or too long';
  END IF;
  
  IF LENGTH(TRIM(p_subject)) < 5 OR LENGTH(TRIM(p_subject)) > 200 THEN
    RAISE EXCEPTION 'Subject must be between 5 and 200 characters';
  END IF;
  
  IF LENGTH(TRIM(p_message)) < 10 OR LENGTH(TRIM(p_message)) > 5000 THEN
    RAISE EXCEPTION 'Message must be between 10 and 5000 characters';
  END IF;
  
  IF p_phone IS NOT NULL AND LENGTH(TRIM(p_phone)) > 20 THEN
    RAISE EXCEPTION 'Phone number too long';
  END IF;
  
  -- Sanitize inputs
  p_name := TRIM(p_name);
  p_email := TRIM(LOWER(p_email));
  p_phone := TRIM(p_phone);
  p_subject := TRIM(p_subject);
  p_message := TRIM(p_message);
  
  -- Insert message
  INSERT INTO public.messages (name, email, phone, subject, message, visitor_id)
  VALUES (p_name, p_email, p_phone, p_subject, p_message, p_visitor_id)
  RETURNING id INTO message_id;
  
  RETURN message_id;
END;
$function$;