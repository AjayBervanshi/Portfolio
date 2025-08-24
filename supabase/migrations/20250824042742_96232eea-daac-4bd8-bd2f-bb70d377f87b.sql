-- Fix the remaining RLS policy issues identified by security scan
-- Add missing SELECT policies for all tables to prevent public access

-- Messages table - prevent public access to PII
CREATE POLICY "Block public access to messages" 
ON public.messages 
FOR SELECT 
USING (false);

-- Notification logs table - prevent public access to notification data
CREATE POLICY "Block public access to notification logs" 
ON public.notification_logs 
FOR SELECT 
USING (false);

-- Visitors table - prevent public access to visitor tracking data
CREATE POLICY "Block public access to visitors" 
ON public.visitors 
FOR SELECT 
USING (false);

-- Rate limits table - secure against manipulation
CREATE POLICY "Block public access to rate limits" 
ON public.rate_limits 
FOR ALL 
USING (false);

-- Only allow service role to manage rate limits
CREATE POLICY "Service role can manage rate limits" 
ON public.rate_limits 
FOR ALL 
TO service_role 
USING (true);

-- Drop existing permissive policies if they exist
DROP POLICY IF EXISTS "Service role can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Service role can insert notification logs" ON public.notification_logs;
DROP POLICY IF EXISTS "Service role can insert visitor data" ON public.visitors;

-- Recreate with proper service role targeting
CREATE POLICY "Service role can insert messages" 
ON public.messages 
FOR INSERT 
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can insert notification logs" 
ON public.notification_logs 
FOR INSERT 
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can insert visitor data" 
ON public.visitors 
FOR INSERT 
TO service_role
WITH CHECK (true);