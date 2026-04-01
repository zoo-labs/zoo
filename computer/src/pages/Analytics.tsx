import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CpuChipIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import {
  getUsageStats,
  getSpendingHistory,
  getDateRange,
  exportToCSV,
  downloadCSV,
  generateSampleData,
  type UsageStats
} from '../lib/analytics';
import { getUserUsage, getUsageSummary, getMonthlySpending } from '../lib/supabase';

// Color palette for charts
const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

interface DateRangeOption {
  label: string;
  value: 'week' | 'month' | 'quarter' | 'all';
}

const dateRangeOptions: DateRangeOption[] = [
  { label: 'Last 7 Days', value: 'week' },
  { label: 'Last 30 Days', value: 'month' },
  { label: 'Last 90 Days', value: 'quarter' },
  { label: 'All Time', value: 'all' },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'all'>('month');
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [monthlySpending, setMonthlySpending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // For demo purposes, using mock user ID
  const userId = 'demo-user-123';

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Check if we have sample data, if not generate it
      const existingData = localStorage.getItem('usage_records');
      if (!existingData || JSON.parse(existingData).length === 0) {
        generateSampleData(userId);
      }

      const { start, end } = getDateRange(dateRange);
      const usageStats = getUsageStats(userId, start, end);
      setStats(usageStats);

      const spending = getSpendingHistory(userId, 6);
      setMonthlySpending(spending);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!stats) return;

    const records = JSON.parse(localStorage.getItem('usage_records') || '[]');
    const { start, end } = getDateRange(dateRange);
    const filteredRecords = records.filter((r: any) =>
      r.user_id === userId &&
      new Date(r.timestamp) >= start &&
      new Date(r.timestamp) <= end
    );

    const csv = exportToCSV(filteredRecords);
    const filename = `gpu-usage-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    downloadCSV(filename, csv);
  };

  const pieChartData = stats
    ? Object.entries(stats.byGpuType).map(([name, data]) => ({
        name,
        value: data.cost,
        hours: data.hours,
      }))
    : [];

  const calculateSavings = () => {
    if (!stats) return 0;
    // Assuming 20% savings vs on-demand pricing
    return stats.totalCost * 0.2;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ChartBarIcon className="h-8 w-8 text-purple-500" />
            GPU Usage Analytics
          </h1>
          <p className="text-gray-400">Track your compute usage, costs, and performance metrics</p>
        </div>

        {/* Date Range Selector and Export */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {dateRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setDateRange(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  dateRange === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export CSV
          </button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <ClockIcon className="h-8 w-8 text-cyan-500" />
              <span className="text-xs text-gray-400">This Month</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.totalHours.toFixed(1) || '0'}</p>
            <p className="text-sm text-gray-400">Compute Hours</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
              <span className="text-xs text-gray-400">Current Cost</span>
            </div>
            <p className="text-2xl font-bold text-white">${stats?.totalCost.toFixed(2) || '0'}</p>
            <p className="text-sm text-gray-400">Total Spending</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <ChartBarIcon className="h-8 w-8 text-yellow-500" />
              <span className="text-xs text-gray-400">Average</span>
            </div>
            <p className="text-2xl font-bold text-white">
              ${stats?.averageHourlyCost.toFixed(2) || '0'}
            </p>
            <p className="text-sm text-gray-400">Per Hour</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <CpuChipIcon className="h-8 w-8 text-purple-500" />
              <span className="text-xs text-gray-400">Most Used</span>
            </div>
            <p className="text-lg font-bold text-white truncate">
              {stats && Object.keys(stats.byGpuType).length > 0
                ? Object.entries(stats.byGpuType).sort((a, b) => b[1].hours - a[1].hours)[0][0]
                : 'N/A'}
            </p>
            <p className="text-sm text-gray-400">GPU Type</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <SparklesIcon className="h-8 w-8 text-pink-500" />
              <span className="text-xs text-gray-400">Savings</span>
            </div>
            <p className="text-2xl font-bold text-white">${calculateSavings().toFixed(2)}</p>
            <p className="text-sm text-gray-400">vs On-Demand</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Usage Over Time */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Usage Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.dailyUsage || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  name="Hours"
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', r: 4 }}
                  name="Cost ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* GPU Type Distribution */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Cost by GPU Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Spending Trend */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                />
                <Bar dataKey="cost" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Compute Hours by GPU */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Compute Hours by GPU Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={Object.entries(stats?.byGpuType || {}).map(([gpu, data]) => ({
                  gpu: gpu.replace('NVIDIA ', ''),
                  hours: data.hours,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="gpu"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  formatter={(value: number) => `${value.toFixed(1)} hrs`}
                />
                <Bar dataKey="hours" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cumulative Usage */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Cumulative Usage & Cost</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats?.dailyUsage || []}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.5)' }}
              />
              <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="computeUnits"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorHours)"
                name="Compute Units"
              />
              <Area
                type="monotone"
                dataKey="cost"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#colorCost)"
                name="Cost ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}