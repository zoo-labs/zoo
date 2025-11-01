import { supabase } from './supabase';
import { startOfDay, endOfDay, subDays, format, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, startOfWeek, startOfMonth } from 'date-fns';

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
  gpuType?: string;
}

export interface ConversionFunnel {
  stage: string;
  value: number;
  percentage: number;
}

export interface CustomerGrowth {
  date: string;
  newCustomers: number;
  totalCustomers: number;
}

export interface GPUTypeBreakdown {
  gpuType: string;
  revenue: number;
  orders: number;
  percentage: number;
}

export interface TopCustomer {
  id: string;
  name: string;
  email: string;
  revenue: number;
  orders: number;
  joinDate: string;
}

export interface QuotePerformance {
  date: string;
  sent: number;
  accepted: number;
  rejected: number;
  pending: number;
  acceptanceRate: number;
}

export interface MetricCard {
  title: string;
  value: number | string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  prefix?: string;
  suffix?: string;
}

// Get revenue data grouped by time period
export async function getRevenueData(
  startDate: Date,
  endDate: Date,
  groupBy: 'day' | 'week' | 'month' = 'day'
): Promise<RevenueDataPoint[]> {
  const { data: orders, error } = await supabase
    .from('quotes')
    .select('created_at, total, gpu_type, status')
    .eq('status', 'accepted')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at');

  if (error) {
    console.error('Error fetching revenue data:', error);
    return [];
  }

  // Group data by period
  const groupedData = new Map<string, RevenueDataPoint>();

  let intervals: Date[] = [];
  if (groupBy === 'day') {
    intervals = eachDayOfInterval({ start: startDate, end: endDate });
  } else if (groupBy === 'week') {
    intervals = eachWeekOfInterval({ start: startDate, end: endDate });
  } else {
    intervals = eachMonthOfInterval({ start: startDate, end: endDate });
  }

  // Initialize all intervals with zero values
  intervals.forEach(date => {
    const key = format(date, groupBy === 'day' ? 'yyyy-MM-dd' : groupBy === 'week' ? 'yyyy-ww' : 'yyyy-MM');
    groupedData.set(key, { date: key, revenue: 0, orders: 0 });
  });

  // Aggregate orders into periods
  orders?.forEach(order => {
    const orderDate = new Date(order.created_at);
    let key: string;

    if (groupBy === 'day') {
      key = format(orderDate, 'yyyy-MM-dd');
    } else if (groupBy === 'week') {
      key = format(startOfWeek(orderDate), 'yyyy-ww');
    } else {
      key = format(startOfMonth(orderDate), 'yyyy-MM');
    }

    const existing = groupedData.get(key);
    if (existing) {
      existing.revenue += order.total;
      existing.orders += 1;
    }
  });

  return Array.from(groupedData.values());
}

// Get conversion funnel data
export async function getConversionFunnel(
  startDate: Date,
  endDate: Date
): Promise<ConversionFunnel[]> {
  const { data: rfqs } = await supabase
    .from('rfqs')
    .select('id')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  const { data: quotes } = await supabase
    .from('quotes')
    .select('id, status')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  const { data: orders } = await supabase
    .from('quotes')
    .select('id')
    .eq('status', 'accepted')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  const rfqCount = rfqs?.length || 0;
  const quoteCount = quotes?.length || 0;
  const orderCount = orders?.length || 0;

  return [
    {
      stage: 'RFQs Submitted',
      value: rfqCount,
      percentage: 100
    },
    {
      stage: 'Quotes Sent',
      value: quoteCount,
      percentage: rfqCount > 0 ? (quoteCount / rfqCount) * 100 : 0
    },
    {
      stage: 'Orders Placed',
      value: orderCount,
      percentage: rfqCount > 0 ? (orderCount / rfqCount) * 100 : 0
    }
  ];
}

// Get customer growth over time
export async function getCustomerGrowth(
  startDate: Date,
  endDate: Date
): Promise<CustomerGrowth[]> {
  const { data: customers, error } = await supabase
    .from('users')
    .select('id, created_at')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at');

  if (error) {
    console.error('Error fetching customer data:', error);
    return [];
  }

  const dailyGrowth = new Map<string, CustomerGrowth>();
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  let totalCustomers = 0;

  // Get count of customers before start date
  const { count: previousCount } = await supabase
    .from('users')
    .select('id', { count: 'exact', head: true })
    .lt('created_at', startDate.toISOString());

  totalCustomers = previousCount || 0;

  // Initialize days
  days.forEach(day => {
    const key = format(day, 'yyyy-MM-dd');
    dailyGrowth.set(key, { date: key, newCustomers: 0, totalCustomers });
  });

  // Count new customers per day
  customers?.forEach(customer => {
    const date = format(new Date(customer.created_at), 'yyyy-MM-dd');
    const growth = dailyGrowth.get(date);
    if (growth) {
      growth.newCustomers += 1;
      totalCustomers += 1;
      growth.totalCustomers = totalCustomers;
    }
  });

  return Array.from(dailyGrowth.values());
}

// Get GPU type breakdown
export async function getGPUTypeBreakdown(
  startDate: Date,
  endDate: Date
): Promise<GPUTypeBreakdown[]> {
  const { data: orders } = await supabase
    .from('quotes')
    .select('gpu_type, total')
    .eq('status', 'accepted')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  if (!orders || orders.length === 0) return [];

  const breakdown = new Map<string, GPUTypeBreakdown>();
  let totalRevenue = 0;

  orders.forEach(order => {
    const type = order.gpu_type || 'Unknown';
    const existing = breakdown.get(type) || {
      gpuType: type,
      revenue: 0,
      orders: 0,
      percentage: 0
    };

    existing.revenue += order.total;
    existing.orders += 1;
    totalRevenue += order.total;

    breakdown.set(type, existing);
  });

  // Calculate percentages
  breakdown.forEach(item => {
    item.percentage = totalRevenue > 0 ? (item.revenue / totalRevenue) * 100 : 0;
  });

  return Array.from(breakdown.values()).sort((a, b) => b.revenue - a.revenue);
}

// Get top customers
export async function getTopCustomers(limit: number = 10): Promise<TopCustomer[]> {
  const { data: customers } = await supabase
    .from('quotes')
    .select(`
      user_id,
      users!inner(id, email, created_at),
      total
    `)
    .eq('status', 'accepted');

  if (!customers) return [];

  const customerMap = new Map<string, TopCustomer>();

  customers.forEach((order: any) => {
    const userId = order.user_id;
    const existing = customerMap.get(userId);

    if (existing) {
      existing.revenue += order.total;
      existing.orders += 1;
    } else {
      customerMap.set(userId, {
        id: userId,
        name: order.users.email.split('@')[0],
        email: order.users.email,
        revenue: order.total,
        orders: 1,
        joinDate: order.users.created_at
      });
    }
  });

  return Array.from(customerMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

// Get quote performance metrics
export async function getQuotePerformance(
  startDate: Date,
  endDate: Date
): Promise<QuotePerformance[]> {
  const { data: quotes } = await supabase
    .from('quotes')
    .select('created_at, status')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at');

  if (!quotes) return [];

  const performanceMap = new Map<string, QuotePerformance>();
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Initialize days
  days.forEach(day => {
    const key = format(day, 'yyyy-MM-dd');
    performanceMap.set(key, {
      date: key,
      sent: 0,
      accepted: 0,
      rejected: 0,
      pending: 0,
      acceptanceRate: 0
    });
  });

  // Aggregate quotes by day and status
  quotes.forEach(quote => {
    const date = format(new Date(quote.created_at), 'yyyy-MM-dd');
    const perf = performanceMap.get(date);

    if (perf) {
      perf.sent += 1;

      switch(quote.status) {
        case 'accepted':
          perf.accepted += 1;
          break;
        case 'rejected':
          perf.rejected += 1;
          break;
        case 'pending':
        case 'sent':
          perf.pending += 1;
          break;
      }
    }
  });

  // Calculate acceptance rates
  performanceMap.forEach(perf => {
    if (perf.sent > 0) {
      perf.acceptanceRate = (perf.accepted / perf.sent) * 100;
    }
  });

  return Array.from(performanceMap.values());
}

// Get average deal value
export async function getAverageDealValue(
  startDate: Date,
  endDate: Date
): Promise<{ overall: number; byGPUType: Map<string, number> }> {
  const { data: orders } = await supabase
    .from('quotes')
    .select('total, gpu_type')
    .eq('status', 'accepted')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  if (!orders || orders.length === 0) {
    return { overall: 0, byGPUType: new Map() };
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const overall = totalRevenue / orders.length;

  const byGPUType = new Map<string, number>();
  const gpuTypeTotals = new Map<string, { total: number; count: number }>();

  orders.forEach(order => {
    const type = order.gpu_type || 'Unknown';
    const existing = gpuTypeTotals.get(type) || { total: 0, count: 0 };
    existing.total += order.total;
    existing.count += 1;
    gpuTypeTotals.set(type, existing);
  });

  gpuTypeTotals.forEach((value, key) => {
    byGPUType.set(key, value.total / value.count);
  });

  return { overall, byGPUType };
}

// Get key metrics with changes
export async function getKeyMetrics(period: '7d' | '30d' | '90d' | '1y' = '30d'): Promise<MetricCard[]> {
  const endDate = new Date();
  let startDate: Date;
  let previousStartDate: Date;
  let previousEndDate: Date;

  switch(period) {
    case '7d':
      startDate = subDays(endDate, 7);
      previousEndDate = subDays(endDate, 7);
      previousStartDate = subDays(endDate, 14);
      break;
    case '30d':
      startDate = subDays(endDate, 30);
      previousEndDate = subDays(endDate, 30);
      previousStartDate = subDays(endDate, 60);
      break;
    case '90d':
      startDate = subDays(endDate, 90);
      previousEndDate = subDays(endDate, 90);
      previousStartDate = subDays(endDate, 180);
      break;
    case '1y':
      startDate = subDays(endDate, 365);
      previousEndDate = subDays(endDate, 365);
      previousStartDate = subDays(endDate, 730);
      break;
  }

  // Current period metrics
  const { data: currentOrders } = await supabase
    .from('quotes')
    .select('total')
    .eq('status', 'accepted')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  const { data: currentQuotes } = await supabase
    .from('quotes')
    .select('id')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  const { data: currentRFQs } = await supabase
    .from('rfqs')
    .select('id')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  // Previous period metrics
  const { data: previousOrders } = await supabase
    .from('quotes')
    .select('total')
    .eq('status', 'accepted')
    .gte('created_at', previousStartDate.toISOString())
    .lte('created_at', previousEndDate.toISOString());

  const currentRevenue = currentOrders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const previousRevenue = previousOrders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const revenueChange = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;

  const currentOrderCount = currentOrders?.length || 0;
  const previousOrderCount = previousOrders?.length || 0;
  const orderChange = previousOrderCount > 0 ? ((currentOrderCount - previousOrderCount) / previousOrderCount) * 100 : 0;

  const currentQuoteCount = currentQuotes?.length || 0;
  const currentRFQCount = currentRFQs?.length || 0;
  const conversionRate = currentRFQCount > 0 ? (currentOrderCount / currentRFQCount) * 100 : 0;

  const avgDealValue = currentOrderCount > 0 ? currentRevenue / currentOrderCount : 0;

  return [
    {
      title: 'Total Revenue',
      value: currentRevenue,
      change: revenueChange,
      changeType: revenueChange >= 0 ? 'increase' : 'decrease',
      prefix: '$'
    },
    {
      title: 'Total Orders',
      value: currentOrderCount,
      change: orderChange,
      changeType: orderChange >= 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Conversion Rate',
      value: conversionRate.toFixed(1),
      change: 0, // Would need previous conversion rate
      changeType: 'neutral',
      suffix: '%'
    },
    {
      title: 'Avg Deal Value',
      value: avgDealValue,
      change: 0, // Would need previous avg
      changeType: 'neutral',
      prefix: '$'
    }
  ];
}

// Get response time metrics
export async function getResponseTimeMetrics(
  startDate: Date,
  endDate: Date
): Promise<{ avgResponseTime: number; distribution: Map<string, number> }> {
  const { data: rfqs } = await supabase
    .from('rfqs')
    .select('id, created_at')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  const { data: quotes } = await supabase
    .from('quotes')
    .select('rfq_id, created_at')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  if (!rfqs || !quotes) {
    return { avgResponseTime: 0, distribution: new Map() };
  }

  const responseTimes: number[] = [];
  const distribution = new Map<string, number>([
    ['< 1 hour', 0],
    ['1-6 hours', 0],
    ['6-24 hours', 0],
    ['1-3 days', 0],
    ['> 3 days', 0]
  ]);

  rfqs.forEach(rfq => {
    const quote = quotes.find(q => q.rfq_id === rfq.id);
    if (quote) {
      const rfqTime = new Date(rfq.created_at).getTime();
      const quoteTime = new Date(quote.created_at).getTime();
      const responseHours = (quoteTime - rfqTime) / (1000 * 60 * 60);

      responseTimes.push(responseHours);

      if (responseHours < 1) {
        distribution.set('< 1 hour', (distribution.get('< 1 hour') || 0) + 1);
      } else if (responseHours < 6) {
        distribution.set('1-6 hours', (distribution.get('1-6 hours') || 0) + 1);
      } else if (responseHours < 24) {
        distribution.set('6-24 hours', (distribution.get('6-24 hours') || 0) + 1);
      } else if (responseHours < 72) {
        distribution.set('1-3 days', (distribution.get('1-3 days') || 0) + 1);
      } else {
        distribution.set('> 3 days', (distribution.get('> 3 days') || 0) + 1);
      }
    }
  });

  const avgResponseTime = responseTimes.length > 0
    ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
    : 0;

  return { avgResponseTime, distribution };
}