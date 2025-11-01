# Stripe Webhooks Setup Guide

## Overview

This guide explains how to set up and configure Stripe webhooks for the Hanzo Computer platform. The webhooks handle payment events, subscriptions, invoices, and refunds.

## Webhook Events Handled

The following Stripe webhook events are supported:

### Payment Events
- `payment_intent.succeeded` - Payment completed successfully
- `payment_intent.payment_failed` - Payment attempt failed
- `checkout.session.completed` - Checkout session completed

### Subscription Events
- `customer.subscription.created` - New subscription created
- `customer.subscription.updated` - Subscription modified
- `customer.subscription.deleted` - Subscription cancelled

### Invoice Events
- `invoice.paid` - Invoice payment successful
- `invoice.payment_failed` - Invoice payment failed

### Refund Events
- `charge.refunded` - Payment refunded

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```env
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
```

### 2. Database Setup

Run the migration to create required tables:

```bash
# Apply the webhook tables migration
npx supabase db push
```

This creates the following tables:
- `webhook_events` - Tracks processed events for idempotency
- `orders` - Stores order information
- `subscriptions` - Manages subscription data
- `invoices` - Invoice records
- `refunds` - Refund tracking
- `payment_failures` - Failed payment logs
- `subscription_changes` - Subscription modification history
- `gpu_access` - GPU subscription access control

### 3. Stripe Dashboard Configuration

1. Go to [Stripe Dashboard Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your endpoint URL:
   - Development: `https://your-ngrok-url.ngrok.io/api/webhooks/stripe`
   - Production: `https://hanzo.computer/api/webhooks/stripe`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `charge.refunded`
5. Copy the signing secret (starts with `whsec_`)
6. Add it to your environment variables

### 4. Local Development with Stripe CLI

For local development, use the Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# The CLI will show your webhook signing secret
# Copy it and add to .env.local as STRIPE_WEBHOOK_SECRET
```

### 5. Testing Webhooks

#### Using Stripe CLI

Trigger test events:

```bash
# Test payment success
stripe trigger payment_intent.succeeded

# Test subscription creation
stripe trigger customer.subscription.created

# Test invoice payment
stripe trigger invoice.paid

# Test refund
stripe trigger charge.refunded
```

#### Manual Testing

Create test payments in your application and monitor:
1. Webhook logs in Stripe Dashboard
2. Database tables for created records
3. Server logs for processing details

## Webhook Processing Flow

1. **Receive Event**: Stripe sends POST request to `/api/webhooks/stripe`
2. **Verify Signature**: Validate webhook signature using signing secret
3. **Check Idempotency**: Verify event hasn't been processed
4. **Process Event**: Execute appropriate handler based on event type
5. **Update Database**: Create/update relevant records
6. **Mark Processed**: Record event as processed
7. **Return Response**: Send 200 OK to Stripe

## Error Handling

- **400 Bad Request**: Invalid signature or malformed request
- **405 Method Not Allowed**: Non-POST requests
- **500 Internal Server Error**: Processing error (Stripe will retry)

### Stripe Retry Logic

Stripe retries failed webhooks with exponential backoff:
- After 1 hour
- After 2 hours
- After 4 hours
- After 8 hours
- Then every 8 hours for up to 3 days

## Security Best Practices

1. **Always verify webhook signatures** - Never process unsigned webhooks
2. **Use HTTPS in production** - Webhooks contain sensitive data
3. **Implement idempotency** - Prevent duplicate processing
4. **Log all events** - Maintain audit trail
5. **Use environment variables** - Never hardcode secrets
6. **Restrict webhook endpoint** - No authentication required, but verify signatures

## Database Schema

### webhook_events
```sql
- id: UUID
- event_id: Text (Stripe event ID)
- event_type: Text
- processed: Boolean
- data: JSONB
- created_at: Timestamp
```

### orders
```sql
- id: UUID
- payment_intent_id: Text
- customer_email: Text
- amount: Decimal
- status: Text
- metadata: JSONB
- paid_at: Timestamp
```

### subscriptions
```sql
- id: UUID
- subscription_id: Text
- customer_id: Text
- status: Text
- items: JSONB
- current_period_start/end: Timestamp
```

## Monitoring

### Key Metrics to Track

- Webhook success rate
- Processing time per event type
- Failed webhook count
- Duplicate event attempts

### Logging

All webhook events are logged with:
- Event type and ID
- Processing result
- Error messages (if any)
- Processing duration

## Troubleshooting

### Common Issues

1. **Signature Verification Fails**
   - Check webhook secret is correct
   - Ensure raw request body is used
   - Verify Content-Type header

2. **Events Not Received**
   - Check webhook URL is accessible
   - Verify event types are selected in Stripe
   - Check firewall/security rules

3. **Duplicate Processing**
   - Ensure idempotency check is working
   - Check webhook_events table for duplicates

4. **Database Errors**
   - Verify Supabase connection
   - Check RLS policies
   - Ensure migrations are applied

## Admin Dashboard Integration

The webhook events can be viewed in the admin dashboard:

1. Navigate to `/admin/webhooks`
2. View event log with filtering options
3. Retry failed webhooks
4. Export webhook data

## Additional Resources

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
- [Stripe API Reference](https://stripe.com/docs/api)