
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import notificationapi from 'npm:notificationapi-node-server-sdk';

// Initialize NotificationAPI with your keys
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
    const { name, email, subject, message }: ContactFormData = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    const parameters = {
      name,
      subject,
      message,
      email
    };

    // Send notification to USER
    if (email) {
      await notificationapi.send({
        type: 'portfolio_contact_form_for_user',
        to: {
          id: email,
          email: email
        },
        parameters
      });
      console.log("Notification sent to user:", email);
    }

    // Send notification to YOU (Ajay)
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
