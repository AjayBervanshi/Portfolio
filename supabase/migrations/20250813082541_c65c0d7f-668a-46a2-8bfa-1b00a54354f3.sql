-- Create visitors table to track site visits
CREATE TABLE public.visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  browser TEXT,
  device_type TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table for contact form submissions
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  visitor_id UUID REFERENCES public.visitors(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for visitors (public read for analytics)
CREATE POLICY "Visitors are publicly readable" 
ON public.visitors 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert visitor data" 
ON public.visitors 
FOR INSERT 
WITH CHECK (true);

-- Create policies for messages (public read for admin purposes)
CREATE POLICY "Messages are publicly readable" 
ON public.messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (true);