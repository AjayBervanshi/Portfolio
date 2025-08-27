-- Apply security patch to the secure_insert_notification_log function

CREATE OR REPLACE FUNCTION public.secure_insert_notification_log(
    p_message_id uuid,
    p_recipient_type text,
    p_channel text,
    p_recipient_email text DEFAULT NULL::text,
    p_recipient_phone text DEFAULT NULL::text,
    p_status text DEFAULT 'sent'::text,
    p_error text DEFAULT NULL::text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public -- This locks the search path, resolving the security warning.
AS $function$
DECLARE
  new_log_id UUID;
BEGIN
  -- Using a fully qualified table name (public.notification_logs) for added security.
  INSERT INTO public.notification_logs (
    message_id,
    recipient_type,
    channel,
    recipient_email,
    recipient_phone,
    status,
    error
  )
  VALUES (
    p_message_id,
    p_recipient_type,
    p_channel,
    p_recipient_email,
    p_recipient_phone,
    p_status,
    p_error
  )
  RETURNING id INTO new_log_id;

  RETURN new_log_id;
END;
$function$;
