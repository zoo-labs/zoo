import { sendSubscriptionConfirmation, SubscriptionData } from '../src/lib/email';

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
    const { to, subscriptionData } = body;

    if (!to || !subscriptionData) {
      return new Response(JSON.stringify({ error: 'Missing required fields: to, subscriptionData' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Validate subscription data
    const requiredFields: (keyof SubscriptionData)[] = [
      'subscriptionId',
      'customerName',
      'customerEmail',
      'planName',
      'gpuModel',
      'quantity',
      'pricePerMonth',
      'startDate',
      'billingCycle'
    ];

    for (const field of requiredFields) {
      if (!subscriptionData[field] && subscriptionData[field] !== 0) {
        return new Response(JSON.stringify({ error: `Missing required field in subscriptionData: ${field}` }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Send the email
    await sendSubscriptionConfirmation(to, subscriptionData);

    return new Response(JSON.stringify({ success: true, message: 'Subscription confirmation sent successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error in send-subscription-confirmation API:', error);
    return new Response(JSON.stringify({
      error: 'Failed to send subscription confirmation',
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