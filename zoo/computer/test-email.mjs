#!/usr/bin/env node

/**
 * Test script for email functionality
 * Run with: node test-email.mjs
 */

import sgMail from '@sendgrid/mail';

// Test configuration
const SENDGRID_API_KEY = process.env.VITE_SENDGRID_API_KEY || 'SG.test-key';
const FROM_EMAIL = 'noreply@hanzo.computer';
const TEST_EMAIL = 'test@example.com'; // Replace with your test email

// Initialize SendGrid
sgMail.setApiKey(SENDGRID_API_KEY);

// Test email data
const testQuoteData = {
  quoteNumber: 'TEST-001',
  customerName: 'John Doe',
  customerEmail: TEST_EMAIL,
  gpuModel: 'NVIDIA H100',
  quantity: 8,
  duration: 'Monthly lease',
  pricePerHour: 2.50,
  totalPrice: 3600.00,
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  message: 'This is a test quote. Special pricing applied for your use case.'
};

// Simple HTML template for testing
const getTestEmailHtml = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Test Email - Hanzo Computer</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h1 style="color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">Hanzo Computer</h1>
    <h2>Your GPU Quote is Ready</h2>
    <p>Hi ${data.customerName},</p>
    <p>Thank you for your interest in Hanzo Computer GPU services. Here's your quote:</p>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr style="background-color: #f9f9f9;">
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Quote Number:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">#${data.quoteNumber}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>GPU Model:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${data.gpuModel}</td>
      </tr>
      <tr style="background-color: #f9f9f9;">
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Quantity:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${data.quantity} GPUs</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Duration:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${data.duration}</td>
      </tr>
      <tr style="background-color: #f9f9f9;">
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Price per Hour:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">$${data.pricePerHour.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Price:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd; font-size: 18px; color: #FF6B35;"><strong>$${data.totalPrice.toFixed(2)}</strong></td>
      </tr>
    </table>

    ${data.message ? `<p style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 20px 0;">${data.message}</p>` : ''}

    <p>This quote is valid until <strong>${data.validUntil}</strong></p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://hanzo.computer/dashboard" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Quote in Dashboard</a>
    </div>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

    <p style="color: #666; font-size: 12px; text-align: center;">
      © ${new Date().getFullYear()} Hanzo AI Inc. All rights reserved.<br>
      Techstars '17 | Building the future of AI infrastructure
    </p>
  </div>
</body>
</html>
`;

// Test function
async function testSendEmail() {
  const msg = {
    to: TEST_EMAIL,
    from: FROM_EMAIL,
    subject: `Test Quote #${testQuoteData.quoteNumber} - Hanzo Computer`,
    text: `Hi ${testQuoteData.customerName}, Your GPU quote #${testQuoteData.quoteNumber} is ready. Total: $${testQuoteData.totalPrice}. View at https://hanzo.computer/dashboard`,
    html: getTestEmailHtml(testQuoteData)
  };

  try {
    console.log('Sending test email to:', TEST_EMAIL);
    console.log('Using API key:', SENDGRID_API_KEY.substring(0, 10) + '...');

    await sgMail.send(msg);
    console.log('✅ Test email sent successfully!');
    console.log('Check your inbox at:', TEST_EMAIL);
  } catch (error) {
    console.error('❌ Failed to send test email:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Body:', error.response.body);
    } else {
      console.error(error);
    }
    console.log('\n📋 Make sure to:');
    console.log('1. Set VITE_SENDGRID_API_KEY environment variable');
    console.log('2. Replace TEST_EMAIL with your actual email address');
    console.log('3. Verify SendGrid account is active');
  }
}

// Run test
testSendEmail();