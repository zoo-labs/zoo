import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface OrderDetails {
  id: string;
  payment_intent_id: string;
  amount: number;
  currency: string;
  status: string;
  items: any[];
  customer_info: any;
  created_at: string;
}

const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!paymentIntentId) {
        // Try to get the latest order from localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        if (orders.length > 0) {
          setOrder(orders[orders.length - 1]);
        }
        setLoading(false);
        return;
      }

      try {
        // First try to fetch from Supabase
        const { data: orderData, error } = await supabase
          .from('orders')
          .select('*')
          .eq('payment_intent_id', paymentIntentId)
          .single();

        if (!error && orderData) {
          setOrder(orderData);
        } else {
          // Fallback to localStorage
          const orders = JSON.parse(localStorage.getItem('orders') || '[]');
          const localOrder = orders.find((o: any) => o.payment_intent_id === paymentIntentId);
          if (localOrder) {
            setOrder(localOrder);
          }
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        // Fallback to localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const localOrder = orders.find((o: any) => o.payment_intent_id === paymentIntentId);
        if (localOrder) {
          setOrder(localOrder);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [paymentIntentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-3">Payment Successful!</h1>
            <p className="text-xl text-gray-400">Thank you for your purchase</p>
          </div>

          {/* Order Details Card */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>

            {order && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Order ID</p>
                    <p className="text-white font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Date</p>
                    <p className="text-white font-semibold">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Payment Method</p>
                    <p className="text-white font-semibold">Credit Card</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                    <p className="text-white font-semibold text-2xl text-primary">
                      ${order.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Items Purchased */}
                {order.items && order.items.length > 0 && (
                  <div className="border-t border-dark-border pt-6">
                    <h3 className="text-lg font-bold text-white mb-4">Items Purchased</h3>
                    <div className="space-y-3">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-400">
                              Quantity: {item.quantity}
                              {item.subscriptionType === 'monthly' && ' • Monthly subscription'}
                            </p>
                          </div>
                          <p className="text-white font-semibold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customer Information */}
                {order.customer_info && (
                  <div className="border-t border-dark-border pt-6 mt-6">
                    <h3 className="text-lg font-bold text-white mb-4">Billing Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <p className="text-white">{order.customer_info.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Name</p>
                        <p className="text-white">{order.customer_info.name}</p>
                      </div>
                      {order.customer_info.address && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-400 mb-1">Address</p>
                          <p className="text-white">
                            {order.customer_info.address}
                            {order.customer_info.city && `, ${order.customer_info.city}`}
                            {order.customer_info.state && `, ${order.customer_info.state}`}
                            {order.customer_info.zip && ` ${order.customer_info.zip}`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-3">What's Next?</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>You'll receive an email confirmation shortly with your order details</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Our team will begin provisioning your DGX Spark instance within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>You can track your order status in your account dashboard</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="flex-1 bg-primary text-black font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300 text-center"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/account"
              className="flex-1 bg-dark-card border border-dark-border text-white font-bold py-3 px-6 rounded-lg hover:bg-dark-border transition-all duration-300 text-center"
            >
              View Order History
            </Link>
            <Link
              to="/"
              className="flex-1 bg-dark-card border border-dark-border text-white font-bold py-3 px-6 rounded-lg hover:bg-dark-border transition-all duration-300 text-center"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support Information */}
          <div className="mt-8 p-6 bg-dark-card border border-dark-border rounded-xl text-center">
            <p className="text-gray-400 mb-2">Need help with your order?</p>
            <p className="text-white">
              Contact our support team at{' '}
              <a href="mailto:support@hanzo.ai" className="text-primary hover:underline">
                support@hanzo.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;