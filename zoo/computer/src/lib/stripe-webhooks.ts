import type { Stripe } from 'stripe';
import { createClient } from '@/lib/supabase/server';

// Types for webhook event handlers
interface WebhookHandlerResult {
  success: boolean;
  message: string;
  data?: any;
}

// Helper function to check if event has been processed
async function isEventProcessed(eventId: string): Promise<boolean> {
  const supabase = createClient();

  const { data } = await supabase
    .from('webhook_events')
    .select('id')
    .eq('event_id', eventId)
    .eq('processed', true)
    .single();

  return !!data;
}

// Helper function to mark event as processed
async function markEventProcessed(eventId: string, eventType: string, data: any): Promise<void> {
  const supabase = createClient();

  await supabase.from('webhook_events').upsert({
    event_id: eventId,
    event_type: eventType,
    processed: true,
    data: data,
    created_at: new Date().toISOString()
  });
}

// Handle successful payment
export async function handlePaymentSuccess(
  paymentIntent: Stripe.PaymentIntent,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    // Check idempotency
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();
    const metadata = paymentIntent.metadata || {};

    // Create or update order
    const orderData = {
      payment_intent_id: paymentIntent.id,
      amount: paymentIntent.amount / 100, // Convert from cents
      currency: paymentIntent.currency,
      status: 'confirmed',
      customer_email: paymentIntent.receipt_email || metadata.email,
      metadata: metadata,
      paid_at: new Date().toISOString()
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .upsert(orderData)
      .select()
      .single();

    if (orderError) throw orderError;

    // Update quote status if linked
    if (metadata.quote_id) {
      await supabase
        .from('quotes')
        .update({ status: 'accepted', order_id: order.id })
        .eq('id', metadata.quote_id);
    }

    // Create invoice record
    const invoiceData = {
      order_id: order.id,
      payment_intent_id: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: 'paid',
      paid_at: new Date().toISOString(),
      invoice_pdf: metadata.invoice_pdf_url
    };

    await supabase.from('invoices').insert(invoiceData);

    // TODO: Send confirmation email
    // await sendOrderConfirmationEmail(order);

    // Mark event as processed
    await markEventProcessed(eventId, 'payment_intent.succeeded', paymentIntent);

    return {
      success: true,
      message: 'Payment processed successfully',
      data: { orderId: order.id }
    };
  } catch (error) {
    console.error('Error handling payment success:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Handle failed payment
export async function handlePaymentFailure(
  paymentIntent: Stripe.PaymentIntent,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();
    const metadata = paymentIntent.metadata || {};

    // Update order status
    const { error } = await supabase
      .from('orders')
      .update({
        status: 'failed',
        failure_reason: paymentIntent.last_payment_error?.message
      })
      .eq('payment_intent_id', paymentIntent.id);

    if (error) throw error;

    // Log failure
    await supabase.from('payment_failures').insert({
      payment_intent_id: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      error_message: paymentIntent.last_payment_error?.message,
      error_code: paymentIntent.last_payment_error?.code,
      customer_email: paymentIntent.receipt_email || metadata.email,
      created_at: new Date().toISOString()
    });

    // TODO: Send failure notification email
    // await sendPaymentFailedEmail(metadata.email);

    await markEventProcessed(eventId, 'payment_intent.payment_failed', paymentIntent);

    return {
      success: true,
      message: 'Payment failure handled'
    };
  } catch (error) {
    console.error('Error handling payment failure:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Handle checkout session completion
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();

    // Create order from checkout session
    const orderData = {
      checkout_session_id: session.id,
      customer_id: session.customer as string,
      customer_email: session.customer_email,
      amount: (session.amount_total || 0) / 100,
      currency: session.currency,
      status: 'confirmed',
      metadata: session.metadata,
      paid_at: new Date().toISOString()
    };

    const { data: order, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (error) throw error;

    await markEventProcessed(eventId, 'checkout.session.completed', session);

    return {
      success: true,
      message: 'Checkout session processed',
      data: { orderId: order.id }
    };
  } catch (error) {
    console.error('Error handling checkout session:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Handle subscription creation
export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();

    // Create subscription record
    const subscriptionData = {
      subscription_id: subscription.id,
      customer_id: subscription.customer as string,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
      canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
      metadata: subscription.metadata,
      items: subscription.items.data.map(item => ({
        price_id: item.price.id,
        quantity: item.quantity,
        product_id: item.price.product as string
      }))
    };

    const { data: sub, error } = await supabase
      .from('subscriptions')
      .insert(subscriptionData)
      .select()
      .single();

    if (error) throw error;

    // Create initial invoice record
    if (subscription.latest_invoice) {
      await supabase.from('invoices').insert({
        subscription_id: sub.id,
        stripe_invoice_id: subscription.latest_invoice as string,
        status: 'pending',
        created_at: new Date().toISOString()
      });
    }

    // TODO: Send subscription confirmation email
    // await sendSubscriptionConfirmationEmail(subscription);

    await markEventProcessed(eventId, 'customer.subscription.created', subscription);

    return {
      success: true,
      message: 'Subscription created',
      data: { subscriptionId: sub.id }
    };
  } catch (error) {
    console.error('Error handling subscription creation:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Handle subscription update
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();

    // Update subscription record
    const subscriptionData = {
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
      canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
      metadata: subscription.metadata,
      items: subscription.items.data.map(item => ({
        price_id: item.price.id,
        quantity: item.quantity,
        product_id: item.price.product as string
      })),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('subscriptions')
      .update(subscriptionData)
      .eq('subscription_id', subscription.id);

    if (error) throw error;

    // Handle plan changes
    const previousAttributes = (subscription as any).previous_attributes;
    if (previousAttributes?.items) {
      // Log plan change
      await supabase.from('subscription_changes').insert({
        subscription_id: subscription.id,
        change_type: 'plan_change',
        previous_data: previousAttributes,
        new_data: subscription.items.data,
        created_at: new Date().toISOString()
      });
    }

    await markEventProcessed(eventId, 'customer.subscription.updated', subscription);

    return {
      success: true,
      message: 'Subscription updated'
    };
  } catch (error) {
    console.error('Error handling subscription update:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Handle subscription deletion
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();

    // Update subscription status
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
        canceled_at: new Date().toISOString(),
        active: false
      })
      .eq('subscription_id', subscription.id);

    if (error) throw error;

    // Stop GPU access if applicable
    if (subscription.metadata?.gpu_access) {
      await supabase
        .from('gpu_access')
        .update({ active: false, terminated_at: new Date().toISOString() })
        .eq('subscription_id', subscription.id);
    }

    // TODO: Send cancellation confirmation email
    // await sendCancellationConfirmationEmail(subscription);

    await markEventProcessed(eventId, 'customer.subscription.deleted', subscription);

    return {
      success: true,
      message: 'Subscription cancelled'
    };
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Handle invoice payment
export async function handleInvoicePaid(
  invoice: Stripe.Invoice,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();

    // Create or update invoice record
    const invoiceData = {
      stripe_invoice_id: invoice.id,
      subscription_id: invoice.subscription as string,
      customer_id: invoice.customer as string,
      amount: (invoice.amount_paid || 0) / 100,
      currency: invoice.currency,
      status: 'paid',
      invoice_pdf: invoice.invoice_pdf,
      hosted_invoice_url: invoice.hosted_invoice_url,
      paid_at: new Date().toISOString(),
      metadata: invoice.metadata
    };

    const { data: inv, error } = await supabase
      .from('invoices')
      .upsert(invoiceData)
      .select()
      .single();

    if (error) throw error;

    // Update subscription payment status
    if (invoice.subscription) {
      await supabase
        .from('subscriptions')
        .update({
          last_payment_date: new Date().toISOString(),
          payment_status: 'paid'
        })
        .eq('subscription_id', invoice.subscription);
    }

    // TODO: Send invoice email
    // await sendInvoiceEmail(invoice);

    await markEventProcessed(eventId, 'invoice.paid', invoice);

    return {
      success: true,
      message: 'Invoice paid',
      data: { invoiceId: inv.id }
    };
  } catch (error) {
    console.error('Error handling invoice payment:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Handle invoice payment failure
export async function handleInvoicePaymentFailed(
  invoice: Stripe.Invoice,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();

    // Update invoice status
    const { error } = await supabase
      .from('invoices')
      .update({
        status: 'failed',
        failure_reason: invoice.last_payment_error?.message,
        updated_at: new Date().toISOString()
      })
      .eq('stripe_invoice_id', invoice.id);

    if (error) throw error;

    // Update subscription payment status
    if (invoice.subscription) {
      await supabase
        .from('subscriptions')
        .update({ payment_status: 'failed' })
        .eq('subscription_id', invoice.subscription);
    }

    // TODO: Send payment failed email
    // await sendInvoicePaymentFailedEmail(invoice);

    await markEventProcessed(eventId, 'invoice.payment_failed', invoice);

    return {
      success: true,
      message: 'Invoice payment failure handled'
    };
  } catch (error) {
    console.error('Error handling invoice payment failure:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Handle refund
export async function handleRefund(
  charge: Stripe.Charge,
  eventId: string
): Promise<WebhookHandlerResult> {
  try {
    if (await isEventProcessed(eventId)) {
      return { success: true, message: 'Event already processed' };
    }

    const supabase = createClient();

    // Create refund record
    const refundData = {
      charge_id: charge.id,
      payment_intent_id: charge.payment_intent as string,
      amount: (charge.amount_refunded || 0) / 100,
      currency: charge.currency,
      status: 'refunded',
      reason: charge.refunds?.data[0]?.reason || 'requested_by_customer',
      metadata: charge.metadata,
      refunded_at: new Date().toISOString()
    };

    const { data: refund, error: refundError } = await supabase
      .from('refunds')
      .insert(refundData)
      .select()
      .single();

    if (refundError) throw refundError;

    // Update order status
    if (charge.payment_intent) {
      await supabase
        .from('orders')
        .update({
          status: 'refunded',
          refund_id: refund.id,
          refunded_amount: (charge.amount_refunded || 0) / 100
        })
        .eq('payment_intent_id', charge.payment_intent);
    }

    // TODO: Send refund confirmation email
    // await sendRefundConfirmationEmail(charge);

    await markEventProcessed(eventId, 'charge.refunded', charge);

    return {
      success: true,
      message: 'Refund processed',
      data: { refundId: refund.id }
    };
  } catch (error) {
    console.error('Error handling refund:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}