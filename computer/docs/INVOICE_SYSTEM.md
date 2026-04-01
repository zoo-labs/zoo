# Invoice System Documentation

## Overview

The Hanzo Computer marketplace now includes a comprehensive PDF invoice generation system that allows customers to download professional invoices for their orders and subscriptions.

## Features

### Customer Features
- **Download PDF Invoices**: Generate and download professional PDF invoices for all paid orders
- **Invoice History**: View all past invoices in a dedicated tab on the dashboard
- **Invoice Preview**: Preview invoices before downloading
- **Automatic Generation**: Invoices are automatically generated when orders are paid
- **Professional Layout**: Clean, branded invoice design with Hanzo Computer branding

### Admin Features
- **Bulk Generation**: Generate invoices for multiple orders at once
- **Email Invoices**: Send invoices directly to customers via email
- **Regenerate Invoices**: Update and regenerate existing invoices
- **Invoice Management**: Mark invoices as paid, void invoices, add notes
- **Missing Invoice Detection**: Identify paid orders without invoices

## Technical Implementation

### Components

#### 1. Invoice Generator (`/src/lib/invoices.ts`)
Core invoice functionality including:
- Invoice data structure definition
- Invoice creation from orders and subscriptions
- PDF storage in Supabase
- Invoice number generation
- Currency and date formatting

#### 2. Invoice Component (`/src/components/Invoice.tsx`)
React PDF component using `@react-pdf/renderer`:
- Professional invoice template
- Hanzo Computer branding
- Line items with GPU specifications
- Tax calculations
- Payment terms and conditions

#### 3. Dashboard Integration (`/src/components/DashboardInvoices.tsx`)
Customer-facing invoice interface:
- Invoice download buttons
- Preview functionality
- Invoice history display
- Real-time generation

#### 4. Admin Actions (`/src/lib/adminInvoiceActions.ts`)
Administrative invoice operations:
- Bulk invoice generation
- Email sending integration
- Invoice status management
- Regeneration capabilities

### Database Schema

#### Invoices Table
```sql
- id: UUID (Primary Key)
- invoice_number: VARCHAR (Unique)
- user_id: UUID (Foreign Key)
- order_id: UUID (Foreign Key)
- subscription_id: UUID (Foreign Key)
- stripe_invoice_id: VARCHAR
- amount_due: DECIMAL
- amount_paid: DECIMAL
- status: VARCHAR ('draft', 'open', 'paid', 'void', 'uncollectible')
- due_date: DATE
- paid_at: TIMESTAMP
- pdf_url: TEXT
- generated_at: TIMESTAMP
- line_items: JSONB
- customer_info: JSONB
- subtotal: DECIMAL
- tax: DECIMAL
```

### Storage Configuration

#### Supabase Storage Buckets
- **invoices**: Public bucket for PDF storage
  - Organized by year: `/invoices/2025/INV-20250131-0001.pdf`
  - Automatic public URL generation
  - Signed URLs for private access

## Usage

### For Customers

1. **View Invoices**:
   - Log in to your dashboard
   - Click the "Invoices" tab
   - View all your orders and their invoice status

2. **Download Invoice**:
   - Find the order you need an invoice for
   - Click "Download" if invoice exists
   - Or click "Generate Invoice" for new invoices
   - PDF will download to your computer

3. **Preview Invoice**:
   - Click "Preview" button next to any order
   - View invoice in modal before downloading
   - Close modal when done

### For Administrators

1. **Generate Invoice for Order**:
   ```typescript
   import { generateAndSendInvoice } from '@/lib/adminInvoiceActions';

   const result = await generateAndSendInvoice(orderId, true); // true = send email
   ```

2. **Bulk Generate Invoices**:
   ```typescript
   import { bulkGenerateInvoices } from '@/lib/adminInvoiceActions';

   const result = await bulkGenerateInvoices(orderIds, false); // false = no emails
   console.log(`Generated: ${result.generated}, Failed: ${result.failed}`);
   ```

3. **Regenerate Invoice**:
   ```typescript
   import { regenerateInvoice } from '@/lib/adminInvoiceActions';

   const result = await regenerateInvoice(invoiceId, true); // true = send email
   ```

## API Endpoints

### Generate Invoice API (`/api/generate-invoice.ts`)
Serverless function for invoice generation:

```typescript
POST /api/generate-invoice
{
  "type": "order" | "subscription" | "invoice",
  "id": "order-uuid",
  "regenerate": false,
  "period": { // optional, for subscriptions
    "start": "2025-01-01",
    "end": "2025-01-31"
  }
}

Response:
{
  "success": true,
  "data": {
    "invoiceId": "invoice-uuid",
    "invoiceNumber": "INV-20250131-0001",
    "pdfUrl": "https://...",
    "downloadUrl": "https://..." // signed URL
  }
}
```

## Configuration

### Environment Variables
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-service-key # For API operations
```

### Company Information
Edit `/src/lib/invoices.ts` to update company details:
```typescript
export const COMPANY_INFO = {
  name: 'Hanzo Computer',
  address: '2100 Geng Road',
  city: 'Palo Alto',
  state: 'CA',
  zip: '94303',
  country: 'United States',
  email: 'billing@hanzo.computer',
  phone: '+1 (650) 555-0100',
  website: 'https://hanzo.computer',
  taxId: 'XX-XXXXXXX'
};
```

## Email Integration

To enable email sending, integrate with your preferred email service:

1. **SendGrid Integration**:
   ```typescript
   import sgMail from '@sendgrid/mail';

   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   // Update sendInvoiceEmail function in adminInvoiceActions.ts
   ```

2. **AWS SES Integration**:
   ```typescript
   import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

   const client = new SESClient({ region: "us-west-2" });
   // Update sendInvoiceEmail function
   ```

## Testing

### Unit Tests
```bash
npm test -- invoice.test.ts
```

### Manual Testing
1. Create a test order and mark it as paid
2. Navigate to Dashboard > Invoices tab
3. Click "Generate Invoice" for the test order
4. Verify PDF downloads correctly
5. Check invoice appears in history

## Troubleshooting

### Common Issues

1. **Invoice Generation Fails**:
   - Check Supabase connection
   - Verify storage bucket exists and has proper permissions
   - Check console for detailed error messages

2. **PDF Not Downloading**:
   - Ensure browser allows pop-ups from the site
   - Check if PDF URL is accessible
   - Verify storage bucket is public or signed URL is valid

3. **Missing Invoice Data**:
   - Ensure order has complete information
   - Check user details are properly loaded
   - Verify line items are properly formatted

## Security Considerations

1. **Access Control**:
   - Users can only view/download their own invoices
   - Admin role required for bulk operations
   - RLS policies enforce data isolation

2. **Storage Security**:
   - Invoices stored in Supabase Storage
   - Signed URLs for temporary access
   - Public URLs only for authorized invoices

3. **Data Privacy**:
   - Customer information stored securely
   - PII handled according to privacy policy
   - Audit trail for all invoice operations

## Future Enhancements

1. **Recurring Invoices**: Automatic monthly invoice generation for subscriptions
2. **Custom Templates**: Multiple invoice templates for different use cases
3. **Multi-language Support**: Invoices in customer's preferred language
4. **Payment Links**: Direct payment links in invoice emails
5. **Webhook Integration**: Stripe webhook for automatic invoice generation
6. **Credit Notes**: Support for refunds and adjustments
7. **Batch Download**: ZIP file with multiple invoices
8. **Invoice Scheduling**: Schedule invoice generation for future dates

## Support

For issues or questions about the invoice system:
- Technical Support: support@hanzo.computer
- Billing Questions: billing@hanzo.computer
- Documentation: This file and inline code comments