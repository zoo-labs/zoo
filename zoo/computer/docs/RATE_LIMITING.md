# Rate Limiting Implementation

## Overview

This document describes the comprehensive rate limiting system implemented across API endpoints and Supabase queries for the Hanzo Computer platform.

## Architecture

The rate limiting system consists of several components:

1. **Upstash Redis** - Distributed rate limit storage
2. **Middleware** - API route protection
3. **Supabase Tables** - Audit logging and custom rules
4. **Frontend Handling** - User feedback and retry logic
5. **Admin Dashboard** - Monitoring and management

## Components

### 1. Rate Limiter Utility (`src/lib/rateLimit.ts`)

Core rate limiting logic using Upstash Redis with sliding window algorithm.

**Features:**
- Role-based limits (anonymous, authenticated, admin)
- Endpoint-specific limits
- Graceful fallback on Redis failure
- Rate limit status tracking

**Default Limits:**
- Anonymous users: 10 requests/minute
- Authenticated users: 100 requests/minute
- Admin users: 1000 requests/minute

### 2. API Middleware (`api/_middleware.ts`)

Automatic rate limiting for all API routes.

**Headers Added:**
- `X-RateLimit-Limit` - Total allowed requests
- `X-RateLimit-Remaining` - Requests remaining
- `X-RateLimit-Reset` - Reset timestamp
- `Retry-After` - Seconds until retry

### 3. Database Schema (`supabase/migrations/rate_limiting.sql`)

**Tables:**
- `rate_limit_log` - Request history
- `rate_limit_rules` - Custom per-user limits
- `rate_limit_violations` - Abuse tracking

**Features:**
- Row Level Security (RLS)
- Automatic cleanup of old logs (7 days)
- Performance indexes
- Monitoring views

### 4. Frontend API Client (`src/lib/api.ts`)

Smart API client with rate limit handling.

**Features:**
- Automatic retry with exponential backoff
- User-friendly error messages
- Visual countdown timer
- Rate limit status indicator

### 5. Admin Dashboard (`src/pages/admin/RateLimitDashboard.tsx`)

Comprehensive monitoring interface.

**Sections:**
- Overview - Endpoint statistics
- Users - User activity tracking
- Violations - Rate limit violations
- Rules - Custom limit management

## Protected Endpoints

### Strict Limits
- `/api/create-payment-intent` - 5 requests/minute
- `/api/rfq-submission` - 5 requests/hour

### Moderate Limits
- `/api/send-email` - 10 requests/minute
- `/api/quote-acceptance` - 10 requests/minute

### Standard Limits
- `/api/generate-invoice` - 20 requests/minute
- All admin endpoints - 100 requests/minute

## Setup Instructions

### 1. Environment Variables

Add to your `.env` file:

```env
# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token-here

# Rate Limiting Configuration
RATE_LIMIT_ENABLED=true
VITE_API_URL=/api

# Admin Configuration
ADMIN_API_KEY=your-admin-api-key-here
```

### 2. Database Migration

Run the Supabase migration:

```bash
supabase db push
```

Or manually execute `supabase/migrations/rate_limiting.sql` in your Supabase dashboard.

### 3. Upstash Redis Setup

1. Create an account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and token to your `.env` file

### 4. Deploy API Routes

For Vercel deployment:
```bash
vercel --prod
```

For other platforms, ensure the `/api` directory is properly configured for serverless functions.

## Usage Examples

### Frontend API Call

```typescript
import { api } from '@/lib/api';

// Automatic rate limit handling
try {
  const result = await api.createPaymentIntent(5000, 'usd');
  console.log('Payment intent created:', result);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry in ${error.retryAfter} seconds`);
  }
}
```

### Custom Rate Limit Check

```typescript
import { getRateLimitStatus } from '@/lib/rateLimit';

const status = await getRateLimitStatus('user_123', 'api/send-email');
console.log(`Remaining requests: ${status.remaining}`);
```

### Clear Rate Limit (Admin)

```typescript
// Admin endpoint to clear rate limits
fetch('/api/admin/clear-rate-limit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Admin-Key': 'your-admin-key'
  },
  body: JSON.stringify({
    userId: 'user_123',
    endpoint: 'api/send-email' // optional
  })
});
```

## Monitoring

### Admin Dashboard Access

Navigate to `/admin/rate-limits` to access the monitoring dashboard.

**Features:**
- Real-time request statistics
- User activity tracking
- Violation logs
- Custom rule management

### Database Queries

```sql
-- View recent rate limit violations
SELECT * FROM rate_limit_violations
WHERE timestamp > NOW() - INTERVAL '24 hours'
ORDER BY timestamp DESC;

-- Check user request patterns
SELECT * FROM rate_limit_user_stats
WHERE email = 'user@example.com';

-- View endpoint statistics
SELECT * FROM rate_limit_stats
ORDER BY total_requests DESC;
```

## Error Handling

### Rate Limit Exceeded Response

```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again in 45 seconds.",
  "limit": 10,
  "remaining": 0,
  "reset": "2024-01-01T12:00:00Z",
  "retryAfter": 45
}
```

### Frontend Display

When rate limited, users see:
1. Toast notification with countdown timer
2. Automatic retry after cooldown
3. Visual indicator of rate limit status

## Best Practices

### For Developers

1. **Use the API client** - Always use `src/lib/api.ts` for API calls
2. **Handle errors gracefully** - Check for `RateLimitError` specifically
3. **Implement caching** - Reduce unnecessary API calls
4. **Batch operations** - Combine multiple operations when possible

### For Administrators

1. **Monitor regularly** - Check the dashboard for unusual patterns
2. **Set appropriate limits** - Balance security with usability
3. **Review violations** - Investigate repeated violations
4. **Update rules** - Adjust limits based on usage patterns

## Troubleshooting

### Common Issues

**Issue: Rate limits not working**
- Check `RATE_LIMIT_ENABLED=true` in environment
- Verify Upstash Redis credentials
- Ensure middleware is properly configured

**Issue: Users frequently hitting limits**
- Review current limits in dashboard
- Consider increasing limits for specific users
- Implement caching on frontend

**Issue: Redis connection failures**
- Verify Upstash credentials
- Check network connectivity
- System fails open (allows requests) by default

## Security Considerations

1. **IP-based limiting** - Fallback for anonymous users
2. **User-based limiting** - Primary for authenticated users
3. **Endpoint-specific limits** - Sensitive operations have stricter limits
4. **Admin override** - Administrators can clear limits when needed

## Performance Impact

- **Latency**: ~20-50ms added per request
- **Redis calls**: 1 per request
- **Database logging**: Asynchronous, minimal impact
- **Frontend retry**: Exponential backoff prevents thundering herd

## Future Enhancements

- [ ] Geographic-based rate limiting
- [ ] Machine learning for anomaly detection
- [ ] Dynamic limit adjustment based on load
- [ ] WebSocket rate limiting
- [ ] GraphQL query complexity limiting

## Support

For issues or questions:
1. Check the admin dashboard for current status
2. Review logs in Supabase
3. Contact system administrator with details

---

Last updated: October 2024