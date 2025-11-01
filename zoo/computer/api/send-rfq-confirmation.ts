import { sendRFQConfirmation, sendAdminNotification, RFQData } from '../src/lib/email';

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
    const { rfqData } = body;

    if (!rfqData) {
      return new Response(JSON.stringify({ error: 'Missing required field: rfqData' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Validate RFQ data
    const requiredFields: (keyof RFQData)[] = [
      'rfqNumber',
      'customerName',
      'customerEmail',
      'gpuModel',
      'quantity',
      'duration',
      'submittedAt'
    ];

    for (const field of requiredFields) {
      if (!rfqData[field] && rfqData[field] !== 0) {
        return new Response(JSON.stringify({ error: `Missing required field in rfqData: ${field}` }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Send both customer confirmation and admin notification
    const promises = [
      sendRFQConfirmation(rfqData.customerEmail, rfqData),
      sendAdminNotification(rfqData)
    ];

    await Promise.all(promises);

    return new Response(JSON.stringify({
      success: true,
      message: 'RFQ confirmation sent to customer and admin notification sent'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error in send-rfq-confirmation API:', error);
    return new Response(JSON.stringify({
      error: 'Failed to send RFQ confirmation',
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