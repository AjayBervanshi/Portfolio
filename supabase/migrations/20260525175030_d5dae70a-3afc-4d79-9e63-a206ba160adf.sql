
-- Fix critical: aisha_* and ajay_profile tables exposed to public
DO $$
DECLARE
  t text;
  tables text[] := ARRAY['aisha_conversations','aisha_finance','aisha_goals','aisha_journal','aisha_memory','aisha_mood_tracker','aisha_schedule','ajay_profile'];
  pol record;
BEGIN
  FOREACH t IN ARRAY tables LOOP
    -- Drop all existing policies
    FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename=t LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, t);
    END LOOP;

    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated, public', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('CREATE POLICY "service_role_full_access" ON public.%I AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;

-- Harden update_updated_at_column with fixed search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;
