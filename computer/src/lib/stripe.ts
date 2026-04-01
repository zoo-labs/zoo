import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error('Missing Stripe publishable key');
      return null;
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

// API endpoint URL (adjust based on your setup)
const API_URL = import.meta.env.VITE_API_URL || '';

// Create a payment intent
export const createPaymentIntent = async (
  amount: number,
  currency: string = 'usd',
  metadata?: Record<string, string>
) => {
  try {
    // For local development, return a mock client secret
    // In production, this will use the actual API
    if (import.meta.env.DEV && !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_live')) {
      console.log('Development mode: Using mock payment intent');
      return {
        clientSecret: 'pi_mock_secret_' + Math.random().toString(36).substring(7),
        paymentIntentId: 'pi_mock_' + Date.now(),
      };
    }

    const response = await fetch(`${API_URL}/api/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        metadata,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    // In development, return a mock response
    if (import.meta.env.DEV) {
      return {
        clientSecret: 'pi_mock_secret_' + Math.random().toString(36).substring(7),
        paymentIntentId: 'pi_mock_' + Date.now(),
      };
    }
    throw error;
  }
};

// Create a subscription
export const createSubscription = async (
  customerId: string,
  priceId: string,
  quantity: number = 1
) => {
  try {
    const response = await fetch(`${API_URL}/api/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        priceId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Get payment status
export const getPaymentStatus = async (paymentIntentId: string) => {
  try {
    const response = await fetch(`${API_URL}/api/payment-status/${paymentIntentId}`);

    if (!response.ok) {
      throw new Error('Failed to get payment status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

// Format amount for display
export const formatAmount = (amount: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100); // Convert from cents to dollars
};

// Handle Stripe errors
export const handleStripeError = (error: any): string => {
  if (error.type === 'card_error' || error.type === 'validation_error') {
    return error.message;
  } else if (error.code === 'payment_intent_authentication_failure') {
    return 'Authentication failed. Please try again.';
  } else if (error.code === 'payment_method_not_available') {
    return 'The payment method is not available. Please try a different card.';
  } else {
    return 'An unexpected error occurred. Please try again.';
  }
};