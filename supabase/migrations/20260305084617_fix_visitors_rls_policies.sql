-- =============================================================================
-- SECURITY FIX: Tighten visitors table RLS policies
-- Replaces the overly permissive WITH CHECK (true) policies added in the
-- 20260214 migration with field-level validation checks.
-- The contact form / email / SMS flow is NOT affected by this change.
-- =============================================================================

-- Drop the permissive policies flagged by Supabase security advisor
DROP POLICY IF EXISTS "Allow anon insert visitors"        ON public.visitors;
DROP POLICY IF EXISTS "Allow authenticated insert visitors" ON public.visitors;

-- Create a tightened anon INSERT policy with field-level validation.
-- This still allows the visitor-tracking hook to insert records, but rejects
-- obviously malformed or automated payloads.
CREATE POLICY "Allow anon insert visitors"
ON public.visitors
FOR INSERT
TO anon
WITH CHECK (
  -- user_agent must be present and a plausible length
  user_agent IS NOT NULL
  AND length(user_agent) > 5
  AND length(user_agent) < 2000
  -- device_type must be one of the expected values if provided
  AND (
    device_type IS NULL
    OR device_type IN ('desktop', 'mobile', 'tablet', 'unknown')
  )
);

CREATE POLICY "Allow authenticated insert visitors"
ON public.visitors
FOR INSERT
TO authenticated
WITH CHECK (
  user_agent IS NOT NULL
  AND length(user_agent) > 5
  AND length(user_agent) < 2000
  AND (
    device_type IS NULL
    OR device_type IN ('desktop', 'mobile', 'tablet', 'unknown')
  )
);

-- Keep service_role full access for admin dashboards / edge functions
DROP POLICY IF EXISTS "service_role_full_access_visitors" ON public.visitors;
CREATE POLICY "service_role_full_access_visitors"
ON public.visitors
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
