
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import notificationapi from 'npm:notificationapi-node-server-sdk';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize NotificationAPI with project credentials
notificationapi.init(
  'ef6raefq8m4ejrjs42m6kq32y1',
  '59l1czomvfnm1g6bi9q41kdj2m6osppusbwkaddplosgj4dz29v3s3apt2'
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const { name, email, phone, subject, message }: ContactFormData = await req.json();

    console.log("Received contact form submission:", { name, email, phone, subject });

    // Initialize Supabase client for logging
    const supabase = createClient(
      "https://ssbrllliprffeegamygw.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzYnJsbGxpcHJmZmVlZ2FteWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3OTYzMDcsImV4cCI6MjA2NzM3MjMwN30.wvo84CIabcxhhc4x1DRm3uZkwCAausESXvQLadZ1VNs"
    );

    // Save message to database first
    const { data: messageData, error: dbError } = await supabase
      .from('messages')
      .insert({
        name,
        email,
        phone: phone || null,
        subject,
        message,
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save message');
    }

    const messageId = messageData.id;
    console.log("Message saved with ID:", messageId);

    const parameters = {
      name,
      phone: phone || "testPhone",
      subject,
      message,
      email
    };

    // 1. Send notification to USER
    if (email || phone) {
      try {
        await notificationapi.send({
          type: 'portfolio_contact_form_for_user',
          to: {
            id: email || phone || 'User',
            email: email || undefined,
            number: phone || undefined,
          },
          parameters
        });
        
        console.log("Notification sent to user:", email || phone);

        // Log user notification
        await supabase.from('notification_logs').insert({
          message_id: messageId,
          recipient_type: 'user',
          channel: email ? 'email' : 'sms',
          recipient_email: email || null,
          recipient_phone: phone || null,
          status: 'sent'
        });

      } catch (userNotifError) {
        console.error("Error sending user notification:", userNotifError);
        
        // Log failed user notification
        await supabase.from('notification_logs').insert({
          message_id: messageId,
          recipient_type: 'user',
          channel: email ? 'email' : 'sms',
          recipient_email: email || null,
          recipient_phone: phone || null,
          status: 'failed',
          error: userNotifError.message
        });
      }
    }

    // 2. Send notification to YOU (Ajay)
    try {
      await notificationapi.send({
        type: 'portfolio_contact_form_to_me',
        to: {
          id: 'ajay',
          email: 'ajay.bervanshi@gmail.com',
          number: '+917620085260'
        },
        parameters
      });
      
      console.log("Notification sent to Ajay");

      // Log Ajay's email notification
      await supabase.from('notification_logs').insert({
        message_id: messageId,
        recipient_type: 'ajay',
        channel: 'email',
        recipient_email: 'ajay.bervanshi@gmail.com',
        status: 'sent'
      });

      // Log Ajay's SMS notification
      await supabase.from('notification_logs').insert({
        message_id: messageId,
        recipient_type: 'ajay',
        channel: 'sms',
        recipient_phone: '+917620085260',
        status: 'sent'
      });

    } catch (ajayNotifError) {
      console.error("Error sending Ajay notification:", ajayNotifError);
      
      // Log failed notifications for Ajay
      await supabase.from('notification_logs').insert([
        {
          message_id: messageId,
          recipient_type: 'ajay',
          channel: 'email',
          recipient_email: 'ajay.bervanshi@gmail.com',
          status: 'failed',
          error: ajayNotifError.message
        },
        {
          message_id: messageId,
          recipient_type: 'ajay',
          channel: 'sms',
          recipient_phone: '+917620085260',
          status: 'failed',
          error: ajayNotifError.message
        }
      ]);
    }

    // Response back to frontend
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send notification" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
