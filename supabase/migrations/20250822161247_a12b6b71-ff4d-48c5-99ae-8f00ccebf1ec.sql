
-- 1) Drop old/unused table
DROP TABLE IF EXISTS public.contact_messages;

-- 2) Ensure visitors table exists with the requested fields
CREATE TABLE IF NOT EXISTS public.visitors (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address      inet,
  visited_at      timestamptz NOT NULL DEFAULT now(),
  user_agent      text,
  referrer        text,
  browser         text,
  device_type     text,
  operating_system text,
  page_visited    text,
  country         text,
  city            text
);

-- Keep RLS enabled (if already enabled, this is a no-op)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Helpful index
CREATE INDEX IF NOT EXISTS idx_visitors_visited_at ON public.visitors (visited_at);

-- 3) Ensure messages table exists and includes phone
CREATE TABLE IF NOT EXISTS public.messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id  uuid REFERENCES public.visitors(id),
  created_at  timestamptz NOT NULL DEFAULT now(),
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  subject     text NOT NULL,
  message     text NOT NULL
);

-- Add phone column in case table already existed without it
ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS phone text;

-- Keep RLS enabled (if already enabled, this is a no-op)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages (created_at);
CREATE INDEX IF NOT EXISTS idx_messages_visitor_id ON public.messages (visitor_id);

-- 4) Create a notification logs table to track email/SMS sends
CREATE TABLE IF NOT EXISTS public.notification_logs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id          uuid REFERENCES public.messages(id),
  recipient_type      text NOT NULL CHECK (recipient_type IN ('user','ajay')),
  channel             text NOT NULL CHECK (channel IN ('email','sms')),
  recipient_email     text,
  recipient_phone     text,
  provider_type       text NOT NULL DEFAULT 'notificationapi',
  provider_message_id text,
  status              text NOT NULL DEFAULT 'sent',
  error               text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

-- Simple public RLS (insert/select only), consistent with existing public forms
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Anyone can insert notification logs'
      AND schemaname = 'public'
      AND tablename = 'notification_logs'
  ) THEN
    CREATE POLICY "Anyone can insert notification logs"
      ON public.notification_logs
      FOR INSERT
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Notification logs are publicly readable'
      AND schemaname = 'public'
      AND tablename = 'notification_logs'
  ) THEN
    CREATE POLICY "Notification logs are publicly readable"
      ON public.notification_logs
      FOR SELECT
      USING (true);
  END IF;
END$$;
