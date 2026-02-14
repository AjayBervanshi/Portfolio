import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import notificationapi from 'npm:notificationapi-node-server-sdk';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const NOTIFICATIONAPI_CLIENT_ID = Deno.env.get("NOTIFICATIONAPI_CLIENT_ID");
const NOTIFICATIONAPI_CLIENT_SECRET = Deno.env.get("NOTIFICATIONAPI_CLIENT_SECRET");

if (!NOTIFICATIONAPI_CLIENT_ID || !NOTIFICATIONAPI_CLIENT_SECRET) {
  console.error("Missing NotificationAPI credentials");
  throw new Error("Missing NotificationAPI credentials");
}
notificationapi.init(NOTIFICATIONAPI_CLIENT_ID, NOTIFICATIONAPI_CLIENT_SECRET);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message_id } = await req.json();
    if (!message_id) {
      throw new Error("Missing message_id in request body");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? '',
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ''
    );

    const { data: messageData, error: dbError } = await supabase
      .from('messages')
      .select('*')
      .eq('id', message_id)
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Failed to fetch message with id: ${message_id}`);
    }

    const message: Message = messageData;
    const parameters = {
      name: message.name,
      phone: message.phone || "Not Provided",
      subject: message.subject,
      message: message.message,
      email: message.email
    };

    // 1. Send EMAIL notification to USER
    if (message.email) {
      try {
        await notificationapi.send({
          type: 'portfolio_contact_form_for_user',
          to: {
            id: message.email,
            email: message.email,
          },
          parameters
        });
        console.log("User EMAIL notification sent to:", message.email);

        await supabase.from('notification_logs').insert({
          message_id: message.id,
          recipient_type: 'user',
          channel: 'email',
          recipient_email: message.email,
          status: 'sent'
        });
      } catch (err: any) {
        console.error("Error sending user email:", err);
        await supabase.from('notification_logs').insert({
          message_id: message.id,
          recipient_type: 'user',
          channel: 'email',
          recipient_email: message.email,
          status: 'failed',
          error: err.message
        });
      }
    }

    // 2. Send SMS notification to USER
    if (message.phone) {
      try {
        await notificationapi.send({
          type: 'portfolio_contact_form_for_user',
          to: {
            id: message.email || message.phone,
            number: message.phone,
          },
          parameters
        });
        console.log("User SMS notification sent to:", message.phone);

        await supabase.from('notification_logs').insert({
          message_id: message.id,
          recipient_type: 'user',
          channel: 'sms',
          recipient_phone: message.phone,
          status: 'sent'
        });
      } catch (err: any) {
        console.error("Error sending user SMS:", err);
        await supabase.from('notification_logs').insert({
          message_id: message.id,
          recipient_type: 'user',
          channel: 'sms',
          recipient_phone: message.phone,
          status: 'failed',
          error: err.message
        });
      }
    }

    // 3. Send EMAIL notification to Ajay
    try {
      await notificationapi.send({
        type: 'portfolio_contact_form_to_me',
        to: {
          id: 'ajay',
          email: 'ajay.bervanshi@gmail.com',
        },
        parameters
      });
      console.log("Ajay EMAIL notification sent.");

      await supabase.from('notification_logs').insert({
        message_id: message.id,
        recipient_type: 'ajay',
        channel: 'email',
        recipient_email: 'ajay.bervanshi@gmail.com',
        status: 'sent'
      });
    } catch (err: any) {
      console.error("Error sending Ajay email:", err);
      await supabase.from('notification_logs').insert({
        message_id: message.id,
        recipient_type: 'ajay',
        channel: 'email',
        recipient_email: 'ajay.bervanshi@gmail.com',
        status: 'failed',
        error: err.message
      });
    }

    // 4. Send SMS notification to Ajay
    try {
      await notificationapi.send({
        type: 'portfolio_contact_form_to_me',
        to: {
          id: 'ajay',
          number: '+917620085260',
        },
        parameters
      });
      console.log("Ajay SMS notification sent.");

      await supabase.from('notification_logs').insert({
        message_id: message.id,
        recipient_type: 'ajay',
        channel: 'sms',
        recipient_phone: '+917620085260',
        status: 'sent'
      });
    } catch (err: any) {
      console.error("Error sending Ajay SMS:", err);
      await supabase.from('notification_logs').insert({
        message_id: message.id,
        recipient_type: 'ajay',
        channel: 'sms',
        recipient_phone: '+917620085260',
        status: 'failed',
        error: err.message
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in notification flow:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
