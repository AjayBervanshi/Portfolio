-- SECURITY FIX: Update RLS policies to restrict public access while maintaining form functionality
-- The secure_insert_message_v2 function is SECURITY DEFINER so it will still work

-- Drop overly permissive policies on messages table
DROP POLICY IF EXISTS "Allow service_role insert messages" ON public.messages;
DROP POLICY IF EXISTS "Restrict messages SELECT to service_role" ON public.messages;
DROP POLICY IF EXISTS "public_read_messages" ON public.messages;
DROP POLICY IF EXISTS "public_write_messages" ON public.messages;

-- Drop overly permissive policies on notification_logs table  
DROP POLICY IF EXISTS "Allow service_role insert notification_logs" ON public.notification_logs;
DROP POLICY IF EXISTS "Restrict notification_logs SELECT to service_role" ON public.notification_logs;
DROP POLICY IF EXISTS "public_read_notification_logs" ON public.notification_logs;
DROP POLICY IF EXISTS "public_write_notification_logs" ON public.notification_logs;

-- Drop overly permissive policies on rate_limits table
DROP POLICY IF EXISTS "Allow service_role all on rate_limits" ON public.rate_limits;
DROP POLICY IF EXISTS "public_rate_limits_policy" ON public.rate_limits;
DROP POLICY IF EXISTS "public_read_rate_limits" ON public.rate_limits;
DROP POLICY IF EXISTS "public_write_rate_limits" ON public.rate_limits;

-- Create strict service-role-only policies for messages
-- These are safe because secure_insert_message_v2 is SECURITY DEFINER
CREATE POLICY "service_role_full_access_messages"
  ON public.messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create strict service-role-only policies for notification_logs
CREATE POLICY "service_role_full_access_notification_logs"
  ON public.notification_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create strict service-role-only policies for rate_limits
CREATE POLICY "service_role_full_access_rate_limits"
  ON public.rate_limits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_visitor_id ON public.messages(visitor_id) WHERE visitor_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_notification_logs_created_at ON public.notification_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notification_logs_message_id ON public.notification_logs(message_id) WHERE message_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action ON public.rate_limits(identifier, action);

-- Revoke public access as defense in depth
REVOKE ALL ON public.messages FROM anon, authenticated;
REVOKE ALL ON public.notification_logs FROM anon, authenticated;
REVOKE ALL ON public.rate_limits FROM anon, authenticated;

-- Grant only service_role full access
GRANT ALL ON public.messages TO service_role;
GRANT ALL ON public.notification_logs TO service_role;
GRANT ALL ON public.rate_limits TO service_role;