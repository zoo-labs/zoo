import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ServerStackIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  FunnelIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PaperAirplaneIcon,
  EyeIcon,
  DocumentPlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Funnel as RechartsFunction,
  FunnelChart
} from 'recharts';
import {
  supabase,
  checkAdminRole,
  getAllRFQs,
  getAllClusterRequests,
  getAllQuotes,
  updateRFQStatus,
  updateClusterRequestStatus,
  createQuote,
  generateQuoteNumber,
  type RFQ,
  type ClusterRequest,
  type Quote
} from '../lib/supabase';
import {
  getRevenueData,
  getConversionFunnel,
  getCustomerGrowth,
  getGPUTypeBreakdown,
  getTopCustomers,
  getQuotePerformance,
  getAverageDealValue,
  getKeyMetrics,
  getResponseTimeMetrics,
  type RevenueDataPoint,
  type ConversionFunnel,
  type CustomerGrowth,
  type GPUTypeBreakdown,
  type TopCustomer,
  type QuotePerformance,
  type MetricCard
} from '../lib/adminAnalytics';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';

interface QuoteLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
      active
        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {count !== undefined && (
      <span className={`px-2 py-0.5 text-xs rounded-full ${
        active ? 'bg-white/20' : 'bg-gray-700'
      }`}>
        {count}
      </span>
    )}
  </button>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    reviewing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    quoted: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    sent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    viewed: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    expired: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  const icons = {
    pending: <ClockIcon className="w-3 h-3" />,
    reviewing: <EyeIcon className="w-3 h-3" />,
    quoted: <DocumentTextIcon className="w-3 h-3" />,
    accepted: <CheckCircleIcon className="w-3 h-3" />,
    rejected: <XMarkIcon className="w-3 h-3" />,
    sent: <PaperAirplaneIcon className="w-3 h-3" />,
    viewed: <EyeIcon className="w-3 h-3" />,
    expired: <ExclamationCircleIcon className="w-3 h-3" />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${colors[status as keyof typeof colors] || colors.pending}`}>
      {icons[status as keyof typeof icons]}
      {status}
    </span>
  );
};

const MetricCard: React.FC<MetricCard> = ({ title, value, change, changeType, prefix, suffix }) => {
  const isPositive = changeType === 'increase';
  const isNeutral = changeType === 'neutral';

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
      {!isNeutral && (
        <div className={`flex items-center gap-1 mt-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
          <span className="text-sm">{Math.abs(change).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-white text-sm font-semibold">
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Chart colors
const CHART_COLORS = ['#9333EA', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'rfqs' | 'clusters' | 'quotes' | 'builder'>('analytics');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Data states
  const [rfqs, setRFQs] = useState<RFQ[]>([]);
  const [clusterRequests, setClusterRequests] = useState<ClusterRequest[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // Analytics states
  const [keyMetrics, setKeyMetrics] = useState<MetricCard[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([]);
  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnel[]>([]);
  const [customerGrowth, setCustomerGrowth] = useState<CustomerGrowth[]>([]);
  const [gpuBreakdown, setGpuBreakdown] = useState<GPUTypeBreakdown[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [quotePerformance, setQuotePerformance] = useState<QuotePerformance[]>([]);
  const [avgDealValue, setAvgDealValue] = useState<{ overall: number; byGPUType: Map<string, number> }>({ overall: 0, byGPUType: new Map() });
  const [responseTime, setResponseTime] = useState<{ avgResponseTime: number; distribution: Map<string, number> }>({ avgResponseTime: 0, distribution: new Map() });

  // Filter states
  const [rfqFilter, setRfqFilter] = useState<string>('all');
  const [clusterFilter, setClusterFilter] = useState<string>('all');
  const [quoteFilter, setQuoteFilter] = useState<string>('all');

  // Quote builder states
  const [selectedRFQ, setSelectedRFQ] = useState<string>('');
  const [selectedClusterRequest, setSelectedClusterRequest] = useState<string>('');
  const [quoteItems, setQuoteItems] = useState<QuoteLineItem[]>([
    { description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);
  const [quoteTax, setQuoteTax] = useState(0);
  const [quoteNotes, setQuoteNotes] = useState('');
  const [quoteValidDays, setQuoteValidDays] = useState(30);
  const [paymentTerms, setPaymentTerms] = useState('Net 30');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadData();
      loadAnalytics();
    }
  }, [isAdmin, rfqFilter, clusterFilter, quoteFilter, dateRange]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (isAdmin) {
      const interval = setInterval(() => {
        loadAnalytics();
        setLastUpdated(new Date());
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isAdmin, dateRange]);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/signin');
        return;
      }

      const adminStatus = await checkAdminRole(user.id);
      if (!adminStatus) {
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/signin');
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [rfqData, clusterData, quoteData] = await Promise.all([
        getAllRFQs(rfqFilter === 'all' ? undefined : rfqFilter),
        getAllClusterRequests(clusterFilter === 'all' ? undefined : clusterFilter),
        getAllQuotes(quoteFilter === 'all' ? undefined : quoteFilter),
      ]);

      setRFQs(rfqData || []);
      setClusterRequests(clusterData || []);
      setQuotes(quoteData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      setIsRefreshing(true);

      const endDate = new Date();
      let startDate: Date;
      let groupBy: 'day' | 'week' | 'month' = 'day';

      switch(dateRange) {
        case '7d':
          startDate = subDays(endDate, 7);
          groupBy = 'day';
          break;
        case '30d':
          startDate = subDays(endDate, 30);
          groupBy = 'day';
          break;
        case '90d':
          startDate = subDays(endDate, 90);
          groupBy = 'week';
          break;
        case '1y':
          startDate = subDays(endDate, 365);
          groupBy = 'month';
          break;
      }

      const [
        metrics,
        revenue,
        funnel,
        growth,
        breakdown,
        customers,
        performance,
        dealValue,
        responseMetrics
      ] = await Promise.all([
        getKeyMetrics(dateRange),
        getRevenueData(startDate, endDate, groupBy),
        getConversionFunnel(startDate, endDate),
        getCustomerGrowth(startDate, endDate),
        getGPUTypeBreakdown(startDate, endDate),
        getTopCustomers(10),
        getQuotePerformance(startDate, endDate),
        getAverageDealValue(startDate, endDate),
        getResponseTimeMetrics(startDate, endDate)
      ]);

      setKeyMetrics(metrics);
      setRevenueData(revenue);
      setConversionFunnel(funnel);
      setCustomerGrowth(growth);
      setGpuBreakdown(breakdown);
      setTopCustomers(customers);
      setQuotePerformance(performance);
      setAvgDealValue(dealValue);
      setResponseTime(responseMetrics);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleManualRefresh = () => {
    loadData();
    loadAnalytics();
  };

  const handleExportData = () => {
    // Convert data to CSV format
    const csvContent = `Date,Revenue,Orders
${revenueData.map(d => `${d.date},${d.revenue},${d.orders}`).join('\n')}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hanzo-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleStatusUpdate = async (type: 'rfq' | 'cluster', id: string, newStatus: string) => {
    try {
      if (type === 'rfq') {
        await updateRFQStatus(id, newStatus as RFQ['status']);
      } else {
        await updateClusterRequestStatus(id, newStatus as ClusterRequest['status']);
      }
      await loadData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const addQuoteItem = () => {
    setQuoteItems([...quoteItems, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeQuoteItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const updateQuoteItem = (index: number, field: keyof QuoteLineItem, value: string | number) => {
    const updatedItems = [...quoteItems];
    const item = updatedItems[index];

    if (field === 'quantity' || field === 'unitPrice') {
      item[field] = Number(value) || 0;
      item.total = item.quantity * item.unitPrice;
    } else if (field === 'description') {
      item.description = value as string;
    }

    setQuoteItems(updatedItems);
  };

  const calculateQuoteTotal = () => {
    const subtotal = quoteItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = (subtotal * quoteTax) / 100;
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleCreateQuote = async () => {
    try {
      const { subtotal, taxAmount, total } = calculateQuoteTotal();
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + quoteValidDays);

      const quoteData = {
        rfq_id: selectedRFQ || null,
        cluster_request_id: selectedClusterRequest || null,
        quote_number: generateQuoteNumber(),
        items: quoteItems.filter(item => item.description),
        subtotal,
        tax: taxAmount,
        total,
        payment_terms: paymentTerms,
        valid_until: validUntil.toISOString(),
        notes: quoteNotes || null,
      };

      await createQuote(quoteData);

      // Update the status of the RFQ or Cluster Request
      if (selectedRFQ) {
        await updateRFQStatus(selectedRFQ, 'quoted');
      }
      if (selectedClusterRequest) {
        await updateClusterRequestStatus(selectedClusterRequest, 'quoted');
      }

      // Reset form
      setSelectedRFQ('');
      setSelectedClusterRequest('');
      setQuoteItems([{ description: '', quantity: 1, unitPrice: 0, total: 0 }]);
      setQuoteTax(0);
      setQuoteNotes('');

      // Reload data
      await loadData();
      await loadAnalytics();
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Access Denied</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage RFQs, Cluster Requests, and Quotes</p>
          </div>

          {activeTab === 'analytics' && (
            <div className="flex items-center gap-4">
              <div className="text-xs text-gray-500">
                Last updated: {format(lastUpdated, 'HH:mm:ss')}
              </div>
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isRefreshing
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <ArrowPathIcon className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
            icon={<ChartPieIcon className="w-5 h-5" />}
            label="Analytics"
          />
          <TabButton
            active={activeTab === 'rfqs'}
            onClick={() => setActiveTab('rfqs')}
            icon={<DocumentTextIcon className="w-5 h-5" />}
            label="RFQs"
            count={rfqs.length}
          />
          <TabButton
            active={activeTab === 'clusters'}
            onClick={() => setActiveTab('clusters')}
            icon={<ServerStackIcon className="w-5 h-5" />}
            label="Cluster Requests"
            count={clusterRequests.length}
          />
          <TabButton
            active={activeTab === 'quotes'}
            onClick={() => setActiveTab('quotes')}
            icon={<CurrencyDollarIcon className="w-5 h-5" />}
            label="Quotes"
            count={quotes.length}
          />
          <TabButton
            active={activeTab === 'builder'}
            onClick={() => setActiveTab('builder')}
            icon={<PlusCircleIcon className="w-5 h-5" />}
            label="Quote Builder"
          />
        </div>

        {/* Content */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Date Range Selector */}
              <div className="flex gap-2">
                {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      dateRange === range
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
                  </button>
                ))}
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyMetrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Over Time */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Revenue Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9333EA" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#9333EA" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#9333EA"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* GPU Type Breakdown */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Revenue by GPU Type</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gpuBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.gpuType}: ${entry.percentage.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {gpuBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Conversion Funnel</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={conversionFunnel} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis dataKey="stage" type="category" stroke="#9CA3AF" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6">
                        {conversionFunnel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Customer Growth */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Customer Growth</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={customerGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis yAxisId="left" stroke="#9CA3AF" />
                      <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="newCustomers" fill="#10B981" name="New Customers" />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="totalCustomers"
                        stroke="#F59E0B"
                        name="Total Customers"
                        strokeWidth={2}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Quote Performance */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Quote Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={quotePerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sent" stroke="#3B82F6" name="Sent" strokeWidth={2} />
                      <Line type="monotone" dataKey="accepted" stroke="#10B981" name="Accepted" strokeWidth={2} />
                      <Line type="monotone" dataKey="rejected" stroke="#EF4444" name="Rejected" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Average Deal Value by GPU Type */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Average Deal Value by GPU Type</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={Array.from(avgDealValue.byGPUType.entries()).map(([gpu, value]) => ({ gpu, value }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="gpu" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#EC4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Customers Table */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Top Customers</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Revenue</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Orders</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCustomers.map((customer, index) => (
                        <tr key={customer.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                          <td className="py-3 px-4 text-white">#{index + 1}</td>
                          <td className="py-3 px-4 text-white">{customer.name}</td>
                          <td className="py-3 px-4 text-gray-300">{customer.email}</td>
                          <td className="py-3 px-4 text-green-400 font-semibold">
                            ${customer.revenue.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-gray-300">{customer.orders}</td>
                          <td className="py-3 px-4 text-gray-400 text-sm">
                            {new Date(customer.joinDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Response Time Distribution */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Response Time Distribution</h3>
                <div className="mb-4">
                  <p className="text-gray-400">Average Response Time: <span className="text-white font-semibold">{responseTime.avgResponseTime.toFixed(1)} hours</span></p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={Array.from(responseTime.distribution.entries()).map(([range, count]) => ({ range, count }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="range" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* RFQs Tab */}
          {activeTab === 'rfqs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">RFQ Management</h2>
                <select
                  value={rfqFilter}
                  onChange={(e) => setRfqFilter(e.target.value)}
                  className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="quoted">Quoted</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Company</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">GPU Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Quantity</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Duration</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfqs.map((rfq) => (
                      <tr key={rfq.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                        <td className="py-3 px-4 text-white">{rfq.company}</td>
                        <td className="py-3 px-4 text-gray-300">{rfq.email}</td>
                        <td className="py-3 px-4 text-gray-300">{rfq.gpu_type}</td>
                        <td className="py-3 px-4 text-gray-300">{rfq.quantity}</td>
                        <td className="py-3 px-4 text-gray-300">{rfq.duration_months || 'N/A'} months</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={rfq.status} />
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-sm">
                          {new Date(rfq.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <select
                              value={rfq.status}
                              onChange={(e) => handleStatusUpdate('rfq', rfq.id, e.target.value)}
                              className="bg-gray-700/50 text-white px-2 py-1 rounded text-sm border border-gray-600 focus:border-purple-500 focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="quoted">Quoted</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <button
                              onClick={() => {
                                setSelectedRFQ(rfq.id);
                                setActiveTab('builder');
                              }}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              Create Quote
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cluster Requests Tab */}
          {activeTab === 'clusters' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Cluster Request Management</h2>
                <select
                  value={clusterFilter}
                  onChange={(e) => setClusterFilter(e.target.value)}
                  className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="quoted">Quoted</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Company</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Requirements</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">GPU Count</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clusterRequests.map((cluster) => (
                      <tr key={cluster.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                        <td className="py-3 px-4 text-white">{cluster.first_name} {cluster.last_name}</td>
                        <td className="py-3 px-4 text-gray-300">{cluster.company}</td>
                        <td className="py-3 px-4 text-gray-300">{cluster.email}</td>
                        <td className="py-3 px-4 text-gray-300 max-w-xs truncate" title={cluster.cluster_requirements}>
                          {cluster.cluster_requirements}
                        </td>
                        <td className="py-3 px-4 text-gray-300">{cluster.number_of_gpus}</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={cluster.status} />
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-sm">
                          {new Date(cluster.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <select
                              value={cluster.status}
                              onChange={(e) => handleStatusUpdate('cluster', cluster.id, e.target.value)}
                              className="bg-gray-700/50 text-white px-2 py-1 rounded text-sm border border-gray-600 focus:border-purple-500 focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="quoted">Quoted</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <button
                              onClick={() => {
                                setSelectedClusterRequest(cluster.id);
                                setActiveTab('builder');
                              }}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              Create Quote
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Quote Management</h2>
                <select
                  value={quoteFilter}
                  onChange={(e) => setQuoteFilter(e.target.value)}
                  className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="viewed">Viewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="expired">Expired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Quote #</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Total</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Valid Until</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                        <td className="py-3 px-4 text-white font-mono">{quote.quote_number}</td>
                        <td className="py-3 px-4 text-gray-300">
                          {quote.rfq_id ? 'RFQ' : quote.cluster_request_id ? 'Cluster' : 'Manual'}
                        </td>
                        <td className="py-3 px-4 text-gray-300">${quote.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={quote.status} />
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-sm">
                          {quote.valid_until ? new Date(quote.valid_until).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-sm">
                          {new Date(quote.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quote Builder Tab */}
          {activeTab === 'builder' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-semibold text-white mb-6">Create New Quote</h2>

              <div className="space-y-6">
                {/* Select RFQ or Cluster Request */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Select RFQ</label>
                    <select
                      value={selectedRFQ}
                      onChange={(e) => {
                        setSelectedRFQ(e.target.value);
                        setSelectedClusterRequest('');
                      }}
                      className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">None</option>
                      {rfqs.filter(r => r.status !== 'quoted').map(rfq => (
                        <option key={rfq.id} value={rfq.id}>
                          {rfq.company} - {rfq.gpu_type} x{rfq.quantity}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Select Cluster Request</label>
                    <select
                      value={selectedClusterRequest}
                      onChange={(e) => {
                        setSelectedClusterRequest(e.target.value);
                        setSelectedRFQ('');
                      }}
                      className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">None</option>
                      {clusterRequests.filter(c => c.status !== 'quoted').map(cluster => (
                        <option key={cluster.id} value={cluster.id}>
                          {cluster.company} - {cluster.number_of_gpus} GPUs
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Line Items */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-gray-400">Line Items</label>
                    <button
                      onClick={addQuoteItem}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1"
                    >
                      <PlusCircleIcon className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {quoteItems.map((item, index) => (
                      <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                          <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-1">Description</label>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => updateQuoteItem(index, 'description', e.target.value)}
                              placeholder="e.g., NVIDIA A100 80GB GPU"
                              className="w-full bg-gray-800/50 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-sm mb-1">Quantity</label>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuoteItem(index, 'quantity', e.target.value)}
                              min="1"
                              className="w-full bg-gray-800/50 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-sm mb-1">Unit Price</label>
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateQuoteItem(index, 'unitPrice', e.target.value)}
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              className="w-full bg-gray-800/50 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="block text-gray-400 text-sm mb-1">Total</label>
                              <div className="text-white font-semibold">
                                ${item.total.toFixed(2)}
                              </div>
                            </div>
                            {quoteItems.length > 1 && (
                              <button
                                onClick={() => removeQuoteItem(index)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <XMarkIcon className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Quote Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      value={quoteTax}
                      onChange={(e) => setQuoteTax(Number(e.target.value))}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Valid For (Days)</label>
                    <input
                      type="number"
                      value={quoteValidDays}
                      onChange={(e) => setQuoteValidDays(Number(e.target.value))}
                      min="1"
                      className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Net 30">Net 30</option>
                    <option value="Net 60">Net 60</option>
                    <option value="Due on Receipt">Due on Receipt</option>
                    <option value="50% Upfront, 50% Net 30">50% Upfront, 50% Net 30</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">Notes (Optional)</label>
                  <textarea
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="Additional notes or terms..."
                  />
                </div>

                {/* Quote Summary */}
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Quote Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal:</span>
                      <span>${calculateQuoteTotal().subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax ({quoteTax}%):</span>
                      <span>${calculateQuoteTotal().taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-600 pt-2 mt-2">
                      <div className="flex justify-between text-xl font-semibold text-white">
                        <span>Total:</span>
                        <span>${calculateQuoteTotal().total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleCreateQuote}
                    disabled={!selectedRFQ && !selectedClusterRequest}
                    className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      !selectedRFQ && !selectedClusterRequest
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                    }`}
                  >
                    <DocumentPlusIcon className="w-5 h-5" />
                    Create Quote
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRFQ('');
                      setSelectedClusterRequest('');
                      setQuoteItems([{ description: '', quantity: 1, unitPrice: 0, total: 0 }]);
                      setQuoteTax(0);
                      setQuoteNotes('');
                      setQuoteValidDays(30);
                      setPaymentTerms('Net 30');
                    }}
                    className="px-6 py-3 rounded-lg font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;