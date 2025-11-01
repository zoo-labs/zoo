import { sendQuoteEmail, QuoteData } from '../src/lib/email';

export default async function handler(req: Request): Promise<Response> {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const body = await req.json();
    const { to, quoteData } = body;

    if (!to || !quoteData) {
      return new Response(JSON.stringify({ error: 'Missing required fields: to, quoteData' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Validate quote data
    const requiredFields: (keyof QuoteData)[] = [
      'quoteNumber',
      'customerName',
      'customerEmail',
      'gpuModel',
      'quantity',
      'duration',
      'pricePerHour',
      'totalPrice',
      'validUntil'
    ];

    for (const field of requiredFields) {
      if (!quoteData[field] && quoteData[field] !== 0) {
        return new Response(JSON.stringify({ error: `Missing required field in quoteData: ${field}` }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Send the email
    await sendQuoteEmail(to, quoteData);

    return new Response(JSON.stringify({ success: true, message: 'Quote email sent successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error in send-quote-email API:', error);
    return new Response(JSON.stringify({
      error: 'Failed to send quote email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}