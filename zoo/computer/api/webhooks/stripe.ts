import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import {
  handlePaymentSuccess,
  handlePaymentFailure,
  handleCheckoutSessionCompleted,
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
  handleRefund
} from '@/lib/stripe-webhooks';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

// Disable body parsing, we need raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Webhook handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  let event: Stripe.Event;
  const buf = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;

  // Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

  // Log webhook event
  console.log(`Received webhook: ${event.type} [${event.id}]`);

  try {
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const result = await handlePaymentSuccess(paymentIntent, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Payment intent succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const result = await handlePaymentFailure(paymentIntent, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Payment intent failed:', paymentIntent.id);
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const result = await handleCheckoutSessionCompleted(session, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Checkout session completed:', session.id);
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const result = await handleSubscriptionCreated(subscription, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Subscription created:', subscription.id);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const result = await handleSubscriptionUpdated(subscription, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Subscription updated:', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const result = await handleSubscriptionDeleted(subscription, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Subscription deleted:', subscription.id);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const result = await handleInvoicePaid(invoice, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Invoice paid:', invoice.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const result = await handleInvoicePaymentFailed(invoice, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Invoice payment failed:', invoice.id);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const result = await handleRefund(charge, event.id);

        if (!result.success) {
          throw new Error(result.message);
        }

        console.log('Charge refunded:', charge.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return success response
    res.status(200).json({ received: true, type: event.type });
  } catch (error) {
    console.error(`Error processing webhook ${event.type}:`, error);

    // Return 500 to trigger Stripe retry
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error processing webhook'
    });
  }
}