-- Update the secure_insert_message_v2 function to handle non-UUID visitor IDs gracefully
CREATE OR REPLACE FUNCTION public.secure_insert_message_v2(
  p_name text,
  p_email text,
  p_subject text,
  p_message text,
  p_phone text DEFAULT NULL::text,
  p_visitor_id text DEFAULT NULL::text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  message_id UUID;
  visitor_uuid UUID;
  client_ip TEXT;
BEGIN
  -- Get client IP for rate limiting
  client_ip := COALESCE(
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'x-real-ip',
    'unknown'
  );

  -- Rate limiting: max 3 messages per IP per hour
  IF NOT check_rate_limit(client_ip, 'contact_form', 3, 60) THEN
    RETURN 'Error: Too many messages sent. Please wait before sending another message.';
  END IF;

  -- Enhanced validation
  IF LENGTH(TRIM(p_name)) < 2 OR LENGTH(TRIM(p_name)) > 100 THEN
    RETURN 'Error: Name must be between 2 and 100 characters';
  END IF;

  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR LENGTH(p_email) > 320 THEN
    RETURN 'Error: Invalid email format or too long';
  END IF;

  IF LENGTH(TRIM(p_subject)) < 5 OR LENGTH(TRIM(p_subject)) > 200 THEN
    RETURN 'Error: Subject must be between 5 and 200 characters';
  END IF;

  IF LENGTH(TRIM(p_message)) < 10 OR LENGTH(TRIM(p_message)) > 5000 THEN
    RETURN 'Error: Message must be between 10 and 5000 characters';
  END IF;

  IF p_phone IS NOT NULL AND LENGTH(TRIM(p_phone)) > 20 THEN
    RETURN 'Error: Phone number too long';
  END IF;

  -- Content filtering (basic spam detection)
  IF p_message ~* '(viagra|casino|lottery|win money|click here|buy now)' THEN
    RETURN 'Error: Message content not allowed';
  END IF;

  -- Convert visitor_id to UUID only if it's a valid UUID format
  -- Otherwise, set to NULL (fallback IDs will be ignored)
  visitor_uuid := NULL;
  IF p_visitor_id IS NOT NULL AND p_visitor_id != '' AND p_visitor_id !~ '^fallback-' THEN
    BEGIN
      visitor_uuid := p_visitor_id::UUID;
    EXCEPTION WHEN invalid_text_representation THEN
      -- Silently ignore invalid UUIDs instead of returning an error
      visitor_uuid := NULL;
    END;
  END IF;

  -- Sanitize inputs
  p_name := TRIM(p_name);
  p_email := TRIM(LOWER(p_email));
  p_phone := TRIM(p_phone);
  p_subject := TRIM(p_subject);
  p_message := TRIM(p_message);

  -- Insert message with enhanced security
  INSERT INTO public.messages (name, email, phone, subject, message, visitor_id)
  VALUES (p_name, p_email, p_phone, p_subject, p_message, visitor_uuid)
  RETURNING id INTO message_id;

  RETURN message_id::text;
END;
$function$;