DROP POLICY IF EXISTS "Allow anon insert visitors" ON public.visitors;
DROP POLICY IF EXISTS "Allow authenticated insert visitors" ON public.visitors;

CREATE POLICY "Allow anon insert visitors"
ON public.visitors
FOR INSERT
TO anon
WITH CHECK (
  id IS NOT NULL
  AND user_agent IS NOT NULL
  AND length(trim(user_agent)) BETWEEN 10 AND 2000
  AND page_visited IS NOT NULL
  AND length(page_visited) BETWEEN 1 AND 1024
  AND page_visited ~ '^/[A-Za-z0-9/_?&=%+.,#:-]*$'
  AND browser IS NOT NULL
  AND browser IN ('Chrome', 'Firefox', 'Safari', 'Edge', 'Opera', 'Other')
  AND device_type IS NOT NULL
  AND device_type IN ('desktop', 'mobile', 'tablet', 'unknown')
  AND operating_system IS NOT NULL
  AND length(trim(operating_system)) BETWEEN 2 AND 100
  AND (
    referrer IS NULL
    OR referrer = 'direct'
    OR (
      length(referrer) <= 2048
      AND referrer ~ '^https?://'
    )
  )
  AND ip_address IS NULL
  AND (city IS NULL OR length(trim(city)) BETWEEN 2 AND 100)
  AND (country IS NULL OR length(trim(country)) BETWEEN 2 AND 100)
  AND visited_at BETWEEN now() - interval '1 hour' AND now() + interval '5 minutes'
  AND created_at BETWEEN now() - interval '1 hour' AND now() + interval '5 minutes'
);

CREATE POLICY "Allow authenticated insert visitors"
ON public.visitors
FOR INSERT
TO authenticated
WITH CHECK (
  id IS NOT NULL
  AND user_agent IS NOT NULL
  AND length(trim(user_agent)) BETWEEN 10 AND 2000
  AND page_visited IS NOT NULL
  AND length(page_visited) BETWEEN 1 AND 1024
  AND page_visited ~ '^/[A-Za-z0-9/_?&=%+.,#:-]*$'
  AND browser IS NOT NULL
  AND browser IN ('Chrome', 'Firefox', 'Safari', 'Edge', 'Opera', 'Other')
  AND device_type IS NOT NULL
  AND device_type IN ('desktop', 'mobile', 'tablet', 'unknown')
  AND operating_system IS NOT NULL
  AND length(trim(operating_system)) BETWEEN 2 AND 100
  AND (
    referrer IS NULL
    OR referrer = 'direct'
    OR (
      length(referrer) <= 2048
      AND referrer ~ '^https?://'
    )
  )
  AND ip_address IS NULL
  AND (city IS NULL OR length(trim(city)) BETWEEN 2 AND 100)
  AND (country IS NULL OR length(trim(country)) BETWEEN 2 AND 100)
  AND visited_at BETWEEN now() - interval '1 hour' AND now() + interval '5 minutes'
  AND created_at BETWEEN now() - interval '1 hour' AND now() + interval '5 minutes'
);