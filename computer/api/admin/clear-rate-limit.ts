import { clearRateLimit } from '../../src/lib/rateLimit';

export default async function handler(req: Request): Promise<Response> {
  // Check if request is from an admin
  const adminKey = req.headers.get('x-admin-key');

  if (adminKey !== process.env.ADMIN_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const body = await req.json();
    const { userId, endpoint } = body;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Clear the rate limit for the user
    const success = await clearRateLimit(userId, endpoint);

    if (success) {
      return new Response(
        JSON.stringify({
          success: true,
          message: `Rate limit cleared for user ${userId}${endpoint ? ` on endpoint ${endpoint}` : ''}`,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: 'Failed to clear rate limit',
          message: 'An error occurred while clearing the rate limit',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Clear rate limit error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}