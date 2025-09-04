-- Remove public SELECT access to visitors table to protect privacy
-- Keep INSERT permissions for visitor tracking functionality
-- Keep service_role SELECT for administrative access only

-- Drop the policy that allows anonymous and authenticated users to SELECT visitor data
DROP POLICY IF EXISTS "Allow anon & auth SELECT visitors" ON public.visitors;

-- Keep the service_role SELECT policy for administrative access
-- (This policy already exists and will remain)

-- Keep the INSERT policies for visitor tracking functionality
-- (These policies already exist and will remain)

-- Add a comment to document the security change
COMMENT ON TABLE public.visitors IS 'Visitor tracking data - INSERT allowed for tracking, SELECT restricted to service_role only for privacy protection';