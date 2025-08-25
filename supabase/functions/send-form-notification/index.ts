import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    const mailgunDomain = Deno.env.get('MailGun Domain');
    const mailgunApiKey = Deno.env.get('MAILGUN_API_KEY');
    const toEmail = Deno.env.get('TO_EMAIL');
    const fromEmail = Deno.env.get('FROM_EMAIL');

    if (!mailgunDomain || !mailgunApiKey || !toEmail || !fromEmail) {
      throw new Error('Missing required Mailgun configuration');
    }

    // Prepare email content
    const subject = `New Commercial Lending Application - ${formData.name}`;
    const htmlContent = `
      <h2>New Commercial Lending Application Received</h2>
      <p><strong>Applicant Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${formData.name}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
        <li><strong>Business:</strong> ${formData.business || 'Not provided'}</li>
      </ul>
      
      <p><strong>Loan Details:</strong></p>
      <ul>
        <li><strong>Loan Type:</strong> ${formData.loanType || 'Not specified'}</li>
        <li><strong>Loan Amount:</strong> ${formData.loanAmount || 'Not specified'}</li>
      </ul>
      
      <p><strong>Message:</strong></p>
      <p>${formData.message || 'No additional message provided'}</p>
      
      <hr>
      <p><em>This email was automatically generated from the Emet Capital website contact form.</em></p>
    `;

    // Send email using Mailgun
    const formData2 = new FormData();
    formData2.append('from', fromEmail);
    formData2.append('to', toEmail);
    formData2.append('subject', subject);
    formData2.append('html', htmlContent);

    const mailgunResponse = await fetch(
      `https://api.mailgun.net/v3/${mailgunDomain}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${mailgunApiKey}`)}`,
        },
        body: formData2,
      }
    );

    if (!mailgunResponse.ok) {
      const errorText = await mailgunResponse.text();
      console.error('Mailgun API error:', errorText);
      throw new Error(`Mailgun API error: ${mailgunResponse.status}`);
    }

    const mailgunResult = await mailgunResponse.json();
    console.log('Email sent successfully:', mailgunResult);

    return new Response(
      JSON.stringify({ success: true, messageId: mailgunResult.id }),
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