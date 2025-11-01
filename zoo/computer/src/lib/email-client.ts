import {
  QuoteData,
  OrderData,
  SubscriptionData,
  RFQData,
  ClusterData
} from './email';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
}

/**
 * Send a quote email to a customer
 */
export const sendQuoteEmailClient = async (
  to: string,
  quoteData: QuoteData
): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-quote-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, quoteData }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error sending quote email:', error);
    return {
      success: false,
      error: 'Failed to send quote email',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Send an order confirmation email
 */
export const sendOrderConfirmationClient = async (
  to: string,
  orderData: OrderData
): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-order-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, orderData }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    return {
      success: false,
      error: 'Failed to send order confirmation',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Send a subscription confirmation email
 */
export const sendSubscriptionConfirmationClient = async (
  to: string,
  subscriptionData: SubscriptionData
): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-subscription-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subscriptionData }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error sending subscription confirmation:', error);
    return {
      success: false,
      error: 'Failed to send subscription confirmation',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Send RFQ confirmation to customer and admin notification
 */
export const sendRFQConfirmationClient = async (
  rfqData: RFQData
): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-rfq-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rfqData }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error sending RFQ confirmation:', error);
    return {
      success: false,
      error: 'Failed to send RFQ confirmation',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Send cluster request confirmation to customer and admin notification
 */
export const sendClusterNotificationClient = async (
  clusterData: ClusterData
): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-cluster-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clusterData }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error sending cluster notification:', error);
    return {
      success: false,
      error: 'Failed to send cluster notification',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Helper function to generate unique IDs
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Helper function to format dates
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Helper function to calculate quote validity date
 */
export const getQuoteValidityDate = (daysValid: number = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysValid);
  return formatDate(date);
};