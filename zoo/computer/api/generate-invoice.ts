import { createClient } from '@supabase/supabase-js';
import { generateInvoicePDF } from '../src/components/Invoice';
import {
  createInvoiceFromOrder,
  createInvoiceFromSubscription,
  uploadInvoicePDF,
  storeInvoice,
  getInvoiceById
} from '../src/lib/invoices';
import type { InvoiceData } from '../src/lib/invoices';

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface RequestBody {
  type: 'order' | 'subscription' | 'invoice';
  id: string;
  regenerate?: boolean;
  period?: {
    start: string;
    end: string;
  };
}

interface Response {
  success: boolean;
  data?: {
    invoiceId: string;
    invoiceNumber: string;
    pdfUrl: string;
    downloadUrl?: string;
  };
  error?: string;
}

export default async function handler(req: Request): Promise<Response> {
  try {
    // Parse request
    const body: RequestBody = await req.json();
    const { type, id, regenerate = false, period } = body;

    // Validate request
    if (!type || !id) {
      return {
        success: false,
        error: 'Missing required parameters: type and id'
      };
    }

    let invoiceData: InvoiceData;
    let userId: string;

    // Generate invoice data based on type
    switch (type) {
      case 'order':
        // Fetch order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('*, users(*)')
          .eq('id', id)
          .single();

        if (orderError || !order) {
          return {
            success: false,
            error: 'Order not found'
          };
        }

        userId = order.user_id;
        invoiceData = await createInvoiceFromOrder(order, order.users);
        break;

      case 'subscription':
        // Fetch subscription
        const { data: subscription, error: subError } = await supabase
          .from('subscriptions')
          .select('*, users(*)')
          .eq('id', id)
          .single();

        if (subError || !subscription) {
          return {
            success: false,
            error: 'Subscription not found'
          };
        }

        userId = subscription.user_id;

        // Use provided period or current period
        const invoicePeriod = period ? {
          start: new Date(period.start),
          end: new Date(period.end)
        } : {
          start: new Date(subscription.current_period_start),
          end: new Date(subscription.current_period_end)
        };

        invoiceData = await createInvoiceFromSubscription(
          subscription,
          subscription.users,
          invoicePeriod
        );
        break;

      case 'invoice':
        // Fetch existing invoice
        const { data: invoice, error: invoiceError } = await supabase
          .from('invoices')
          .select('*, orders(*), subscriptions(*), users(*)')
          .eq('id', id)
          .single();

        if (invoiceError || !invoice) {
          return {
            success: false,
            error: 'Invoice not found'
          };
        }

        // Check if regenerate is allowed
        if (!regenerate && invoice.pdf_url) {
          return {
            success: true,
            data: {
              invoiceId: invoice.id,
              invoiceNumber: invoice.invoice_number,
              pdfUrl: invoice.pdf_url
            }
          };
        }

        userId = invoice.user_id;

        // Reconstruct invoice data
        invoiceData = {
          invoiceNumber: invoice.invoice_number,
          invoiceDate: invoice.created_at,
          dueDate: invoice.due_date,
          status: invoice.status,
          company: {
            name: 'Hanzo Computer',
            address: '2100 Geng Road',
            city: 'Palo Alto',
            state: 'CA',
            zip: '94303',
            country: 'United States',
            email: 'billing@hanzo.computer',
            phone: '+1 (650) 555-0100',
            website: 'https://hanzo.computer'
          },
          customer: invoice.customer_info || {
            name: invoice.users.name,
            company: invoice.users.company,
            email: invoice.users.email
          },
          lineItems: invoice.line_items || [],
          subtotal: invoice.subtotal || invoice.amount_due,
          taxRate: 0.0875,
          tax: invoice.tax || 0,
          total: invoice.amount_due + (invoice.amount_paid || 0),
          amountPaid: invoice.amount_paid || 0,
          amountDue: invoice.amount_due,
          paymentMethod: invoice.orders?.payment_method,
          paymentTerms: invoice.orders?.billing_cycle === 'monthly' ? 'Net 30' : 'Due on receipt',
          paidAt: invoice.paid_at,
          orderId: invoice.order_id,
          subscriptionId: invoice.subscription_id,
          stripeInvoiceId: invoice.stripe_invoice_id
        };
        break;

      default:
        return {
          success: false,
          error: 'Invalid type. Must be order, subscription, or invoice'
        };
    }

    // Generate PDF
    const pdfBlob = await generateInvoicePDF(invoiceData);

    // Upload to Supabase Storage
    const pdfUrl = await uploadInvoicePDF(pdfBlob, invoiceData.invoiceNumber);

    // Store or update invoice in database
    let storedInvoice;
    if (type === 'invoice' && regenerate) {
      // Update existing invoice with new PDF
      const { data, error } = await supabase
        .from('invoices')
        .update({
          pdf_url: pdfUrl,
          generated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      storedInvoice = data;
    } else {
      // Create new invoice record
      storedInvoice = await storeInvoice(invoiceData, pdfUrl);
    }

    // Generate signed URL for download (1 hour expiry)
    const filePath = `invoices/${new Date().getFullYear()}/${invoiceData.invoiceNumber}.pdf`;
    const { data: signedUrlData, error: signedError } = await supabase.storage
      .from('invoices')
      .createSignedUrl(filePath, 3600);

    return {
      success: true,
      data: {
        invoiceId: storedInvoice.id,
        invoiceNumber: invoiceData.invoiceNumber,
        pdfUrl: pdfUrl,
        downloadUrl: signedUrlData?.signedUrl
      }
    };
  } catch (error) {
    console.error('Error generating invoice:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate invoice'
    };
  }
}