import { format, subDays, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';

// Types
export interface UsageRecord {
  id: string;
  user_id: string;
  reservation_id?: string;
  gpu_type: string;
  hours_used: number;
  compute_units: number;
  cost_usd: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface UsageStats {
  totalHours: number;
  totalCost: number;
  totalComputeUnits: number;
  averageHourlyCost: number;
  recordCount: number;
  byGpuType: Record<string, {
    hours: number;
    cost: number;
    computeUnits: number;
    count: number;
  }>;
  dailyUsage: Array<{
    date: string;
    hours: number;
    cost: number;
    computeUnits: number;
  }>;
}

export interface PricingTier {
  gpuType: string;
  pricePerHour: number;
  computeUnitsPerHour: number;
}

// Pricing configuration
const DEFAULT_PRICING: Record<string, PricingTier> = {
  'NVIDIA H100': { gpuType: 'NVIDIA H100', pricePerHour: 3.50, computeUnitsPerHour: 100 },
  'NVIDIA A100': { gpuType: 'NVIDIA A100', pricePerHour: 2.00, computeUnitsPerHour: 75 },
  'NVIDIA A6000': { gpuType: 'NVIDIA A6000', pricePerHour: 1.50, computeUnitsPerHour: 60 },
  'NVIDIA RTX 4090': { gpuType: 'NVIDIA RTX 4090', pricePerHour: 1.20, computeUnitsPerHour: 50 },
  'NVIDIA RTX 3090': { gpuType: 'NVIDIA RTX 3090', pricePerHour: 0.90, computeUnitsPerHour: 40 },
  'NVIDIA RTX A5000': { gpuType: 'NVIDIA RTX A5000', pricePerHour: 0.80, computeUnitsPerHour: 35 },
  'NVIDIA V100': { gpuType: 'NVIDIA V100', pricePerHour: 0.70, computeUnitsPerHour: 30 },
};

// Track usage
export async function trackUsage(
  userId: string,
  gpuType: string,
  hours: number,
  computeUnits?: number,
  metadata?: Record<string, any>
): Promise<UsageRecord> {
  const pricing = DEFAULT_PRICING[gpuType] || {
    pricePerHour: 1.00,
    computeUnitsPerHour: 50
  };

  const calculatedComputeUnits = computeUnits || (hours * pricing.computeUnitsPerHour);
  const costUsd = hours * pricing.pricePerHour;

  const record: UsageRecord = {
    id: crypto.randomUUID(),
    user_id: userId,
    gpu_type: gpuType,
    hours_used: hours,
    compute_units: calculatedComputeUnits,
    cost_usd: costUsd,
    timestamp: new Date().toISOString(),
    metadata
  };

  // In production, this would save to database
  // For now, we'll store in localStorage for demo
  const existingRecords = getLocalStorageRecords();
  existingRecords.push(record);
  localStorage.setItem('usage_records', JSON.stringify(existingRecords));

  return record;
}

// Get usage statistics
export function getUsageStats(
  userId: string,
  startDate: Date,
  endDate: Date
): UsageStats {
  const records = getLocalStorageRecords().filter(r =>
    r.user_id === userId &&
    new Date(r.timestamp) >= startDate &&
    new Date(r.timestamp) <= endDate
  );

  const stats: UsageStats = {
    totalHours: 0,
    totalCost: 0,
    totalComputeUnits: 0,
    averageHourlyCost: 0,
    recordCount: records.length,
    byGpuType: {},
    dailyUsage: []
  };

  // Aggregate by GPU type
  records.forEach(record => {
    stats.totalHours += record.hours_used;
    stats.totalCost += record.cost_usd;
    stats.totalComputeUnits += record.compute_units;

    if (!stats.byGpuType[record.gpu_type]) {
      stats.byGpuType[record.gpu_type] = {
        hours: 0,
        cost: 0,
        computeUnits: 0,
        count: 0
      };
    }

    stats.byGpuType[record.gpu_type].hours += record.hours_used;
    stats.byGpuType[record.gpu_type].cost += record.cost_usd;
    stats.byGpuType[record.gpu_type].computeUnits += record.compute_units;
    stats.byGpuType[record.gpu_type].count++;
  });

  // Calculate average hourly cost
  stats.averageHourlyCost = stats.totalHours > 0 ? stats.totalCost / stats.totalHours : 0;

  // Aggregate daily usage
  const dailyMap = new Map<string, { hours: number; cost: number; computeUnits: number }>();

  records.forEach(record => {
    const date = format(new Date(record.timestamp), 'yyyy-MM-dd');
    const existing = dailyMap.get(date) || { hours: 0, cost: 0, computeUnits: 0 };

    existing.hours += record.hours_used;
    existing.cost += record.cost_usd;
    existing.computeUnits += record.compute_units;

    dailyMap.set(date, existing);
  });

  stats.dailyUsage = Array.from(dailyMap.entries()).map(([date, data]) => ({
    date,
    ...data
  })).sort((a, b) => a.date.localeCompare(b.date));

  return stats;
}

// Get spending history
export function getSpendingHistory(
  userId: string,
  months: number = 6
): Array<{ month: string; cost: number; hours: number }> {
  const history: Array<{ month: string; cost: number; hours: number }> = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = startOfMonth(subDays(now, i * 30));
    const monthEnd = endOfMonth(monthStart);

    const stats = getUsageStats(userId, monthStart, monthEnd);

    history.push({
      month: format(monthStart, 'MMM yyyy'),
      cost: stats.totalCost,
      hours: stats.totalHours
    });
  }

  return history;
}

// Calculate costs
export function calculateCosts(
  usageData: Pick<UsageRecord, 'gpu_type' | 'hours_used'>[],
  customPricing?: Record<string, PricingTier>
): number {
  const pricing = customPricing || DEFAULT_PRICING;

  return usageData.reduce((total, usage) => {
    const tier = pricing[usage.gpu_type];
    if (!tier) return total;
    return total + (usage.hours_used * tier.pricePerHour);
  }, 0);
}

// Export to CSV
export function exportToCSV(data: UsageRecord[]): string {
  if (data.length === 0) return '';

  const headers = [
    'Date',
    'GPU Type',
    'Hours Used',
    'Compute Units',
    'Cost (USD)',
    'Reservation ID'
  ];

  const rows = data.map(record => [
    format(new Date(record.timestamp), 'yyyy-MM-dd HH:mm:ss'),
    record.gpu_type,
    record.hours_used.toFixed(2),
    record.compute_units.toFixed(2),
    record.cost_usd.toFixed(2),
    record.reservation_id || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csvContent;
}

// Export to PDF (returns data structure for PDF generation)
export function exportToPDF(data: UsageRecord[], stats: UsageStats) {
  return {
    title: 'GPU Usage Report',
    generatedAt: new Date().toISOString(),
    summary: {
      totalHours: stats.totalHours.toFixed(2),
      totalCost: `$${stats.totalCost.toFixed(2)}`,
      totalComputeUnits: stats.totalComputeUnits.toFixed(0),
      averageHourlyCost: `$${stats.averageHourlyCost.toFixed(2)}`,
      recordCount: stats.recordCount
    },
    byGpuType: Object.entries(stats.byGpuType).map(([gpu, data]) => ({
      gpu,
      hours: data.hours.toFixed(2),
      cost: `$${data.cost.toFixed(2)}`,
      computeUnits: data.computeUnits.toFixed(0),
      sessions: data.count
    })),
    records: data.map(record => ({
      date: format(new Date(record.timestamp), 'yyyy-MM-dd HH:mm'),
      gpu: record.gpu_type,
      hours: record.hours_used.toFixed(2),
      cost: `$${record.cost_usd.toFixed(2)}`
    }))
  };
}

// Helper function to download CSV
export function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Date range helpers
export function getDateRange(preset: 'week' | 'month' | 'quarter' | 'all'): { start: Date; end: Date } {
  const end = endOfDay(new Date());
  let start: Date;

  switch (preset) {
    case 'week':
      start = startOfDay(subDays(end, 7));
      break;
    case 'month':
      start = startOfDay(subDays(end, 30));
      break;
    case 'quarter':
      start = startOfDay(subDays(end, 90));
      break;
    case 'all':
      start = new Date('2024-01-01');
      break;
    default:
      start = startOfDay(subDays(end, 30));
  }

  return { start, end };
}

// Local storage helpers (for demo purposes)
function getLocalStorageRecords(): UsageRecord[] {
  try {
    const stored = localStorage.getItem('usage_records');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Generate sample data for demo
export function generateSampleData(userId: string) {
  const gpuTypes = Object.keys(DEFAULT_PRICING);
  const records: UsageRecord[] = [];
  const now = new Date();

  // Generate 90 days of sample data
  for (let daysAgo = 90; daysAgo >= 0; daysAgo -= Math.floor(Math.random() * 3) + 1) {
    const date = subDays(now, daysAgo);
    const numRecords = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numRecords; i++) {
      const gpuType = gpuTypes[Math.floor(Math.random() * gpuTypes.length)];
      const hours = Math.random() * 8 + 0.5;
      const pricing = DEFAULT_PRICING[gpuType];

      records.push({
        id: crypto.randomUUID(),
        user_id: userId,
        gpu_type: gpuType,
        hours_used: hours,
        compute_units: hours * pricing.computeUnitsPerHour,
        cost_usd: hours * pricing.pricePerHour,
        timestamp: date.toISOString(),
        metadata: {
          project: `Project-${Math.floor(Math.random() * 5) + 1}`,
          region: ['us-west', 'us-east', 'eu-west'][Math.floor(Math.random() * 3)]
        }
      });
    }
  }

  // Store in localStorage
  localStorage.setItem('usage_records', JSON.stringify(records));
  return records;
}