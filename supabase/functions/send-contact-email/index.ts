
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    // Send email to Ajay
    const emailToAjay = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["badboy1002661@gmail.com"], // Using verified email for testing
      subject: `📩 New Message: ${subject}`,
      html: `
        <h2>Hello Ajay 👋</h2>
        <p>You have received a new message from <strong>${name}</strong> (${email}).</p>
        
        <h3>Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This email was sent automatically from your portfolio contact form.</p>
      `,
    });

    console.log("Email to Ajay sent:", emailToAjay);

    // Send thank you email to sender
    const thankYouEmail = await resend.emails.send({
      from: "Ajay Bervanshi <onboarding@resend.dev>",
      to: [email],
      subject: `✅ Thanks for reaching out, ${name}!`,
      html: `
        <h2>Hi ${name},</h2>
        
        <p>Thanks for contacting me! I have received your message:</p>
        
        <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #007acc;">
          "${message.replace(/\n/g, '<br>')}"
        </div>
        
        <p>I will get back to you shortly.</p>
        
        <p>Best regards,<br>
        <strong>Ajay Bervanshi</strong><br>
        MS SQL Database Administrator</p>
      `,
    });

    console.log("Thank you email sent:", thankYouEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailToAjay: emailToAjay.data?.id,
        thankYouEmail: thankYouEmail.data?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send email" 
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
