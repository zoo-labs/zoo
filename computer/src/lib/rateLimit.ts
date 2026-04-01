import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// User role types
export type UserRole = 'anonymous' | 'authenticated' | 'admin';

// Rate limit configurations per role
const RATE_LIMITS = {
  anonymous: { requests: 10, window: '1m' },
  authenticated: { requests: 100, window: '1m' },
  admin: { requests: 1000, window: '1m' },
  // Specific endpoint limits
  'api/create-payment-intent': { requests: 5, window: '1m' },
  'api/send-email': { requests: 10, window: '1m' },
  'api/generate-invoice': { requests: 20, window: '1m' },
  'api/rfq-submission': { requests: 5, window: '1h' },
  'api/quote-acceptance': { requests: 10, window: '1m' },
};

// Create rate limiter instances
const createRateLimiter = (limit: number, window: string) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
  });
};

// Cache rate limiters
const rateLimiters = new Map<string, Ratelimit>();

// Get or create rate limiter for a specific configuration
const getRateLimiter = (key: string): Ratelimit => {
  if (!rateLimiters.has(key)) {
    const config = RATE_LIMITS[key as keyof typeof RATE_LIMITS] || RATE_LIMITS.anonymous;
    rateLimiters.set(key, createRateLimiter(config.requests, config.window));
  }
  return rateLimiters.get(key)!;
};

// Main rate limiting function
export const rateLimit = async (
  identifier: string,
  limit?: number,
  window?: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> => {
  try {
    const rateLimiter = limit && window
      ? createRateLimiter(limit, window)
      : getRateLimiter('authenticated');

    const result = await rateLimiter.limit(identifier);

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open - allow request if rate limiting fails
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
    };
  }
};

// Check rate limit for a request
export const checkRateLimit = async (req: Request): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  identifier: string;
  role: UserRole;
}> => {
  // Extract user information from request
  const authHeader = req.headers.get('authorization');
  const userId = req.headers.get('x-user-id');
  const isAdmin = req.headers.get('x-user-role') === 'admin';
  const endpoint = new URL(req.url).pathname.slice(1); // Remove leading slash

  // Determine user role
  let role: UserRole = 'anonymous';
  if (isAdmin) {
    role = 'admin';
  } else if (authHeader || userId) {
    role = 'authenticated';
  }

  // Create identifier
  const ip = req.headers.get('x-forwarded-for') ||
             req.headers.get('x-real-ip') ||
             'unknown';
  const identifier = userId || `ip:${ip}`;

  // Check if endpoint has specific rate limit
  const endpointKey = endpoint.replace(/^\//, '');
  const hasEndpointLimit = endpointKey in RATE_LIMITS;

  // Use endpoint-specific limit or role-based limit
  const rateLimitKey = hasEndpointLimit ? endpointKey : role;
  const rateLimiter = getRateLimiter(rateLimitKey);

  const result = await rateLimiter.limit(`${identifier}:${endpoint}`);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
    identifier,
    role,
  };
};

// Get rate limit status for an identifier
export const getRateLimitStatus = async (
  identifier: string,
  endpoint?: string
): Promise<{
  used: number;
  limit: number;
  remaining: number;
  reset: number;
}> => {
  try {
    const key = endpoint ? `${identifier}:${endpoint}` : identifier;

    // Get current window data from Redis
    const data = await redis.get(key);

    if (!data) {
      return {
        used: 0,
        limit: 100,
        remaining: 100,
        reset: Date.now() + 60000,
      };
    }

    const parsed = typeof data === 'string' ? JSON.parse(data) : data;

    return {
      used: parsed.count || 0,
      limit: parsed.limit || 100,
      remaining: Math.max(0, (parsed.limit || 100) - (parsed.count || 0)),
      reset: parsed.reset || Date.now() + 60000,
    };
  } catch (error) {
    console.error('Error getting rate limit status:', error);
    return {
      used: 0,
      limit: 100,
      remaining: 100,
      reset: Date.now() + 60000,
    };
  }
};

// Middleware function for Express/Next.js API routes
export const rateLimitMiddleware = (
  options?: {
    limit?: number;
    window?: string;
    keyGenerator?: (req: Request) => string;
  }
) => {
  return async (req: Request): Promise<Response | null> => {
    const result = await checkRateLimit(req);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests',
          message: `Rate limit exceeded. Please try again after ${new Date(result.reset).toISOString()}`,
          retryAfter: result.reset,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Add rate limit headers to successful response
    return null; // Continue with request
  };
};

// Helper to add rate limit headers to a response
export const addRateLimitHeaders = (
  response: Response,
  rateLimitResult: {
    limit: number;
    remaining: number;
    reset: number;
  }
): Response => {
  const headers = new Headers(response.headers);
  headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
  headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
  headers.set('X-RateLimit-Reset', rateLimitResult.reset.toString());

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

// Clear rate limit for a specific identifier (admin use)
export const clearRateLimit = async (
  identifier: string,
  endpoint?: string
): Promise<boolean> => {
  try {
    const key = endpoint ? `${identifier}:${endpoint}` : identifier;
    await redis.del(key);
    return true;
  } catch (error) {
    console.error('Error clearing rate limit:', error);
    return false;
  }
};

// Get all rate limit keys for monitoring
export const getAllRateLimitKeys = async (): Promise<string[]> => {
  try {
    // This would need to be implemented based on your Redis setup
    // For now, return empty array
    return [];
  } catch (error) {
    console.error('Error getting rate limit keys:', error);
    return [];
  }
};