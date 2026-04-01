import { supabase } from './supabase';
import { generateInvoicePDF } from '../components/Invoice';
import {
  createInvoiceFromOrder,
  createInvoiceFromSubscription,
  uploadInvoicePDF,
  storeInvoice,
  type InvoiceData
} from './invoices';
import type { Order, Subscription, User } from './supabase';

/**
 * Generate and send invoice to customer
 */
export const generateAndSendInvoice = async (
  orderId: string,
  sendEmail: boolean = true
): Promise<{ success: boolean; invoiceId?: string; error?: string }> => {
  try {
    // Fetch order with user details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, users(*)')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return { success: false, error: 'Order not found' };
    }

    // Check if invoice already exists
    const { data: existingInvoice, error: invoiceCheckError } = await supabase
      .from('invoices')
      .select('id, invoice_number, pdf_url')
      .eq('order_id', orderId)
      .single();

    if (existingInvoice && existingInvoice.pdf_url) {
      return {
        success: true,
        invoiceId: existingInvoice.id,
        error: 'Invoice already exists for this order'
      };
    }

    // Create invoice data
    const invoiceData = await createInvoiceFromOrder(order, order.users);

    // Generate PDF
    const pdfBlob = await generateInvoicePDF(invoiceData);

    // Upload to Supabase Storage
    const pdfUrl = await uploadInvoicePDF(pdfBlob, invoiceData.invoiceNumber);

    // Store invoice in database
    const storedInvoice = await storeInvoice(invoiceData, pdfUrl);

    // Send email if requested
    if (sendEmail) {
      await sendInvoiceEmail(order.users.email, invoiceData, pdfUrl);
    }

    // Update order status if it was paid
    if (order.status === 'paid') {
      await supabase
        .from('orders')
        .update({
          status: 'provisioning',
          provisioned_at: new Date().toISOString()
        })
        .eq('id', orderId);
    }

    return { success: true, invoiceId: storedInvoice.id };
  } catch (error) {
    console.error('Error generating invoice:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate invoice'
    };
  }
};

/**
 * Generate invoice for subscription billing period
 */
export const generateSubscriptionInvoice = async (
  subscriptionId: string,
  period?: { start: Date; end: Date },
  sendEmail: boolean = true
): Promise<{ success: boolean; invoiceId?: string; error?: string }> => {
  try {
    // Fetch subscription with user details
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*, users(*)')
      .eq('id', subscriptionId)
      .single();

    if (subError || !subscription) {
      return { success: false, error: 'Subscription not found' };
    }

    // Use provided period or current period
    const billingPeriod = period || {
      start: new Date(subscription.current_period_start),
      end: new Date(subscription.current_period_end)
    };

    // Create invoice data
    const invoiceData = await createInvoiceFromSubscription(
      subscription,
      subscription.users,
      billingPeriod
    );

    // Generate PDF
    const pdfBlob = await generateInvoicePDF(invoiceData);

    // Upload to Supabase Storage
    const pdfUrl = await uploadInvoicePDF(pdfBlob, invoiceData.invoiceNumber);

    // Store invoice in database
    const storedInvoice = await storeInvoice(invoiceData, pdfUrl);

    // Send email if requested
    if (sendEmail) {
      await sendInvoiceEmail(subscription.users.email, invoiceData, pdfUrl);
    }

    return { success: true, invoiceId: storedInvoice.id };
  } catch (error) {
    console.error('Error generating subscription invoice:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate invoice'
    };
  }
};

/**
 * Regenerate an existing invoice
 */
export const regenerateInvoice = async (
  invoiceId: string,
  sendEmail: boolean = false
): Promise<{ success: boolean; pdfUrl?: string; error?: string }> => {
  try {
    // Fetch invoice details
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*, orders(*), subscriptions(*), users(*)')
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoice) {
      return { success: false, error: 'Invoice not found' };
    }

    let invoiceData: InvoiceData;

    if (invoice.order_id) {
      // Regenerate from order
      invoiceData = await createInvoiceFromOrder(invoice.orders, invoice.users);
    } else if (invoice.subscription_id) {
      // Regenerate from subscription
      const period = {
        start: new Date(invoice.subscriptions.current_period_start),
        end: new Date(invoice.subscriptions.current_period_end)
      };
      invoiceData = await createInvoiceFromSubscription(
        invoice.subscriptions,
        invoice.users,
        period
      );
    } else {
      return { success: false, error: 'Invalid invoice - no order or subscription' };
    }

    // Override with existing invoice number to maintain consistency
    invoiceData.invoiceNumber = invoice.invoice_number;

    // Generate new PDF
    const pdfBlob = await generateInvoicePDF(invoiceData);

    // Upload to Supabase Storage (will overwrite existing)
    const pdfUrl = await uploadInvoicePDF(pdfBlob, invoiceData.invoiceNumber);

    // Update invoice record
    await supabase
      .from('invoices')
      .update({
        pdf_url: pdfUrl,
        generated_at: new Date().toISOString()
      })
      .eq('id', invoiceId);

    // Send email if requested
    if (sendEmail) {
      await sendInvoiceEmail(invoice.users.email, invoiceData, pdfUrl);
    }

    return { success: true, pdfUrl };
  } catch (error) {
    console.error('Error regenerating invoice:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to regenerate invoice'
    };
  }
};

/**
 * Send invoice email to customer
 * This is a placeholder - integrate with your email service (SendGrid, AWS SES, etc.)
 */
const sendInvoiceEmail = async (
  email: string,
  invoiceData: InvoiceData,
  pdfUrl: string
): Promise<void> => {
  // TODO: Implement email sending
  // This would typically use an email service like SendGrid, AWS SES, or Resend

  console.log('Would send invoice email to:', email);
  console.log('Invoice Number:', invoiceData.invoiceNumber);
  console.log('PDF URL:', pdfUrl);

  // Example implementation with a hypothetical email service:
  /*
  await emailService.send({
    to: email,
    from: 'billing@hanzo.computer',
    subject: `Invoice ${invoiceData.invoiceNumber} from Hanzo Computer`,
    html: `
      <h1>Invoice ${invoiceData.invoiceNumber}</h1>
      <p>Dear ${invoiceData.customer.name},</p>
      <p>Please find attached your invoice for ${formatCurrency(invoiceData.total)}.</p>
      <p>Due Date: ${formatDate(invoiceData.dueDate)}</p>
      <p><a href="${pdfUrl}">Download Invoice</a></p>
      <p>Thank you for your business!</p>
      <p>Hanzo Computer Team</p>
    `,
    attachments: [{
      filename: `${invoiceData.invoiceNumber}.pdf`,
      url: pdfUrl
    }]
  });
  */
};

/**
 * Bulk generate invoices for multiple orders
 */
export const bulkGenerateInvoices = async (
  orderIds: string[],
  sendEmails: boolean = false
): Promise<{
  success: boolean;
  generated: number;
  failed: number;
  errors: string[]
}> => {
  let generated = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const orderId of orderIds) {
    const result = await generateAndSendInvoice(orderId, sendEmails);
    if (result.success) {
      generated++;
    } else {
      failed++;
      errors.push(`Order ${orderId}: ${result.error}`);
    }
  }

  return {
    success: failed === 0,
    generated,
    failed,
    errors
  };
};

/**
 * Get all orders without invoices
 */
export const getOrdersWithoutInvoices = async (): Promise<Order[]> => {
  try {
    // Get all paid orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'paid');

    if (ordersError || !orders) {
      return [];
    }

    // Get all invoices
    const { data: invoices, error: invoicesError } = await supabase
      .from('invoices')
      .select('order_id')
      .not('order_id', 'is', null);

    if (invoicesError) {
      return orders;
    }

    // Filter orders that don't have invoices
    const invoicedOrderIds = new Set(invoices.map(inv => inv.order_id));
    return orders.filter(order => !invoicedOrderIds.has(order.id));
  } catch (error) {
    console.error('Error fetching orders without invoices:', error);
    return [];
  }
};

/**
 * Mark invoice as paid
 */
export const markInvoiceAsPaid = async (
  invoiceId: string,
  paymentDate: Date = new Date()
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .update({
        status: 'paid',
        paid_at: paymentDate.toISOString(),
        amount_paid: await supabase
          .from('invoices')
          .select('amount_due')
          .eq('id', invoiceId)
          .single()
          .then(res => res.data?.amount_due || 0),
        amount_due: 0
      })
      .eq('id', invoiceId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    // Also update related order if exists
    if (data.order_id) {
      await supabase
        .from('orders')
        .update({
          status: 'paid',
          paid_at: paymentDate.toISOString()
        })
        .eq('id', data.order_id);
    }

    return { success: true };
  } catch (error) {
    console.error('Error marking invoice as paid:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark invoice as paid'
    };
  }
};

/**
 * Void an invoice
 */
export const voidInvoice = async (
  invoiceId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('invoices')
      .update({
        status: 'void',
        notes: reason || 'Invoice voided by admin'
      })
      .eq('id', invoiceId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error voiding invoice:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to void invoice'
    };
  }
};