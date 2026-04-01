import { checkRateLimit, addRateLimitHeaders } from '../src/lib/rateLimit';

export const config = {
  matcher: '/api/:path*',
};

export default async function middleware(req: Request): Promise<Response> {
  // Skip rate limiting if disabled
  if (process.env.RATE_LIMIT_ENABLED !== 'true') {
    return new Response(null, { status: 200 });
  }

  try {
    // Check rate limit
    const rateLimitResult = await checkRateLimit(req);

    // If rate limit exceeded, return 429
    if (!rateLimitResult.success) {
      return new Response(
        JSON.stringify({
          error: 'Too Many Requests',
          message: `Rate limit exceeded. Please try again in ${Math.ceil((rateLimitResult.reset - Date.now()) / 1000)} seconds.`,
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          reset: new Date(rateLimitResult.reset).toISOString(),
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'X-RateLimit-Reset-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Log rate limit usage for monitoring
    if (rateLimitResult.remaining < 10) {
      console.warn(`Rate limit warning: ${rateLimitResult.identifier} has ${rateLimitResult.remaining} requests remaining`);
    }

    // Continue with the request and add rate limit headers to the response
    return new Response(null, {
      status: 200,
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString(),
      },
    });
  } catch (error) {
    console.error('Middleware error:', error);
    // Fail open - allow request if middleware fails
    return new Response(null, { status: 200 });
  }
}