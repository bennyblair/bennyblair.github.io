import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import React from 'npm:react@18.3.1';
import { Resend } from 'npm:resend@4.0.0';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { FormNotificationEmail } from './_templates/form-notification.tsx';

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  business: string;
  loanType: string;
  loanAmount: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    console.log('Received form submission:', formData);

    const toEmail = Deno.env.get('TO_EMAIL');
    const fromEmail = Deno.env.get('FROM_EMAIL');

    if (!toEmail || !fromEmail) {
      throw new Error('Missing required email configuration (TO_EMAIL, FROM_EMAIL)');
    }

    // Render the React email template
    const html = await renderAsync(
      React.createElement(FormNotificationEmail, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        business: formData.business,
        loanType: formData.loanType,
        loanAmount: formData.loanAmount,
        message: formData.message,
      })
    );

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Commercial Lending Application - ${formData.name}`,
      html,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);

    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-form-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);