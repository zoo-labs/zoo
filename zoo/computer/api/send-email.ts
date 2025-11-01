import { checkRateLimit, addRateLimitHeaders } from '../src/lib/rateLimit';

export default async function handler(req: Request): Promise<Response> {
  // Apply specific rate limiting for email sending
  const rateLimitResult = await checkRateLimit(req);

  if (!rateLimitResult.success) {
    return new Response(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Email sending rate limit exceeded. Please wait before trying again.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    );
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return addRateLimitHeaders(
      new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }),
      rateLimitResult
    );
  }

  try {
    const body = await req.json();
    const { to, subject, body: emailBody } = body;

    // Validate input
    if (!to || !subject || !emailBody) {
      return addRateLimitHeaders(
        new Response(
          JSON.stringify({ error: 'Missing required fields: to, subject, body' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        ),
        rateLimitResult
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return addRateLimitHeaders(
        new Response(
          JSON.stringify({ error: 'Invalid email address' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        ),
        rateLimitResult
      );
    }

    // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we'll simulate sending an email
    console.log(`Sending email to ${to} with subject: ${subject}`);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return addRateLimitHeaders(
      new Response(
        JSON.stringify({
          success: true,
          message: 'Email sent successfully',
          messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          to,
          subject,
          sentAt: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
      rateLimitResult
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return addRateLimitHeaders(
      new Response(
        JSON.stringify({
          error: 'Failed to send email',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
      rateLimitResult
    );
  }
}