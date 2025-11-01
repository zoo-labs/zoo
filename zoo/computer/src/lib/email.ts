import sgMail from '@sendgrid/mail';

// Initialize SendGrid
const apiKey = import.meta.env.VITE_SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
}

const fromEmail = import.meta.env.VITE_EMAIL_FROM || 'noreply@hanzo.computer';
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@hanzo.computer';

export interface QuoteData {
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  gpuModel: string;
  quantity: number;
  duration: string;
  pricePerHour: number;
  totalPrice: number;
  validUntil: string;
  message?: string;
}

export interface OrderData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  billingAddress?: string;
  shippingAddress?: string;
}

export interface SubscriptionData {
  subscriptionId: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  gpuModel: string;
  quantity: number;
  pricePerMonth: number;
  startDate: string;
  billingCycle: string;
}

export interface RFQData {
  rfqNumber: string;
  customerName: string;
  customerEmail: string;
  company?: string;
  gpuModel: string;
  quantity: number;
  duration: string;
  useCase?: string;
  message?: string;
  submittedAt: string;
}

export interface ClusterData {
  requestId: string;
  customerName: string;
  customerEmail: string;
  company?: string;
  clusterSize: string;
  gpuModel: string;
  requirements: string;
  budget?: string;
  timeline?: string;
  submittedAt: string;
}

const getEmailTemplate = (templateName: string, data: any): { html: string; text: string } => {
  switch (templateName) {
    case 'quote':
      return getQuoteEmailTemplate(data as QuoteData);
    case 'order':
      return getOrderConfirmationTemplate(data as OrderData);
    case 'subscription':
      return getSubscriptionConfirmationTemplate(data as SubscriptionData);
    case 'rfq':
      return getRFQConfirmationTemplate(data as RFQData);
    case 'cluster':
      return getClusterRequestTemplate(data as ClusterData);
    case 'admin-rfq':
      return getAdminRFQNotificationTemplate(data as RFQData);
    case 'admin-cluster':
      return getAdminClusterNotificationTemplate(data as ClusterData);
    default:
      throw new Error(`Unknown template: ${templateName}`);
  }
};

const getBaseTemplate = (content: string, preheader?: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hanzo Computer</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    p { display: block; margin: 13px 0; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;">
  ${preheader ? `<div style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>` : ''}
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f7f7;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 20px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Hanzo Computer</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">AI Infrastructure & GPU Computing</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <a href="https://hanzo.computer" style="color: #FF6B35; text-decoration: none; margin: 0 10px;">Website</a>
                    <span style="color: #999;">|</span>
                    <a href="https://twitter.com/hanzoai" style="color: #FF6B35; text-decoration: none; margin: 0 10px;">Twitter</a>
                    <span style="color: #999;">|</span>
                    <a href="https://github.com/hanzoai" style="color: #FF6B35; text-decoration: none; margin: 0 10px;">GitHub</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="color: #666; font-size: 12px;">
                    <p style="margin: 0;">© ${new Date().getFullYear()} Hanzo AI Inc. All rights reserved.</p>
                    <p style="margin: 5px 0 0;">Techstars '17 | Building the future of AI infrastructure</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const getQuoteEmailTemplate = (data: QuoteData): { html: string; text: string } => {
  const content = `
    <h2 style="margin: 0 0 20px; color: #333; font-size: 24px;">Your GPU Quote is Ready</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Hi ${data.customerName},</p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Thank you for your interest in Hanzo Computer GPU services. Your custom quote is ready for review.</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
      <tr>
        <td>
          <h3 style="margin: 0 0 15px; color: #333; font-size: 18px;">Quote Details</h3>
          <table width="100%" cellpadding="8" cellspacing="0" border="0">
            <tr>
              <td style="color: #666; padding: 8px 0;">Quote Number:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">#${data.quoteNumber}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">GPU Model:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.gpuModel}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Quantity:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.quantity} GPU${data.quantity > 1 ? 's' : ''}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Duration:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.duration}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Price per Hour:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">$${data.pricePerHour.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0; border-top: 2px solid #e0e0e0; padding-top: 15px;">Total Price:</td>
              <td style="color: #FF6B35; font-weight: bold; font-size: 20px; padding: 8px 0; border-top: 2px solid #e0e0e0; padding-top: 15px;">$${data.totalPrice.toFixed(2)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${data.message ? `
    <div style="background-color: #fff3cd; border-left: 4px solid #F7931E; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #856404; font-size: 14px;"><strong>Note from our team:</strong></p>
      <p style="margin: 10px 0 0; color: #856404; font-size: 14px;">${data.message}</p>
    </div>
    ` : ''}

    <p style="color: #666; font-size: 14px; margin: 20px 0;">This quote is valid until <strong>${data.validUntil}</strong></p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="https://hanzo.computer/dashboard" style="display: inline-block; padding: 14px 30px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">View Quote in Dashboard</a>
        </td>
      </tr>
    </table>

    <p style="color: #666; font-size: 14px; line-height: 1.5;">If you have any questions or would like to proceed with this quote, please don't hesitate to reach out to our sales team.</p>
  `;

  const text = `
Your GPU Quote is Ready

Hi ${data.customerName},

Thank you for your interest in Hanzo Computer GPU services. Your custom quote is ready for review.

Quote Details:
- Quote Number: #${data.quoteNumber}
- GPU Model: ${data.gpuModel}
- Quantity: ${data.quantity} GPU${data.quantity > 1 ? 's' : ''}
- Duration: ${data.duration}
- Price per Hour: $${data.pricePerHour.toFixed(2)}
- Total Price: $${data.totalPrice.toFixed(2)}

${data.message ? `Note from our team: ${data.message}\n` : ''}

This quote is valid until ${data.validUntil}

View your quote at: https://hanzo.computer/dashboard

If you have any questions, please reach out to our sales team.

Best regards,
Hanzo Computer Team
  `;

  return { html: getBaseTemplate(content, `Your GPU quote #${data.quoteNumber} is ready`), text };
};

const getOrderConfirmationTemplate = (data: OrderData): { html: string; text: string } => {
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #333;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #666; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #333; text-align: right;">$${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  const content = `
    <h2 style="margin: 0 0 20px; color: #333; font-size: 24px;">Order Confirmation</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Hi ${data.customerName},</p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Thank you for your order! Your GPU resources are being provisioned.</p>

    <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #155724; font-size: 16px;"><strong>Order Number:</strong> #${data.orderNumber}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
      <tr>
        <td>
          <h3 style="margin: 0 0 15px; color: #333; font-size: 18px;">Order Details</h3>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 12px; text-align: left; color: #666; font-weight: bold; border-bottom: 2px solid #e0e0e0;">Item</th>
                <th style="padding: 12px; text-align: center; color: #666; font-weight: bold; border-bottom: 2px solid #e0e0e0;">Qty</th>
                <th style="padding: 12px; text-align: right; color: #666; font-weight: bold; border-bottom: 2px solid #e0e0e0;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
      <tr>
        <td align="right">
          <table cellpadding="8" cellspacing="0" border="0" style="margin-left: auto;">
            <tr>
              <td style="color: #666; padding: 5px 15px;">Subtotal:</td>
              <td style="color: #333; padding: 5px 0; text-align: right;">$${data.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 5px 15px;">Tax:</td>
              <td style="color: #333; padding: 5px 0; text-align: right;">$${data.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="color: #333; padding: 10px 15px; border-top: 2px solid #e0e0e0; font-weight: bold; font-size: 18px;">Total:</td>
              <td style="color: #FF6B35; padding: 10px 0; border-top: 2px solid #e0e0e0; font-weight: bold; font-size: 18px; text-align: right;">$${data.total.toFixed(2)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${data.billingAddress ? `
    <div style="margin: 30px 0;">
      <h3 style="margin: 0 0 10px; color: #333; font-size: 16px;">Billing Address</h3>
      <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">${data.billingAddress}</p>
    </div>
    ` : ''}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="https://hanzo.computer/dashboard" style="display: inline-block; padding: 14px 30px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">View Order Status</a>
        </td>
      </tr>
    </table>

    <p style="color: #666; font-size: 14px; line-height: 1.5;">You'll receive another email once your GPU resources are ready to use.</p>
  `;

  const text = `
Order Confirmation

Hi ${data.customerName},

Thank you for your order! Your GPU resources are being provisioned.

Order Number: #${data.orderNumber}

Order Details:
${data.items.map(item => `- ${item.name} (Qty: ${item.quantity}): $${item.price.toFixed(2)}`).join('\n')}

Subtotal: $${data.subtotal.toFixed(2)}
Tax: $${data.tax.toFixed(2)}
Total: $${data.total.toFixed(2)}

${data.billingAddress ? `Billing Address:\n${data.billingAddress}\n` : ''}

View your order status at: https://hanzo.computer/dashboard

You'll receive another email once your GPU resources are ready to use.

Best regards,
Hanzo Computer Team
  `;

  return { html: getBaseTemplate(content, `Order #${data.orderNumber} confirmed`), text };
};

const getSubscriptionConfirmationTemplate = (data: SubscriptionData): { html: string; text: string } => {
  const content = `
    <h2 style="margin: 0 0 20px; color: #333; font-size: 24px;">Subscription Activated</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Hi ${data.customerName},</p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Your GPU subscription has been successfully activated. You now have access to dedicated GPU resources.</p>

    <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #155724; font-size: 16px;"><strong>Subscription ID:</strong> ${data.subscriptionId}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
      <tr>
        <td>
          <h3 style="margin: 0 0 15px; color: #333; font-size: 18px;">Subscription Details</h3>
          <table width="100%" cellpadding="8" cellspacing="0" border="0">
            <tr>
              <td style="color: #666; padding: 8px 0;">Plan:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.planName}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">GPU Model:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.gpuModel}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Quantity:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.quantity} GPU${data.quantity > 1 ? 's' : ''}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Monthly Price:</td>
              <td style="color: #FF6B35; font-weight: bold; font-size: 18px; padding: 8px 0;">$${data.pricePerMonth.toFixed(2)}/month</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Start Date:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.startDate}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Billing Cycle:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.billingCycle}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="background-color: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 20px 0;">
      <h4 style="margin: 0 0 10px; color: #1565c0; font-size: 16px;">What's Next?</h4>
      <ul style="margin: 10px 0; padding-left: 20px; color: #1565c0;">
        <li style="margin: 5px 0;">Access your GPU resources from the dashboard</li>
        <li style="margin: 5px 0;">Configure SSH keys for direct access</li>
        <li style="margin: 5px 0;">Install your preferred ML frameworks</li>
        <li style="margin: 5px 0;">Start running your workloads</li>
      </ul>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="https://hanzo.computer/dashboard" style="display: inline-block; padding: 14px 30px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Access Dashboard</a>
        </td>
      </tr>
    </table>

    <p style="color: #666; font-size: 14px; line-height: 1.5;">Need help getting started? Check out our <a href="https://hanzo.computer/docs" style="color: #FF6B35;">documentation</a> or contact our support team.</p>
  `;

  const text = `
Subscription Activated

Hi ${data.customerName},

Your GPU subscription has been successfully activated. You now have access to dedicated GPU resources.

Subscription ID: ${data.subscriptionId}

Subscription Details:
- Plan: ${data.planName}
- GPU Model: ${data.gpuModel}
- Quantity: ${data.quantity} GPU${data.quantity > 1 ? 's' : ''}
- Monthly Price: $${data.pricePerMonth.toFixed(2)}/month
- Start Date: ${data.startDate}
- Billing Cycle: ${data.billingCycle}

What's Next?
- Access your GPU resources from the dashboard
- Configure SSH keys for direct access
- Install your preferred ML frameworks
- Start running your workloads

Access your dashboard at: https://hanzo.computer/dashboard

Need help? Check out our documentation at https://hanzo.computer/docs

Best regards,
Hanzo Computer Team
  `;

  return { html: getBaseTemplate(content, `Subscription ${data.subscriptionId} activated`), text };
};

const getRFQConfirmationTemplate = (data: RFQData): { html: string; text: string } => {
  const content = `
    <h2 style="margin: 0 0 20px; color: #333; font-size: 24px;">Request for Quote Received</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Hi ${data.customerName},</p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Thank you for submitting your request for quote. Our sales team has received your requirements and will prepare a custom proposal for you.</p>

    <div style="background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #0c5460; font-size: 16px;"><strong>RFQ Number:</strong> #${data.rfqNumber}</p>
      <p style="margin: 10px 0 0; color: #0c5460; font-size: 14px;">Submitted: ${data.submittedAt}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
      <tr>
        <td>
          <h3 style="margin: 0 0 15px; color: #333; font-size: 18px;">Your Requirements</h3>
          <table width="100%" cellpadding="8" cellspacing="0" border="0">
            ${data.company ? `
            <tr>
              <td style="color: #666; padding: 8px 0;">Company:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="color: #666; padding: 8px 0;">GPU Model:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.gpuModel}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Quantity:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.quantity} GPU${data.quantity > 1 ? 's' : ''}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Duration:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.duration}</td>
            </tr>
            ${data.useCase ? `
            <tr>
              <td style="color: #666; padding: 8px 0; vertical-align: top;">Use Case:</td>
              <td style="color: #333; padding: 8px 0;">${data.useCase}</td>
            </tr>
            ` : ''}
            ${data.message ? `
            <tr>
              <td style="color: #666; padding: 8px 0; vertical-align: top;">Additional Details:</td>
              <td style="color: #333; padding: 8px 0;">${data.message}</td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #F7931E; padding: 15px; margin: 20px 0;">
      <h4 style="margin: 0 0 10px; color: #856404; font-size: 16px;">What Happens Next?</h4>
      <ol style="margin: 10px 0; padding-left: 20px; color: #856404;">
        <li style="margin: 5px 0;">Our sales team will review your requirements</li>
        <li style="margin: 5px 0;">We'll prepare a custom quote based on your needs</li>
        <li style="margin: 5px 0;">You'll receive your quote within 24-48 hours</li>
        <li style="margin: 5px 0;">A sales representative may contact you for clarification if needed</li>
      </ol>
    </div>

    <p style="color: #666; font-size: 14px; line-height: 1.5;">If you have any urgent requirements or questions, please don't hesitate to contact our sales team directly at <a href="mailto:sales@hanzo.computer" style="color: #FF6B35;">sales@hanzo.computer</a>.</p>
  `;

  const text = `
Request for Quote Received

Hi ${data.customerName},

Thank you for submitting your request for quote. Our sales team has received your requirements and will prepare a custom proposal for you.

RFQ Number: #${data.rfqNumber}
Submitted: ${data.submittedAt}

Your Requirements:
${data.company ? `Company: ${data.company}\n` : ''}- GPU Model: ${data.gpuModel}
- Quantity: ${data.quantity} GPU${data.quantity > 1 ? 's' : ''}
- Duration: ${data.duration}
${data.useCase ? `- Use Case: ${data.useCase}\n` : ''}${data.message ? `- Additional Details: ${data.message}\n` : ''}

What Happens Next?
1. Our sales team will review your requirements
2. We'll prepare a custom quote based on your needs
3. You'll receive your quote within 24-48 hours
4. A sales representative may contact you for clarification if needed

For urgent requirements, contact: sales@hanzo.computer

Best regards,
Hanzo Computer Team
  `;

  return { html: getBaseTemplate(content, `RFQ #${data.rfqNumber} received`), text };
};

const getClusterRequestTemplate = (data: ClusterData): { html: string; text: string } => {
  const content = `
    <h2 style="margin: 0 0 20px; color: #333; font-size: 24px;">Cluster Request Received</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Hi ${data.customerName},</p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">Thank you for your interest in Hanzo Computer's enterprise GPU cluster solutions. Our infrastructure team has received your requirements and will design a custom solution for you.</p>

    <div style="background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #0c5460; font-size: 16px;"><strong>Request ID:</strong> ${data.requestId}</p>
      <p style="margin: 10px 0 0; color: #0c5460; font-size: 14px;">Submitted: ${data.submittedAt}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
      <tr>
        <td>
          <h3 style="margin: 0 0 15px; color: #333; font-size: 18px;">Cluster Requirements</h3>
          <table width="100%" cellpadding="8" cellspacing="0" border="0">
            ${data.company ? `
            <tr>
              <td style="color: #666; padding: 8px 0;">Company:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="color: #666; padding: 8px 0;">Cluster Size:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.clusterSize}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">GPU Model:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.gpuModel}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0; vertical-align: top;">Requirements:</td>
              <td style="color: #333; padding: 8px 0;">${data.requirements}</td>
            </tr>
            ${data.budget ? `
            <tr>
              <td style="color: #666; padding: 8px 0;">Budget Range:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.budget}</td>
            </tr>
            ` : ''}
            ${data.timeline ? `
            <tr>
              <td style="color: #666; padding: 8px 0;">Timeline:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.timeline}</td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0;">
      <h4 style="margin: 0 0 10px; color: #2e7d32; font-size: 16px;">Enterprise Benefits</h4>
      <ul style="margin: 10px 0; padding-left: 20px; color: #2e7d32;">
        <li style="margin: 5px 0;">Dedicated infrastructure with guaranteed availability</li>
        <li style="margin: 5px 0;">Custom network configuration and security</li>
        <li style="margin: 5px 0;">24/7 enterprise support</li>
        <li style="margin: 5px 0;">Flexible scaling options</li>
      </ul>
    </div>

    <p style="color: #666; font-size: 14px; line-height: 1.5;">Our solutions architect will contact you within 24 hours to discuss your requirements in detail and provide a comprehensive proposal.</p>

    <p style="color: #666; font-size: 14px; line-height: 1.5;">For immediate assistance, please contact our enterprise team at <a href="mailto:enterprise@hanzo.computer" style="color: #FF6B35;">enterprise@hanzo.computer</a>.</p>
  `;

  const text = `
Cluster Request Received

Hi ${data.customerName},

Thank you for your interest in Hanzo Computer's enterprise GPU cluster solutions. Our infrastructure team has received your requirements and will design a custom solution for you.

Request ID: ${data.requestId}
Submitted: ${data.submittedAt}

Cluster Requirements:
${data.company ? `Company: ${data.company}\n` : ''}- Cluster Size: ${data.clusterSize}
- GPU Model: ${data.gpuModel}
- Requirements: ${data.requirements}
${data.budget ? `- Budget Range: ${data.budget}\n` : ''}${data.timeline ? `- Timeline: ${data.timeline}\n` : ''}

Enterprise Benefits:
- Dedicated infrastructure with guaranteed availability
- Custom network configuration and security
- 24/7 enterprise support
- Flexible scaling options

Our solutions architect will contact you within 24 hours to discuss your requirements in detail.

For immediate assistance: enterprise@hanzo.computer

Best regards,
Hanzo Computer Team
  `;

  return { html: getBaseTemplate(content, `Cluster request ${data.requestId} received`), text };
};

const getAdminRFQNotificationTemplate = (data: RFQData): { html: string; text: string } => {
  const content = `
    <h2 style="margin: 0 0 20px; color: #333; font-size: 24px;">New RFQ Received</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">A new request for quote has been submitted and requires attention.</p>

    <div style="background-color: #fff3cd; border-left: 4px solid #F7931E; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #856404; font-size: 16px;"><strong>RFQ Number:</strong> #${data.rfqNumber}</p>
      <p style="margin: 10px 0 0; color: #856404; font-size: 14px;">Submitted: ${data.submittedAt}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
      <tr>
        <td>
          <h3 style="margin: 0 0 15px; color: #333; font-size: 18px;">Customer Information</h3>
          <table width="100%" cellpadding="8" cellspacing="0" border="0">
            <tr>
              <td style="color: #666; padding: 8px 0;">Name:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Email:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;"><a href="mailto:${data.customerEmail}" style="color: #FF6B35;">${data.customerEmail}</a></td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="color: #666; padding: 8px 0;">Company:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
          </table>

          <h3 style="margin: 20px 0 15px; color: #333; font-size: 18px;">Requirements</h3>
          <table width="100%" cellpadding="8" cellspacing="0" border="0">
            <tr>
              <td style="color: #666; padding: 8px 0;">GPU Model:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.gpuModel}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Quantity:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.quantity} GPU${data.quantity > 1 ? 's' : ''}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Duration:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.duration}</td>
            </tr>
            ${data.useCase ? `
            <tr>
              <td style="color: #666; padding: 8px 0; vertical-align: top;">Use Case:</td>
              <td style="color: #333; padding: 8px 0;">${data.useCase}</td>
            </tr>
            ` : ''}
            ${data.message ? `
            <tr>
              <td style="color: #666; padding: 8px 0; vertical-align: top;">Message:</td>
              <td style="color: #333; padding: 8px 0;">${data.message}</td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="https://hanzo.computer/admin" style="display: inline-block; padding: 14px 30px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">View in Admin Dashboard</a>
        </td>
      </tr>
    </table>
  `;

  const text = `
New RFQ Received

RFQ Number: #${data.rfqNumber}
Submitted: ${data.submittedAt}

Customer Information:
- Name: ${data.customerName}
- Email: ${data.customerEmail}
${data.company ? `- Company: ${data.company}\n` : ''}

Requirements:
- GPU Model: ${data.gpuModel}
- Quantity: ${data.quantity} GPU${data.quantity > 1 ? 's' : ''}
- Duration: ${data.duration}
${data.useCase ? `- Use Case: ${data.useCase}\n` : ''}${data.message ? `- Message: ${data.message}\n` : ''}

View in Admin Dashboard: https://hanzo.computer/admin

Hanzo Computer Admin System
  `;

  return { html: getBaseTemplate(content, `New RFQ #${data.rfqNumber}`), text };
};

const getAdminClusterNotificationTemplate = (data: ClusterData): { html: string; text: string } => {
  const content = `
    <h2 style="margin: 0 0 20px; color: #333; font-size: 24px;">New Enterprise Cluster Request</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">A new enterprise cluster request has been submitted and requires immediate attention.</p>

    <div style="background-color: #ffebee; border-left: 4px solid #f44336; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #c62828; font-size: 16px;"><strong>HIGH PRIORITY - Enterprise Request</strong></p>
      <p style="margin: 10px 0 0; color: #c62828; font-size: 14px;">Request ID: ${data.requestId}</p>
      <p style="margin: 5px 0 0; color: #c62828; font-size: 14px;">Submitted: ${data.submittedAt}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
      <tr>
        <td>
          <h3 style="margin: 0 0 15px; color: #333; font-size: 18px;">Customer Information</h3>
          <table width="100%" cellpadding="8" cellspacing="0" border="0">
            <tr>
              <td style="color: #666; padding: 8px 0;">Name:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Email:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;"><a href="mailto:${data.customerEmail}" style="color: #FF6B35;">${data.customerEmail}</a></td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="color: #666; padding: 8px 0;">Company:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
          </table>

          <h3 style="margin: 20px 0 15px; color: #333; font-size: 18px;">Cluster Requirements</h3>
          <table width="100%" cellpadding="8" cellspacing="0" border="0">
            <tr>
              <td style="color: #666; padding: 8px 0;">Cluster Size:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.clusterSize}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">GPU Model:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.gpuModel}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0; vertical-align: top;">Requirements:</td>
              <td style="color: #333; padding: 8px 0;">${data.requirements}</td>
            </tr>
            ${data.budget ? `
            <tr>
              <td style="color: #666; padding: 8px 0;">Budget:</td>
              <td style="color: #FF6B35; font-weight: bold; font-size: 16px; padding: 8px 0;">${data.budget}</td>
            </tr>
            ` : ''}
            ${data.timeline ? `
            <tr>
              <td style="color: #666; padding: 8px 0;">Timeline:</td>
              <td style="color: #333; font-weight: bold; padding: 8px 0;">${data.timeline}</td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #2e7d32; font-size: 14px;"><strong>Action Required:</strong> Contact customer within 24 hours to discuss requirements.</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="https://hanzo.computer/admin" style="display: inline-block; padding: 14px 30px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">View in Admin Dashboard</a>
        </td>
      </tr>
    </table>
  `;

  const text = `
New Enterprise Cluster Request

HIGH PRIORITY - Enterprise Request
Request ID: ${data.requestId}
Submitted: ${data.submittedAt}

Customer Information:
- Name: ${data.customerName}
- Email: ${data.customerEmail}
${data.company ? `- Company: ${data.company}\n` : ''}

Cluster Requirements:
- Cluster Size: ${data.clusterSize}
- GPU Model: ${data.gpuModel}
- Requirements: ${data.requirements}
${data.budget ? `- Budget: ${data.budget}\n` : ''}${data.timeline ? `- Timeline: ${data.timeline}\n` : ''}

Action Required: Contact customer within 24 hours

View in Admin Dashboard: https://hanzo.computer/admin

Hanzo Computer Admin System
  `;

  return { html: getBaseTemplate(content, `URGENT: Cluster request ${data.requestId}`), text };
};

// Email sending functions
export const sendQuoteEmail = async (to: string, data: QuoteData): Promise<void> => {
  if (!apiKey) {
    console.error('SendGrid API key not configured');
    throw new Error('Email service not configured');
  }

  const { html, text } = getQuoteEmailTemplate(data);

  const msg = {
    to,
    from: fromEmail,
    subject: `Your GPU Quote #${data.quoteNumber} is Ready - Hanzo Computer`,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    console.log('Quote email sent successfully to', to);
  } catch (error) {
    console.error('Error sending quote email:', error);
    throw error;
  }
};

export const sendOrderConfirmation = async (to: string, data: OrderData): Promise<void> => {
  if (!apiKey) {
    console.error('SendGrid API key not configured');
    throw new Error('Email service not configured');
  }

  const { html, text } = getOrderConfirmationTemplate(data);

  const msg = {
    to,
    from: fromEmail,
    subject: `Order Confirmation #${data.orderNumber} - Hanzo Computer`,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    console.log('Order confirmation sent successfully to', to);
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    throw error;
  }
};

export const sendSubscriptionConfirmation = async (to: string, data: SubscriptionData): Promise<void> => {
  if (!apiKey) {
    console.error('SendGrid API key not configured');
    throw new Error('Email service not configured');
  }

  const { html, text } = getSubscriptionConfirmationTemplate(data);

  const msg = {
    to,
    from: fromEmail,
    subject: `Subscription Activated - ${data.planName} - Hanzo Computer`,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    console.log('Subscription confirmation sent successfully to', to);
  } catch (error) {
    console.error('Error sending subscription confirmation:', error);
    throw error;
  }
};

export const sendRFQConfirmation = async (to: string, data: RFQData): Promise<void> => {
  if (!apiKey) {
    console.error('SendGrid API key not configured');
    throw new Error('Email service not configured');
  }

  const { html, text } = getRFQConfirmationTemplate(data);

  const msg = {
    to,
    from: fromEmail,
    subject: `RFQ #${data.rfqNumber} Received - Hanzo Computer`,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    console.log('RFQ confirmation sent successfully to', to);
  } catch (error) {
    console.error('Error sending RFQ confirmation:', error);
    throw error;
  }
};

export const sendAdminNotification = async (data: RFQData | ClusterData): Promise<void> => {
  if (!apiKey) {
    console.error('SendGrid API key not configured');
    throw new Error('Email service not configured');
  }

  const isCluster = 'clusterSize' in data;
  const { html, text } = isCluster
    ? getAdminClusterNotificationTemplate(data as ClusterData)
    : getAdminRFQNotificationTemplate(data as RFQData);

  const subject = isCluster
    ? `URGENT: New Cluster Request - ${(data as ClusterData).requestId}`
    : `New RFQ Submitted - #${(data as RFQData).rfqNumber}`;

  const msg = {
    to: adminEmail,
    from: fromEmail,
    subject,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    console.log('Admin notification sent successfully');
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
};

// Utility function to send email with template
export const sendEmail = async (to: string, templateName: string, data: any): Promise<void> => {
  if (!apiKey) {
    console.error('SendGrid API key not configured');
    throw new Error('Email service not configured');
  }

  const { html, text } = getEmailTemplate(templateName, data);

  let subject = '';
  switch (templateName) {
    case 'quote':
      subject = `Your GPU Quote #${data.quoteNumber} is Ready - Hanzo Computer`;
      break;
    case 'order':
      subject = `Order Confirmation #${data.orderNumber} - Hanzo Computer`;
      break;
    case 'subscription':
      subject = `Subscription Activated - ${data.planName} - Hanzo Computer`;
      break;
    case 'rfq':
      subject = `RFQ #${data.rfqNumber} Received - Hanzo Computer`;
      break;
    case 'cluster':
      subject = `Cluster Request ${data.requestId} Received - Hanzo Computer`;
      break;
    case 'admin-rfq':
      subject = `New RFQ Submitted - #${data.rfqNumber}`;
      break;
    case 'admin-cluster':
      subject = `URGENT: New Cluster Request - ${data.requestId}`;
      break;
    default:
      subject = 'Hanzo Computer Notification';
  }

  const msg = {
    to,
    from: fromEmail,
    subject,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully: ${templateName} to ${to}`);
  } catch (error) {
    console.error(`Error sending email (${templateName}):`, error);
    throw error;
  }
};