import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import notificationapi from 'npm:notificationapi-node-server-sdk';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize NotificationAPI with environment variables
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
    "authorization, x-client-info, apikey, content-type",
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

    // 1. Send notification to USER
    if (message.email) {
      await notificationapi.send({
        type: 'portfolio_contact_form_for_user',
        to: {
          id: message.email,
          email: message.email,
        },
        parameters
      });
      console.log("User notification sent to:", message.email);
    }

    // 2. Send notification to YOU (Ajay)
    await notificationapi.send({
      type: 'portfolio_contact_form_to_me',
      to: {
        id: 'ajay',
        email: 'ajay.bervanshi@gmail.com',
        number: '+917620085260'
      },
      parameters
    });
    console.log("Admin notification sent to Ajay.");

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