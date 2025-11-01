import { supabase } from './supabase';

// Rate limit error class
export class RateLimitError extends Error {
  public retryAfter: number;
  public limit: number;
  public remaining: number;
  public reset: Date;

  constructor(message: string, headers: Headers) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = parseInt(headers.get('Retry-After') || '60');
    this.limit = parseInt(headers.get('X-RateLimit-Limit') || '0');
    this.remaining = parseInt(headers.get('X-RateLimit-Remaining') || '0');
    this.reset = new Date(parseInt(headers.get('X-RateLimit-Reset') || '0'));
  }
}

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Request options interface
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: HeadersInit;
  retries?: number;
  retryDelay?: number;
}

// Exponential backoff utility
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Calculate exponential backoff delay
const calculateBackoff = (attempt: number, baseDelay: number = 1000): number => {
  return Math.min(baseDelay * Math.pow(2, attempt) + Math.random() * 1000, 30000);
};

// Main API request function with rate limit handling
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    retries = 3,
    retryDelay = 1000,
  } = options;

  // Get current session for authentication
  const { data: { session } } = await supabase.auth.getSession();

  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (session?.access_token) {
    requestHeaders['Authorization'] = `Bearer ${session.access_token}`;
    requestHeaders['X-User-Id'] = session.user.id;
    requestHeaders['X-User-Role'] = session.user.user_metadata?.role || 'authenticated';
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      // Handle rate limiting
      if (response.status === 429) {
        const rateLimitError = new RateLimitError(
          'Rate limit exceeded',
          response.headers
        );

        // Show user-friendly message
        showRateLimitMessage(rateLimitError);

        // If we have retries left, wait and retry
        if (attempt < retries) {
          const delay = rateLimitError.retryAfter * 1000 || calculateBackoff(attempt, retryDelay);
          console.log(`Rate limited. Retrying in ${delay}ms...`);
          await wait(delay);
          continue;
        }

        throw rateLimitError;
      }

      // Handle other errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      // Parse and return successful response
      const data = await response.json();

      // Update rate limit display if headers present
      updateRateLimitDisplay(response.headers);

      return data as T;
    } catch (error) {
      lastError = error as Error;

      // Don't retry for client errors (except rate limit)
      if (error instanceof RateLimitError || (error as any).status < 500) {
        throw error;
      }

      // Retry for server errors
      if (attempt < retries) {
        const delay = calculateBackoff(attempt, retryDelay);
        console.log(`Request failed, retrying in ${delay}ms...`, error);
        await wait(delay);
        continue;
      }
    }
  }

  throw lastError || new Error('Request failed after all retries');
}

// Show rate limit message to user
function showRateLimitMessage(error: RateLimitError) {
  const message = document.createElement('div');
  message.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md';
  message.innerHTML = `
    <div class="flex items-start">
      <svg class="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      <div>
        <h3 class="font-semibold">Rate Limit Exceeded</h3>
        <p class="mt-1 text-sm">Too many requests. Please wait <span id="rate-limit-countdown">${error.retryAfter}</span> seconds before trying again.</p>
        <p class="mt-1 text-xs opacity-75">Limit: ${error.limit} | Remaining: ${error.remaining}</p>
      </div>
    </div>
  `;

  document.body.appendChild(message);

  // Countdown timer
  let remaining = error.retryAfter;
  const countdownElement = message.querySelector('#rate-limit-countdown');

  const interval = setInterval(() => {
    remaining--;
    if (countdownElement) {
      countdownElement.textContent = remaining.toString();
    }

    if (remaining <= 0) {
      clearInterval(interval);
      message.style.transition = 'opacity 0.3s';
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 300);
    }
  }, 1000);

  // Auto-remove after countdown
  setTimeout(() => {
    clearInterval(interval);
    if (message.parentNode) {
      message.remove();
    }
  }, (error.retryAfter + 1) * 1000);
}

// Update rate limit display in UI
function updateRateLimitDisplay(headers: Headers) {
  const limit = headers.get('X-RateLimit-Limit');
  const remaining = headers.get('X-RateLimit-Remaining');
  const reset = headers.get('X-RateLimit-Reset');

  if (!limit || !remaining) return;

  // Find or create rate limit indicator
  let indicator = document.getElementById('rate-limit-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'rate-limit-indicator';
    indicator.className = 'fixed bottom-4 right-4 bg-gray-800 text-white text-xs p-2 rounded-lg opacity-75 z-40';
    document.body.appendChild(indicator);
  }

  const remainingNum = parseInt(remaining);
  const limitNum = parseInt(limit);
  const percentage = (remainingNum / limitNum) * 100;

  let color = 'green';
  if (percentage < 20) color = 'red';
  else if (percentage < 50) color = 'yellow';

  indicator.innerHTML = `
    <div class="flex items-center space-x-2">
      <div class="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
        <div class="h-full bg-${color}-500" style="width: ${percentage}%"></div>
      </div>
      <span>${remaining}/${limit} requests</span>
    </div>
  `;

  // Hide after 5 seconds
  setTimeout(() => {
    if (indicator) {
      indicator.style.transition = 'opacity 0.3s';
      indicator.style.opacity = '0';
      setTimeout(() => indicator?.remove(), 300);
    }
  }, 5000);
}

// Specific API endpoints with rate limiting
export const api = {
  // Payment endpoints
  async createPaymentIntent(amount: number, currency: string = 'usd') {
    return apiRequest('/create-payment-intent', {
      method: 'POST',
      body: { amount, currency },
    });
  },

  // Email endpoints
  async sendEmail(to: string, subject: string, body: string) {
    return apiRequest('/send-email', {
      method: 'POST',
      body: { to, subject, body },
    });
  },

  // Invoice endpoints
  async generateInvoice(data: any) {
    return apiRequest('/generate-invoice', {
      method: 'POST',
      body: data,
    });
  },

  // RFQ endpoints
  async submitRFQ(data: any) {
    return apiRequest('/rfq-submission', {
      method: 'POST',
      body: data,
      retries: 0, // Don't retry RFQ submissions
    });
  },

  // Quote endpoints
  async acceptQuote(quoteId: string) {
    return apiRequest(`/quote-acceptance/${quoteId}`, {
      method: 'POST',
    });
  },

  // Rate limit status
  async getRateLimitStatus() {
    return apiRequest('/rate-limit/status');
  },
};

// Export for use in other modules
export default api;