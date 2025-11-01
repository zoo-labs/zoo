import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (will be auto-generated from Supabase later)
export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  stripe_customer_id?: string;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface RFQ {
  id: string;
  user_id?: string;
  company: string;
  email: string;
  phone?: string;
  gpu_type: string;
  quantity: number;
  duration_months?: number;
  use_case: string;
  budget_range?: string;
  additional_requirements?: string;
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ClusterRequest {
  id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  cluster_requirements: string;
  number_of_gpus: string;
  rental_duration: string;
  project_description: string;
  hear_about_us: string;
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  rfq_id?: string;
  cluster_request_id?: string;
  user_id?: string;
  quote_number: string;
  items: any; // JSON
  subtotal: number;
  tax: number;
  total: number;
  payment_terms?: string;
  valid_until?: string;
  notes?: string;
  status: 'sent' | 'viewed' | 'accepted' | 'expired' | 'rejected';
  created_at: string;
  accepted_at?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  quote_id?: string;
  stripe_payment_intent_id?: string;
  stripe_subscription_id?: string;
  items: any; // JSON
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'paid' | 'provisioning' | 'active' | 'cancelled';
  payment_method?: string;
  billing_cycle?: string;
  created_at: string;
  paid_at?: string;
  provisioned_at?: string;
}

export interface Subscription {
  id: string;
  user_id?: string;
  order_id?: string;
  stripe_subscription_id: string;
  stripe_product_id?: string;
  stripe_price_id?: string;
  gpu_type: string;
  quantity: number;
  status: 'active' | 'cancelled' | 'past_due' | 'paused';
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  cancelled_at?: string;
}

export interface UsageRecord {
  id: string;
  user_id: string;
  reservation_id?: string;
  gpu_type: string;
  hours_used: number;
  compute_units: number;
  cost_usd: number;
  timestamp: string;
  metadata?: any;
}

// Helper functions
export const submitRFQ = async (rfqData: Omit<RFQ, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  const { data, error } = await supabase
    .from('rfqs')
    .insert([{
      ...rfqData,
      status: 'pending',
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const submitClusterRequest = async (clusterData: Omit<ClusterRequest, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  const { data, error } = await supabase
    .from('cluster_requests')
    .insert([{
      ...clusterData,
      status: 'pending',
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserRFQs = async (userId: string) => {
  const { data, error } = await supabase
    .from('rfqs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserQuotes = async (userId: string) => {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserSubscriptions = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Admin functions
export const getAllRFQs = async (status?: string) => {
  let query = supabase
    .from('rfqs')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getAllClusterRequests = async (status?: string) => {
  let query = supabase
    .from('cluster_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const updateRFQStatus = async (id: string, status: RFQ['status']) => {
  const { data, error } = await supabase
    .from('rfqs')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateClusterRequestStatus = async (id: string, status: ClusterRequest['status']) => {
  const { data, error } = await supabase
    .from('cluster_requests')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Quote management functions
export const createQuote = async (quoteData: Omit<Quote, 'id' | 'created_at' | 'status'>) => {
  const { data, error } = await supabase
    .from('quotes')
    .insert([{
      ...quoteData,
      status: 'sent',
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAllQuotes = async (status?: string) => {
  let query = supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const updateQuoteStatus = async (id: string, status: Quote['status']) => {
  const { data, error } = await supabase
    .from('quotes')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Generate unique quote number
export const generateQuoteNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `Q${year}${month}-${random}`;
};

// Check if user is admin
export const checkAdminRole = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data?.role === 'admin';
};

// Usage Analytics Functions
export const getUserUsage = async (userId: string, startDate: Date, endDate: Date) => {
  const { data, error } = await supabase
    .from('usage_records')
    .select('*')
    .eq('user_id', userId)
    .gte('timestamp', startDate.toISOString())
    .lte('timestamp', endDate.toISOString())
    .order('timestamp', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUsageSummary = async (userId: string) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const { data, error } = await supabase
    .from('usage_records')
    .select('gpu_type, hours_used, compute_units, cost_usd')
    .eq('user_id', userId)
    .gte('timestamp', startOfMonth.toISOString());

  if (error) throw error;

  const summary = {
    totalHours: 0,
    totalCost: 0,
    totalComputeUnits: 0,
    byGpuType: {} as Record<string, { hours: number; cost: number; count: number }>
  };

  data?.forEach(record => {
    summary.totalHours += record.hours_used;
    summary.totalCost += record.cost_usd;
    summary.totalComputeUnits += record.compute_units;

    if (!summary.byGpuType[record.gpu_type]) {
      summary.byGpuType[record.gpu_type] = { hours: 0, cost: 0, count: 0 };
    }
    summary.byGpuType[record.gpu_type].hours += record.hours_used;
    summary.byGpuType[record.gpu_type].cost += record.cost_usd;
    summary.byGpuType[record.gpu_type].count++;
  });

  return summary;
};

export const getMonthlySpending = async (userId: string, months: number = 6) => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);

  const { data, error } = await supabase
    .from('usage_records')
    .select('cost_usd, timestamp')
    .eq('user_id', userId)
    .gte('timestamp', startDate.toISOString())
    .order('timestamp', { ascending: true });

  if (error) throw error;

  // Group by month
  const monthlySpending: Record<string, number> = {};

  data?.forEach(record => {
    const date = new Date(record.timestamp);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlySpending[monthKey]) {
      monthlySpending[monthKey] = 0;
    }
    monthlySpending[monthKey] += record.cost_usd;
  });

  return Object.entries(monthlySpending).map(([month, cost]) => ({
    month,
    cost
  }));
};

export const getGPUUtilization = async (userId: string) => {
  const { data, error } = await supabase
    .from('usage_records')
    .select('gpu_type, hours_used')
    .eq('user_id', userId);

  if (error) throw error;

  const utilization: Record<string, number> = {};

  data?.forEach(record => {
    if (!utilization[record.gpu_type]) {
      utilization[record.gpu_type] = 0;
    }
    utilization[record.gpu_type] += record.hours_used;
  });

  return utilization;
};

// Save usage record to database
export const saveUsageRecord = async (record: Omit<UsageRecord, 'id'>) => {
  const { data, error } = await supabase
    .from('usage_records')
    .insert([record])
    .select()
    .single();

  if (error) throw error;
  return data;
};
