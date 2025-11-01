import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, getUserRFQs, getUserQuotes, getUserOrders, getUserSubscriptions } from '../lib/supabase';
import type { RFQ, Quote, Order, Subscription, User } from '../lib/supabase';
import DashboardInvoices from '../components/DashboardInvoices';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices'>('overview');

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadDashboardData(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadDashboardData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadDashboardData = async (userId: string) => {
    setLoading(true);
    try {
      // Fetch user details first
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (!userError && userData) {
        setUserDetails(userData);
      }

      const [rfqsData, quotesData, ordersData, subscriptionsData] = await Promise.all([
        getUserRFQs(userId),
        getUserQuotes(userId),
        getUserOrders(userId),
        getUserSubscriptions(userId),
      ]);

      setRfqs(rfqsData || []);
      setQuotes(quotesData || []);
      setOrders(ordersData || []);
      setSubscriptions(subscriptionsData || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleAcceptQuote = async (quoteId: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ status: 'accepted' })
        .eq('id', quoteId);

      if (error) throw error;

      // Create an order from the accepted quote
      const quote = quotes.find(q => q.id === quoteId);
      if (quote) {
        const orderNumber = `ORD-${Date.now()}`;
        const { error: orderError } = await supabase
          .from('orders')
          .insert({
            quote_id: quoteId,
            order_number: orderNumber,
            total: quote.total,
            status: 'pending'
          });

        if (orderError) throw orderError;
      }

      // Reload dashboard data
      if (user) {
        await loadDashboardData(user.id);
      }
    } catch (error) {
      console.error('Error accepting quote:', error);
      alert('Failed to accept quote. Please try again.');
    }
  };

  const handleRejectQuote = async (quoteId: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ status: 'rejected' })
        .eq('id', quoteId);

      if (error) throw error;

      // Reload dashboard data
      if (user) {
        await loadDashboardData(user.id);
      }
    } catch (error) {
      console.error('Error rejecting quote:', error);
      alert('Failed to reject quote. Please try again.');
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString()
        })
        .eq('id', subscriptionId);

      if (error) throw error;

      // Reload dashboard data
      if (user) {
        await loadDashboardData(user.id);
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg py-24">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Customer Dashboard</h1>
          <p className="text-gray-400 mb-8">Please sign in to view your dashboard</p>
          <div className="space-y-4">
            <Link
              to="/signin"
              className="inline-block px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all"
            >
              Sign In
            </Link>
            <p className="text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      reviewing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      quoted: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      sent: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
      paid: 'bg-green-500/20 text-green-400 border-green-500/30',
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
      cancelled: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-dark-bg py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 border border-dark-border text-white rounded-lg hover:bg-white/10 transition-all"
            >
              Sign Out
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">{rfqs.length}</div>
              <div className="text-gray-400">RFQ Submissions</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6">
              <div className="text-3xl font-bold text-secondary mb-2">{quotes.length}</div>
              <div className="text-gray-400">Quotes Received</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">{orders.length}</div>
              <div className="text-gray-400">Active Orders</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">{subscriptions.filter(s => s.status === 'active').length}</div>
              <div className="text-gray-400">Subscriptions</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4 mt-6">
            <Link
              to="/analytics"
              className="px-6 py-3 bg-purple-600/20 border border-purple-500/30 text-purple-400 font-semibold rounded-lg hover:bg-purple-600/30 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Usage Analytics
            </Link>
            <Link
              to="/request-quote"
              className="px-6 py-3 bg-primary/20 border border-primary/30 text-primary font-semibold rounded-lg hover:bg-primary/30 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New GPU Request
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-dark-border">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`pb-4 px-2 font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'invoices'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Invoices
            </button>
          </div>
        </div>

        {/* Conditional Content Based on Tab */}
        {activeTab === 'invoices' ? (
          userDetails ? (
            <DashboardInvoices
              orders={orders}
              subscriptions={subscriptions}
              user={userDetails}
            />
          ) : (
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 text-center">
              <p className="text-gray-400">Loading invoice data...</p>
            </div>
          )
        ) : (
          <>
            {/* Original dashboard content starts here */}

        {/* RFQs Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Request for Quotes</h2>
            <Link
              to="/request-quote"
              className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all"
            >
              + New RFQ
            </Link>
          </div>

          {rfqs.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 text-center">
              <p className="text-gray-400">No RFQs submitted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rfqs.map((rfq) => (
                <div
                  key={rfq.id}
                  className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{rfq.gpu_type.toUpperCase()} × {rfq.quantity}</h3>
                      <p className="text-gray-400">{rfq.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(rfq.status)}`}>
                      {rfq.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-2">{rfq.use_case}</p>
                  <div className="text-sm text-gray-500">
                    Submitted: {new Date(rfq.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quotes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quotes</h2>

          {quotes.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 text-center">
              <p className="text-gray-400">No quotes received yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 hover:border-secondary/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{quote.quote_number}</h3>
                      <p className="text-gray-400">${quote.total.toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </div>
                  {quote.notes && <p className="text-gray-300 mb-4">{quote.notes}</p>}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Created: {new Date(quote.created_at).toLocaleDateString()}
                    </div>
                    {quote.status === 'sent' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptQuote(quote.id)}
                          className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectQuote(quote.id)}
                          className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Orders Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Orders</h2>

          {orders.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 text-center">
              <p className="text-gray-400">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 hover:border-green-500/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{order.order_number}</h3>
                      <p className="text-gray-400">${order.total.toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Ordered: {new Date(order.created_at).toLocaleDateString()}
                    {order.paid_at && ` • Paid: ${new Date(order.paid_at).toLocaleDateString()}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Subscriptions Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">GPU Subscriptions</h2>

          {subscriptions.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 text-center">
              <p className="text-gray-400">No active subscriptions</p>
              <Link
                to="/request-quote"
                className="inline-block mt-4 text-primary hover:underline"
              >
                Request a quote for GPU leasing
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {subscription.gpu_type} × {subscription.quantity}
                      </h3>
                      <p className="text-gray-400">
                        {subscription.current_period_start && subscription.current_period_end && (
                          <>
                            {new Date(subscription.current_period_start).toLocaleDateString()} -{' '}
                            {new Date(subscription.current_period_end).toLocaleDateString()}
                          </>
                        )}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </div>
                  {subscription.status === 'active' && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCancelSubscription(subscription.id)}
                        className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                      >
                        Cancel Subscription
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
