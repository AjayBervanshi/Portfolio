
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import notificationapi from 'npm:notificationapi-node-server-sdk';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Environment variables for API credentials
const NOTIFICATION_API_PROJECT_ID = Deno.env.get('NOTIFICATION_API_PROJECT_ID');
const NOTIFICATION_API_SECRET_KEY = Deno.env.get('NOTIFICATION_API_SECRET_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const CONTACT_EMAIL = Deno.env.get('CONTACT_EMAIL');
const CONTACT_PHONE = Deno.env.get('CONTACT_PHONE');

// Validate environment variables
if (!NOTIFICATION_API_PROJECT_ID || !NOTIFICATION_API_SECRET_KEY) {
  throw new Error('Missing required NotificationAPI environment variables');
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required Supabase environment variables');
}

if (!CONTACT_EMAIL || !CONTACT_PHONE) {
  throw new Error('Missing required contact information environment variables');
}

// Initialize NotificationAPI with project credentials
notificationapi.init(NOTIFICATION_API_PROJECT_ID, NOTIFICATION_API_SECRET_KEY);

// Allowed origins for production security
const ALLOWED_ORIGINS = [
  "https://ssbrllliprffeegamygw.supabase.co",
  "https://lovely-salamander-4c8859.netlify.app", // Update with your actual domain
  "http://localhost:5173", // Development only
  "https://28fefa16-dc12-4235-9392-49327b182b5a.sandbox.lovable.dev", // Current Lovable sandbox
];

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Origin-based CORS security
  const origin = req.headers.get("origin");
  const isAllowedOrigin = !origin || ALLOWED_ORIGINS.includes(origin);
  const responseHeaders = {
    ...corsHeaders,
    "Access-Control-Allow-Origin": isAllowedOrigin ? (origin || "*") : "null",
  };

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: responseHeaders });
  }

  // Security: Block requests from unauthorized origins
  if (!isAllowedOrigin) {
    console.log(`Blocked request from unauthorized origin: ${origin}`);
    return new Response(
      JSON.stringify({ error: "Unauthorized origin" }), 
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: responseHeaders 
    });
  }

  try {
    const { name, email, phone, subject, message }: ContactFormData = await req.json();

    // Security: Basic bot detection
    const userAgent = req.headers.get("user-agent") || "";
    const isBot = /bot|crawl|spider|scrape/i.test(userAgent) || userAgent === "";
    
    if (isBot) {
      console.log(`Blocked potential bot request: ${userAgent}`);
      return new Response(
        JSON.stringify({ error: "Automated requests not allowed" }), 
        { status: 429, headers: responseHeaders }
      );
    }

    // Security: Input validation and size limits
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }), 
        { status: 400, headers: responseHeaders }
      );
    }

    if (message.length > 5000 || name.length > 100 || subject.length > 200) {
      return new Response(
        JSON.stringify({ error: "Input too long" }), 
        { status: 400, headers: responseHeaders }
      );
    }
    
    // Reduced PII logging - only log submission attempt without sensitive data
    console.log('Contact form submission attempt:', { 
      nameLength: name.length, 
      emailDomain: email.split('@')[1], 
      hasPhone: !!phone,
      subjectLength: subject.length,
      messageLength: message.length 
    });

    // Initialize Supabase client with service role for secure operations
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';

    // Check rate limit (5 attempts per hour per IP)
    const { data: rateLimitCheck, error: rateLimitError } = await supabase
      .rpc('check_rate_limit', {
        p_identifier: clientIP,
        p_action: 'contact_form',
        p_max_attempts: 5,
        p_window_minutes: 60
      });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      throw new Error('Rate limit validation failed');
    }

    if (!rateLimitCheck) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Too many submissions. Please try again later." 
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json", 
            ...responseHeaders 
          },
        }
      );
    }

    // Save message using secure function with server-side validation
    const { data: messageId, error: dbError } = await supabase
      .rpc('secure_insert_message', {
        p_name: name,
        p_email: email,
        p_phone: phone || null,
        p_subject: subject,
        p_message: message
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: dbError.message || 'Validation failed' 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json", 
            ...responseHeaders 
          },
        }
      );
    }

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

        // Log user notification using secure function
        await supabase.rpc('secure_insert_notification_log', {
          p_message_id: messageId,
          p_recipient_type: 'user',
          p_channel: email ? 'email' : 'sms',
          p_recipient_email: email || null,
          p_recipient_phone: phone || null,
          p_status: 'sent'
        });

      } catch (userNotifError) {
        console.error("Error sending user notification:", userNotifError);
        
        // Log failed user notification using secure function
        await supabase.rpc('secure_insert_notification_log', {
          p_message_id: messageId,
          p_recipient_type: 'user',
          p_channel: email ? 'email' : 'sms',
          p_recipient_email: email || null,
          p_recipient_phone: phone || null,
          p_status: 'failed',
          p_error: userNotifError.message
        });
      }
    }

    // 2. Send notification to YOU (Ajay)
    try {
      await notificationapi.send({
        type: 'portfolio_contact_form_to_me',
        to: {
          id: 'ajay',
          email: CONTACT_EMAIL,
          number: CONTACT_PHONE
        },
        parameters
      });
      
      console.log("Notification sent to Ajay");

      // Log Ajay's email notification using secure function
      await supabase.rpc('secure_insert_notification_log', {
        p_message_id: messageId,
        p_recipient_type: 'ajay',
        p_channel: 'email',
        p_recipient_email: CONTACT_EMAIL,
        p_status: 'sent'
      });

      // Log Ajay's SMS notification using secure function
      await supabase.rpc('secure_insert_notification_log', {
        p_message_id: messageId,
        p_recipient_type: 'ajay',
        p_channel: 'sms',
        p_recipient_phone: CONTACT_PHONE,
        p_status: 'sent'
      });

    } catch (ajayNotifError) {
      console.error("Error sending Ajay notification:", ajayNotifError);
      
      // Log failed notifications for Ajay using secure function
      await supabase.rpc('secure_insert_notification_log', {
        p_message_id: messageId,
        p_recipient_type: 'ajay',
        p_channel: 'email',
        p_recipient_email: CONTACT_EMAIL,
        p_status: 'failed',
        p_error: ajayNotifError.message
      });
      
      await supabase.rpc('secure_insert_notification_log', {
        p_message_id: messageId,
        p_recipient_type: 'ajay',
        p_channel: 'sms',
        p_recipient_phone: CONTACT_PHONE,
        p_status: 'failed',
        p_error: ajayNotifError.message
      });
    }

    // Response back to frontend
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...responseHeaders,
        },
      }
    );

  } catch (error: unknown) {
    // Security: Don't log full error details to prevent information leakage
    console.error('Contact form processing error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to process contact form. Please try again later." 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...responseHeaders 
        },
      }
    );
  }
};

serve(handler);
