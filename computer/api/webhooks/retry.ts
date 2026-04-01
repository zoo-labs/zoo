import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
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

// Webhook retry handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Verify admin authentication (you should implement proper auth)
  // For now, we'll just check for a simple API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  try {
    // Fetch the event from database
    const supabase = createClient();

    const { data: webhookEvent, error: fetchError } = await supabase
      .from('webhook_events')
      .select('*')
      .eq('event_id', eventId)
      .single();

    if (fetchError || !webhookEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (webhookEvent.processed) {
      return res.status(200).json({
        message: 'Event already processed',
        eventId: eventId
      });
    }

    // Fetch the original event from Stripe
    const stripeEvent = await stripe.events.retrieve(eventId);

    if (!stripeEvent) {
      return res.status(404).json({ error: 'Event not found in Stripe' });
    }

    // Process the event based on its type
    let result: any;

    switch (stripeEvent.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        result = await handlePaymentSuccess(paymentIntent, stripeEvent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        result = await handlePaymentFailure(paymentIntent, stripeEvent.id);
        break;
      }

      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        result = await handleCheckoutSessionCompleted(session, stripeEvent.id);
        break;
      }

      case 'customer.subscription.created': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        result = await handleSubscriptionCreated(subscription, stripeEvent.id);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        result = await handleSubscriptionUpdated(subscription, stripeEvent.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        result = await handleSubscriptionDeleted(subscription, stripeEvent.id);
        break;
      }

      case 'invoice.paid': {
        const invoice = stripeEvent.data.object as Stripe.Invoice;
        result = await handleInvoicePaid(invoice, stripeEvent.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object as Stripe.Invoice;
        result = await handleInvoicePaymentFailed(invoice, stripeEvent.id);
        break;
      }

      case 'charge.refunded': {
        const charge = stripeEvent.data.object as Stripe.Charge;
        result = await handleRefund(charge, stripeEvent.id);
        break;
      }

      default:
        return res.status(400).json({
          error: `Unsupported event type: ${stripeEvent.type}`
        });
    }

    if (!result.success) {
      throw new Error(result.message);
    }

    // Log the retry
    await supabase
      .from('webhook_retry_log')
      .insert({
        event_id: eventId,
        event_type: stripeEvent.type,
        retried_at: new Date().toISOString(),
        result: 'success',
        message: result.message
      });

    return res.status(200).json({
      success: true,
      message: 'Event reprocessed successfully',
      eventId: eventId,
      eventType: stripeEvent.type,
      result: result
    });

  } catch (error) {
    console.error('Error retrying webhook:', error);

    // Log the failed retry
    const supabase = createClient();
    await supabase
      .from('webhook_retry_log')
      .insert({
        event_id: eventId,
        retried_at: new Date().toISOString(),
        result: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });

    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to retry webhook'
    });
  }
}