# Email Notifications System

## Overview

Comprehensive email notification system for Hanzo Computer platform, providing automated email communications for quotes, orders, subscriptions, and RFQs.

## Features

- ✅ **Quote Emails** - Send custom GPU quotes to customers
- ✅ **Order Confirmations** - Automated order confirmation with invoice details
- ✅ **Subscription Confirmations** - Subscription activation notifications
- ✅ **RFQ Confirmations** - Request for quote acknowledgment emails
- ✅ **Cluster Request Notifications** - Enterprise cluster request confirmations
- ✅ **Admin Notifications** - Instant alerts for new RFQs and cluster requests
- ✅ **Professional HTML Templates** - Mobile-responsive, branded email designs
- ✅ **Plain Text Fallback** - Ensures deliverability across all email clients

## Technology Stack

- **Email Service**: SendGrid
- **Templates**: Custom HTML/CSS with inline styles
- **API**: TypeScript/JavaScript serverless functions
- **Frontend Integration**: React hooks and client library

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env` file:

```env
# SendGrid Configuration
VITE_SENDGRID_API_KEY=SG.your-actual-api-key-here
VITE_EMAIL_FROM=noreply@hanzo.computer
VITE_ADMIN_EMAIL=admin@hanzo.computer

# API Configuration
VITE_API_URL=/api
```

### 2. SendGrid Setup

1. Sign up for [SendGrid](https://sendgrid.com)
2. Create an API key with "Mail Send" permissions
3. Verify your sender domain (hanzo.computer)
4. Add the API key to your environment variables

### 3. Testing

Run the test script to verify email functionality:

```bash
# Set test email
export TEST_EMAIL=your-email@example.com

# Run test
node test-email.mjs
```

## API Endpoints

### `/api/send-quote-email`

Send a quote email to a customer.

**Request:**
```json
{
  "to": "customer@example.com",
  "quoteData": {
    "quoteNumber": "Q-2024-001",
    "customerName": "John Doe",
    "customerEmail": "customer@example.com",
    "gpuModel": "NVIDIA H100",
    "quantity": 8,
    "duration": "Monthly",
    "pricePerHour": 2.50,
    "totalPrice": 3600.00,
    "validUntil": "2024-12-31",
    "message": "Special pricing applied"
  }
}
```

### `/api/send-order-confirmation`

Send order confirmation after payment.

**Request:**
```json
{
  "to": "customer@example.com",
  "orderData": {
    "orderNumber": "ORD-2024-001",
    "customerName": "John Doe",
    "customerEmail": "customer@example.com",
    "items": [
      {
        "name": "8x NVIDIA H100 GPU - Monthly",
        "quantity": 1,
        "price": 3600.00
      }
    ],
    "subtotal": 3600.00,
    "tax": 288.00,
    "total": 3888.00,
    "billingAddress": "123 AI Street, San Francisco, CA 94102"
  }
}
```

### `/api/send-rfq-confirmation`

Send RFQ confirmation to customer and admin notification.

**Request:**
```json
{
  "rfqData": {
    "rfqNumber": "RFQ-2024-001",
    "customerName": "John Doe",
    "customerEmail": "customer@example.com",
    "company": "AI Startup Inc",
    "gpuModel": "h100",
    "quantity": 16,
    "duration": "6-month lease",
    "useCase": "LLM training",
    "message": "Need high bandwidth interconnect",
    "submittedAt": "November 1, 2024 at 10:30 AM"
  }
}
```

### `/api/send-subscription-confirmation`

Send subscription activation confirmation.

**Request:**
```json
{
  "to": "customer@example.com",
  "subscriptionData": {
    "subscriptionId": "sub_1234567890",
    "customerName": "John Doe",
    "customerEmail": "customer@example.com",
    "planName": "GPU Pro Monthly",
    "gpuModel": "NVIDIA H100",
    "quantity": 4,
    "pricePerMonth": 7200.00,
    "startDate": "November 1, 2024",
    "billingCycle": "Monthly"
  }
}
```

### `/api/send-cluster-notification`

Send enterprise cluster request confirmation.

**Request:**
```json
{
  "clusterData": {
    "requestId": "CLU-2024-001",
    "customerName": "John Doe",
    "customerEmail": "enterprise@example.com",
    "company": "Enterprise Corp",
    "clusterSize": "256 GPUs",
    "gpuModel": "NVIDIA B200",
    "requirements": "Need dedicated infrastructure with 99.99% SLA",
    "budget": "$500,000 - $1,000,000",
    "timeline": "Q1 2025",
    "submittedAt": "November 1, 2024 at 10:30 AM"
  }
}
```

## Client Library Usage

### Sending Emails from React Components

```typescript
import {
  sendQuoteEmailClient,
  sendOrderConfirmationClient,
  sendRFQConfirmationClient,
  generateId,
  formatDate
} from '../lib/email-client';

// Send quote email
const quoteData = {
  quoteNumber: generateId(),
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  gpuModel: 'NVIDIA H100',
  quantity: 8,
  duration: 'Monthly',
  pricePerHour: 2.50,
  totalPrice: 3600.00,
  validUntil: getQuoteValidityDate(30),
  message: 'Special pricing for your AI workload'
};

const result = await sendQuoteEmailClient('john@example.com', quoteData);
if (result.success) {
  console.log('Quote email sent successfully');
} else {
  console.error('Failed to send email:', result.error);
}
```

## Email Templates

All email templates include:

### Header
- Hanzo Computer logo and branding
- Orange gradient background (#FF6B35 to #F7931E)
- Professional typography

### Content
- Personalized greeting
- Clear information hierarchy
- Formatted tables for data
- Call-to-action buttons
- Important notices and alerts

### Footer
- Company information
- Social media links
- Copyright notice
- Unsubscribe link (when applicable)

## Template Types

### 1. Quote Email
- Quote number and validity date
- GPU specifications and pricing
- Total cost breakdown
- Custom messages from sales team
- Link to dashboard for acceptance

### 2. Order Confirmation
- Order number and status
- Itemized invoice
- Billing information
- Next steps for GPU access
- Support contact information

### 3. Subscription Confirmation
- Subscription ID and plan details
- Monthly pricing and billing cycle
- Getting started guide
- Access credentials information
- Dashboard link

### 4. RFQ Confirmation
- RFQ tracking number
- Submitted requirements summary
- Expected response timeline
- What happens next
- Contact information

### 5. Cluster Request Confirmation
- Request ID and priority
- Cluster specifications
- Enterprise benefits
- Solutions architect contact timeline
- Direct support channels

### 6. Admin Notifications
- High-priority alerts
- Complete customer information
- Requirements summary
- Budget and timeline details
- Direct action links to admin dashboard

## Integration Points

### Components Using Email

1. **AdminDashboard** (`/src/pages/AdminDashboard.tsx`)
   - Send quote emails when creating quotes
   - Resend quote emails from quote management

2. **Checkout** (`/src/pages/Checkout.tsx`)
   - Send order confirmation after successful payment
   - Send subscription confirmation for recurring plans

3. **RequestQuote** (`/src/pages/RequestQuote.tsx`)
   - Send RFQ confirmation to customer
   - Send admin notification for new RFQs

4. **Clusters** (`/src/pages/Clusters.tsx`)
   - Send cluster request confirmation
   - Send high-priority admin notification

5. **Dashboard** (`/src/pages/Dashboard.tsx`)
   - Resend quote emails
   - View email history

## Error Handling

- All email sends are non-blocking (fire-and-forget)
- Errors are logged to console but don't break user flow
- Fallback to database storage if email fails
- Admin notifications on critical email failures

## Security Considerations

1. **API Key Protection**
   - Store SendGrid API key in environment variables
   - Never commit API keys to version control
   - Use server-side functions for sending

2. **Rate Limiting**
   - Implement rate limiting on API endpoints
   - Prevent email bombing attacks
   - Monitor for unusual activity

3. **Input Validation**
   - Validate all email addresses
   - Sanitize HTML content
   - Verify required fields

4. **GDPR Compliance**
   - Include unsubscribe links where applicable
   - Store email consent in database
   - Provide data deletion options

## Monitoring

### Metrics to Track
- Email delivery rate
- Open rate
- Click-through rate
- Bounce rate
- Complaint rate

### SendGrid Dashboard
Monitor email performance at: https://app.sendgrid.com

### Error Logging
Check browser console and server logs for email errors

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Verify SendGrid API key is set correctly
   - Check SendGrid account is active
   - Ensure sender domain is verified

2. **Emails going to spam**
   - Verify SPF/DKIM records
   - Check sender reputation
   - Review email content for spam triggers

3. **Template rendering issues**
   - Test in multiple email clients
   - Use inline CSS only
   - Provide plain text fallback

4. **Rate limiting errors**
   - Implement exponential backoff
   - Queue emails for batch sending
   - Upgrade SendGrid plan if needed

## Future Enhancements

- [ ] Email analytics dashboard
- [ ] A/B testing for templates
- [ ] Scheduled email campaigns
- [ ] Transactional email logs in admin
- [ ] SMS notifications integration
- [ ] WhatsApp Business API
- [ ] Multi-language support
- [ ] Dynamic template variables
- [ ] Email preference center
- [ ] Automated follow-ups

## Support

For issues or questions:
- Email: support@hanzo.computer
- Documentation: https://hanzo.computer/docs
- GitHub Issues: https://github.com/hanzoai/computer

---

**Last Updated**: November 2024
**Version**: 1.0.0