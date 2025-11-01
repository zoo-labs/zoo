import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeaders(corsHeaders).end();
  }

  if (req.method !== 'POST') {
    return res
      .status(405)
      .setHeaders(corsHeaders)
      .json({ error: 'Method not allowed' });
  }

  try {
    const { customerId, priceId, quantity = 1, metadata = {} } = req.body;

    // Validate inputs
    if (!customerId || !priceId) {
      return res
        .status(400)
        .setHeaders(corsHeaders)
        .json({ error: 'Missing required parameters' });
    }

    // Create or retrieve customer
    let customer;
    try {
      customer = await stripe.customers.retrieve(customerId);
    } catch (error) {
      // If customer doesn't exist, create one
      customer = await stripe.customers.create({
        id: customerId,
        metadata,
      });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
          quantity,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata,
    });

    // Get the client secret from the payment intent
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return res
      .status(200)
      .setHeaders(corsHeaders)
      .json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        status: subscription.status,
      });
  } catch (error) {
    console.error('Error creating subscription:', error);

    return res
      .status(500)
      .setHeaders(corsHeaders)
      .json({
        error: 'Failed to create subscription',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
  }
}