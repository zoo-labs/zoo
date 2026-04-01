import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, getStripePurchasableItems, getSalesItems } = useCart();

  const stripePurchasableItems = getStripePurchasableItems();
  const salesItems = getSalesItems();
  const stripeTotalPrice = stripePurchasableItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-bg py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>
          <div className="bg-dark-card border border-dark-border rounded-xl p-12 text-center">
            <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Add some powerful compute to get started!</p>
            <Link
              to="/#pricing"
              className="inline-block bg-primary text-black font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-all duration-300"
            >
              Browse Hardware
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {stripePurchasableItems.length > 0 && (
              <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Ready to Purchase</h2>
                    <p className="text-sm text-gray-400">Pay securely with credit card via Stripe</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {stripePurchasableItems.map((item) => (
                    <div key={item.id} className="flex gap-6 p-4 bg-dark-bg rounded-lg border border-dark-border">
                      {item.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-32 h-32 object-cover rounded-lg border border-dark-border"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-white hover:text-primary transition-colors"
                            >
                              −
                            </button>
                            <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.id === 'dgx-spark' && item.quantity >= 5}
                              className="px-3 py-1 text-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>
                          {item.id === 'dgx-spark' && item.quantity >= 5 && (
                            <span className="text-xs text-amber-400">Max 5 per order</span>
                          )}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-400 hover:text-red-300 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">${item.price.toLocaleString()} each</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {salesItems.length > 0 && (
              <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/20 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Requires Sales Consultation</h2>
                    <p className="text-sm text-gray-400">Enterprise solutions need custom configuration</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {salesItems.map((item) => (
                    <div key={item.id} className="flex gap-6 p-4 bg-dark-bg rounded-lg border border-dark-border">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-secondary">Custom Quote</div>
                        <div className="text-sm text-gray-400">Contact sales</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                  <p className="text-sm text-gray-300 mb-4">
                    <strong className="text-white">Need enterprise compute?</strong> Our team will help you design the perfect solution.
                  </p>
                  <a
                    href="https://hanzo.ai/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary/80 transition-all duration-300"
                  >
                    Schedule Sales Call
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              {stripePurchasableItems.length > 0 && (
                <>
                  <div className="space-y-3 mb-4">
                    {stripePurchasableItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-white font-semibold">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dark-border pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-primary">${stripeTotalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="block w-full text-center bg-primary text-black font-bold py-4 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300 mb-4"
                  >
                    Proceed to Checkout
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure payment via Stripe</span>
                  </div>
                </>
              )}

              {salesItems.length > 0 && stripePurchasableItems.length === 0 && (
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Enterprise items require sales consultation</p>
                  <a
                    href="https://hanzo.ai/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-secondary text-white font-bold py-4 px-6 rounded-lg hover:bg-secondary/80 transition-all duration-300"
                  >
                    Contact Sales
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
