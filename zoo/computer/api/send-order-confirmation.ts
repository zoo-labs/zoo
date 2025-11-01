import { sendOrderConfirmation, OrderData } from '../src/lib/email';

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
    const { to, orderData } = body;

    if (!to || !orderData) {
      return new Response(JSON.stringify({ error: 'Missing required fields: to, orderData' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Validate order data
    const requiredFields: (keyof OrderData)[] = [
      'orderNumber',
      'customerName',
      'customerEmail',
      'items',
      'subtotal',
      'tax',
      'total'
    ];

    for (const field of requiredFields) {
      if (!orderData[field] && orderData[field] !== 0) {
        return new Response(JSON.stringify({ error: `Missing required field in orderData: ${field}` }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Validate items array
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      return new Response(JSON.stringify({ error: 'orderData.items must be a non-empty array' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Send the email
    await sendOrderConfirmation(to, orderData);

    return new Response(JSON.stringify({ success: true, message: 'Order confirmation sent successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error in send-order-confirmation API:', error);
    return new Response(JSON.stringify({
      error: 'Failed to send order confirmation',
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