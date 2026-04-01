import { supabase } from './supabase';
import type { Order, User, Subscription } from './supabase';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  gpuType?: string;
  duration?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate?: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';

  // Company info
  company: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    email: string;
    phone?: string;
    website: string;
    taxId?: string;
  };

  // Customer info
  customer: {
    name: string;
    company?: string;
    email: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
  };

  // Line items
  lineItems: InvoiceLineItem[];

  // Totals
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  amountPaid?: number;
  amountDue: number;

  // Payment info
  paymentMethod?: string;
  paymentTerms?: string;
  paidAt?: string;

  // Additional info
  notes?: string;
  termsAndConditions?: string;

  // Related IDs
  orderId?: string;
  subscriptionId?: string;
  stripeInvoiceId?: string;
}

// Company information (Hanzo Computer)
export const COMPANY_INFO = {
  name: 'Hanzo Computer',
  address: '2100 Geng Road',
  city: 'Palo Alto',
  state: 'CA',
  zip: '94303',
  country: 'United States',
  email: 'billing@hanzo.computer',
  phone: '+1 (650) 555-0100',
  website: 'https://hanzo.computer',
  taxId: 'XX-XXXXXXX'
};

// Generate invoice number
export const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV-${year}${month}${day}-${random}`;
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format date
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
};

// Calculate due date (default 30 days)
export const calculateDueDate = (invoiceDate: Date, termsDays: number = 30): Date => {
  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + termsDays);
  return dueDate;
};

// Parse GPU type to display name
export const getGPUDisplayName = (gpuType: string): string => {
  const gpuNames: Record<string, string> = {
    'dgx-spark': 'NVIDIA DGX Spark',
    'h100': 'NVIDIA H100 80GB',
    'h200': 'NVIDIA H200 141GB',
    'b200': 'NVIDIA B200',
    'b300': 'NVIDIA B300',
    'a100': 'NVIDIA A100 80GB',
    'a6000': 'NVIDIA RTX A6000',
    'custom': 'Custom Configuration'
  };
  return gpuNames[gpuType.toLowerCase()] || gpuType;
};

// Create invoice data from order
export const createInvoiceFromOrder = async (
  order: Order,
  user: User
): Promise<InvoiceData> => {
  const invoiceDate = new Date();
  const dueDate = calculateDueDate(invoiceDate);

  // Parse line items from order
  const lineItems: InvoiceLineItem[] = order.items.map((item: any) => ({
    description: item.description || `${getGPUDisplayName(item.gpu_type || '')} GPU`,
    quantity: item.quantity || 1,
    unitPrice: item.unit_price || item.price || 0,
    total: item.total || (item.quantity * (item.unit_price || item.price || 0)),
    gpuType: item.gpu_type,
    duration: item.duration || order.billing_cycle
  }));

  // Calculate tax if not provided
  const taxRate = 0.0875; // 8.75% California tax
  const tax = order.tax || (order.subtotal * taxRate);

  return {
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: invoiceDate.toISOString(),
    dueDate: dueDate.toISOString(),
    status: order.status === 'paid' ? 'paid' : 'open',

    company: COMPANY_INFO,

    customer: {
      name: user.name,
      company: user.company,
      email: user.email,
      address: '123 Customer St', // These would come from user profile
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States'
    },

    lineItems,

    subtotal: order.subtotal,
    taxRate,
    tax,
    total: order.total,
    amountPaid: order.status === 'paid' ? order.total : 0,
    amountDue: order.status === 'paid' ? 0 : order.total,

    paymentMethod: order.payment_method,
    paymentTerms: order.billing_cycle === 'monthly' ? 'Net 30' : 'Due on receipt',
    paidAt: order.paid_at,

    notes: `Order #${order.order_number}`,
    termsAndConditions: getTermsAndConditions(),

    orderId: order.id,
    stripeInvoiceId: order.stripe_payment_intent_id
  };
};

// Create invoice data from subscription
export const createInvoiceFromSubscription = async (
  subscription: Subscription,
  user: User,
  period: { start: Date; end: Date }
): Promise<InvoiceData> => {
  const invoiceDate = new Date();
  const dueDate = calculateDueDate(invoiceDate);

  // Calculate monthly price based on subscription
  const monthlyPrice = getMonthlyPrice(subscription.gpu_type, subscription.quantity);

  const lineItems: InvoiceLineItem[] = [{
    description: `${getGPUDisplayName(subscription.gpu_type)} GPU Subscription`,
    quantity: subscription.quantity,
    unitPrice: monthlyPrice,
    total: monthlyPrice * subscription.quantity,
    gpuType: subscription.gpu_type,
    duration: 'monthly'
  }];

  const subtotal = monthlyPrice * subscription.quantity;
  const taxRate = 0.0875;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return {
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: invoiceDate.toISOString(),
    dueDate: dueDate.toISOString(),
    status: subscription.status === 'active' ? 'open' : 'void',

    company: COMPANY_INFO,

    customer: {
      name: user.name,
      company: user.company,
      email: user.email,
      address: '123 Customer St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States'
    },

    lineItems,

    subtotal,
    taxRate,
    tax,
    total,
    amountPaid: 0,
    amountDue: total,

    paymentMethod: 'stripe_card',
    paymentTerms: 'Monthly Subscription',

    notes: `Billing Period: ${formatDate(period.start)} - ${formatDate(period.end)}`,
    termsAndConditions: getTermsAndConditions(),

    subscriptionId: subscription.id,
    stripeInvoiceId: subscription.stripe_subscription_id
  };
};

// Get monthly price for GPU type
const getMonthlyPrice = (gpuType: string, quantity: number = 1): number => {
  const prices: Record<string, number> = {
    'dgx-spark': 37437,
    'h100': 2500,
    'h200': 3500,
    'b200': 5000,
    'b300': 7500,
    'a100': 1800,
    'a6000': 1200
  };
  return prices[gpuType.toLowerCase()] || 1000;
};

// Get terms and conditions
const getTermsAndConditions = (): string => {
  return `Payment Terms:
• Payment is due within 30 days of invoice date
• Late payments may incur a 1.5% monthly fee
• All sales are final
• GPU availability subject to confirmation
• Prices subject to change with 30 days notice

For questions about this invoice, please contact:
billing@hanzo.computer or call +1 (650) 555-0100`;
};

// Store invoice in database
export const storeInvoice = async (
  invoiceData: InvoiceData,
  pdfUrl?: string
): Promise<any> => {
  const { data, error } = await supabase
    .from('invoices')
    .insert({
      invoice_number: invoiceData.invoiceNumber,
      user_id: invoiceData.orderId ?
        (await supabase.from('orders').select('user_id').eq('id', invoiceData.orderId).single()).data?.user_id :
        (await supabase.from('subscriptions').select('user_id').eq('id', invoiceData.subscriptionId).single()).data?.user_id,
      order_id: invoiceData.orderId,
      subscription_id: invoiceData.subscriptionId,
      stripe_invoice_id: invoiceData.stripeInvoiceId,
      amount_due: invoiceData.amountDue,
      amount_paid: invoiceData.amountPaid,
      status: invoiceData.status,
      due_date: invoiceData.dueDate,
      paid_at: invoiceData.paidAt,
      pdf_url: pdfUrl,
      generated_at: new Date().toISOString(),
      line_items: invoiceData.lineItems,
      customer_info: invoiceData.customer,
      subtotal: invoiceData.subtotal,
      tax: invoiceData.tax
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get invoice by ID
export const getInvoiceById = async (invoiceId: string): Promise<any> => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*, orders(*), subscriptions(*), users(*)')
    .eq('id', invoiceId)
    .single();

  if (error) throw error;
  return data;
};

// Get invoices for user
export const getUserInvoices = async (userId: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Upload PDF to Supabase Storage
export const uploadInvoicePDF = async (
  pdfBlob: Blob,
  invoiceNumber: string
): Promise<string> => {
  const fileName = `${invoiceNumber}.pdf`;
  const filePath = `invoices/${new Date().getFullYear()}/${fileName}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('invoices')
    .upload(filePath, pdfBlob, {
      contentType: 'application/pdf',
      cacheControl: '3600',
      upsert: true
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('invoices')
    .getPublicUrl(filePath);

  return publicUrl;
};

// Generate signed URL for private invoice access
export const getInvoiceSignedUrl = async (filePath: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('invoices')
    .createSignedUrl(filePath, 3600); // 1 hour expiry

  if (error) throw error;
  return data.signedUrl;
};