
-- Fix visitors table: Drop restrictive INSERT policies and create permissive ones
DROP POLICY IF EXISTS "Allow anon insert visitors" ON public.visitors;
DROP POLICY IF EXISTS "Allow authenticated insert visitors" ON public.visitors;

CREATE POLICY "Allow anon insert visitors"
ON public.visitors
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated insert visitors"
ON public.visitors
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Fix messages table: Add explicit deny for public SELECT (only service_role can read)
-- Drop existing restrictive policy
DROP POLICY IF EXISTS "service_role_full_access_messages" ON public.messages;

-- Create permissive policy for service_role only
CREATE POLICY "service_role_full_access_messages"
ON public.messages
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Fix notification_logs table similarly
DROP POLICY IF EXISTS "service_role_full_access_notification_logs" ON public.notification_logs;

CREATE POLICY "service_role_full_access_notification_logs"
ON public.notification_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Fix rate_limits table similarly
DROP POLICY IF EXISTS "service_role_full_access_rate_limits" ON public.rate_limits;

CREATE POLICY "service_role_full_access_rate_limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
