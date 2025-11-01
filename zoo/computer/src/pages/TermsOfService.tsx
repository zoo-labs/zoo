
import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 md:p-12 space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Hanzo.Computer (the "Service"), operated by Hanzo Industries Inc ("Hanzo AI", "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Services Provided</h2>
            <p className="mb-4">Hanzo.Computer provides:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Hardware Sales:</strong> Purchase of NVIDIA DGX systems and GPUs</li>
              <li><strong>GPU Leasing:</strong> Monthly subscription-based GPU infrastructure leasing</li>
              <li><strong>Cloud Services:</strong> Access to GPU compute resources via Hanzo Cloud</li>
              <li><strong>Managed Services:</strong> Optional infrastructure management and support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Eligibility</h2>
            <p>
              You must be at least 18 years old and have the legal capacity to enter into contracts to use the Service. By using the Service, you represent and warrant that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Hardware Purchase Terms</h2>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">4.1 DGX Spark</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>One-time payment of $4,000 includes dedicated DGX instance</li>
              <li>Includes 100 hours of compute time</li>
              <li>Additional compute hours available for purchase</li>
              <li>Maximum 5 units per order</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">4.2 Payment</h3>
            <p className="mb-4">
              All hardware purchases are processed securely through Stripe. Payment must be received in full before hardware provisioning begins.
            </p>

            <h3 className="text-xl font-semibold text-white mb-2">4.3 Delivery & Setup</h3>
            <p className="mb-4">
              Hardware instances are provisioned within 24-48 hours of payment confirmation. You will receive access credentials and setup instructions via email.
            </p>

            <h3 className="text-xl font-semibold text-white mb-2">4.4 Refund Policy</h3>
            <p>
              We offer a 7-day money-back guarantee for DGX Spark purchases. Refunds are prorated based on compute hours used. To request a refund, contact support@hanzo.ai.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. GPU Leasing Terms</h2>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">5.1 Subscription Model</h3>
            <p className="mb-4">
              GPU leasing is available on monthly, 6-month, or annual subscription basis. Pricing and configurations are detailed on our pricing page.
            </p>

            <h3 className="text-xl font-semibold text-white mb-2">5.2 Billing</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Monthly subscriptions bill on the 1st of each month</li>
              <li>6-month and annual subscriptions are prepaid</li>
              <li>All payments processed via Stripe</li>
              <li>Automatic renewal unless cancelled 7 days before renewal date</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">5.3 Cancellation</h3>
            <p className="mb-4">
              You may cancel your subscription at any time from your account dashboard. Cancellations take effect at the end of the current billing period. No refunds for partial months.
            </p>

            <h3 className="text-xl font-semibold text-white mb-2">5.4 Service Level Agreement (SLA)</h3>
            <p>
              We guarantee 99.9% uptime for leased GPU infrastructure. If we fail to meet this SLA, you are eligible for service credits as outlined in our SLA document.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Request for Quote (RFQ)</h2>
            <p className="mb-4">
              Enterprise customers may request custom quotes for:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Custom GPU configurations</li>
              <li>Dedicated DGX SuperPODs</li>
              <li>Volume discounts</li>
              <li>Long-term contracts</li>
            </ul>
            <p>
              Quotes are valid for 30 days from issuance. Final pricing may vary based on configuration changes or market conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Acceptable Use Policy</h2>
            <p className="mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Engage in cryptocurrency mining without express written permission</li>
              <li>Distribute malware, viruses, or harmful code</li>
              <li>Attempt unauthorized access to our systems or other users' accounts</li>
              <li>Interfere with the normal operation of the Service</li>
              <li>Resell compute resources without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Data Security & Privacy</h2>
            <p>
              Your use of the Service is also governed by our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 mt-4">
              <li>AES-256 encryption at rest</li>
              <li>TLS 1.3 encryption in transit</li>
              <li>Isolated VPC networking</li>
              <li>SOC 2 Type II certified infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Intellectual Property</h2>
            <p className="mb-4">
              All content, trademarks, and intellectual property on Hanzo.Computer are owned by Hanzo Industries Inc or its licensors. You retain all rights to data and models you create using our services.
            </p>
            <p>
              NVIDIA, DGX, and related marks are trademarks of NVIDIA Corporation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, HANZO AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Hanzo AI, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through the Service. Your continued use of the Service after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time for violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Delaware.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
            <p>For questions about these Terms, please contact us at:</p>
            <div className="mt-4 p-4 bg-black/40 rounded-lg border border-dark-border">
              <p><strong>Hanzo Industries Inc</strong></p>
              <p>Email: <a href="mailto:legal@hanzo.ai" className="text-primary hover:underline">legal@hanzo.ai</a></p>
              <p>Support: <a href="mailto:support@hanzo.ai" className="text-primary hover:underline">support@hanzo.ai</a></p>
              <p>Website: <a href="https://hanzo.ai" className="text-primary hover:underline">hanzo.ai</a></p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>By using Hanzo.Computer, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
