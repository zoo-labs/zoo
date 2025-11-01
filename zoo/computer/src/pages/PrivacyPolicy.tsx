
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
            Privacy Policy
          </h1>
          <p className="text-gray-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-black/40 backdrop-blur-sm border border-dark-border rounded-xl p-8 md:p-12 space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Hanzo Industries Inc ("Hanzo AI", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use Hanzo.Computer (the "Service").
            </p>
            <p className="mt-4">
              By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with this policy, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.1 Personal Information</h3>
            <p className="mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Account Information:</strong> Name, email address, company name, phone number</li>
              <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely via Stripe)</li>
              <li><strong>Profile Information:</strong> Job title, use case descriptions, technical requirements</li>
              <li><strong>Communication Data:</strong> Messages, support tickets, RFQ submissions</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.2 Usage Information</h3>
            <p className="mb-4">We automatically collect information about your use of the Service:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Compute Usage:</strong> GPU hours, memory usage, storage consumption</li>
              <li><strong>Log Data:</strong> IP address, browser type, device information, timestamps</li>
              <li><strong>Performance Metrics:</strong> API calls, response times, error rates</li>
              <li><strong>Analytics Data:</strong> Page views, feature usage, navigation patterns</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.3 Technical Data</h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Infrastructure Logs:</strong> System performance, security events, access logs</li>
              <li><strong>Model Data:</strong> Training metrics, inference requests (metadata only)</li>
              <li><strong>API Keys:</strong> Encrypted access credentials for authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information for the following purposes:</p>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">3.1 Service Delivery</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Provision and manage GPU compute resources</li>
              <li>Process payments and billing</li>
              <li>Provide customer support and technical assistance</li>
              <li>Monitor system performance and uptime</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">3.2 Communication</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Send transactional emails (order confirmations, invoices, provisioning updates)</li>
              <li>Respond to RFQ submissions and quote requests</li>
              <li>Send service announcements and security alerts</li>
              <li>Provide product updates and feature announcements (with consent)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">3.3 Service Improvement</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Analyze usage patterns to improve performance</li>
              <li>Develop new features and services</li>
              <li>Optimize resource allocation and pricing</li>
              <li>Conduct research and analytics</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">3.4 Security & Compliance</h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Detect and prevent fraud, abuse, and security threats</li>
              <li>Enforce our Terms of Service and Acceptable Use Policy</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Protect the rights and safety of our users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. How We Share Your Information</h2>
            <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">4.1 Service Providers</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li><strong>Payment Processing:</strong> Stripe (for secure payment handling)</li>
              <li><strong>Cloud Infrastructure:</strong> AWS, DigitalOcean (for hosting)</li>
              <li><strong>Email Services:</strong> SendGrid or AWS SES (for transactional emails)</li>
              <li><strong>Analytics:</strong> Aggregated, anonymized data for service improvement</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">4.2 NVIDIA Inception Partners</h3>
            <p className="mb-4">
              For enterprise RFQ submissions requiring custom configurations, we may share relevant technical requirements with authorized NVIDIA Inception program partners to fulfill your quote request. We only share information necessary to process your request.
            </p>

            <h3 className="text-xl font-semibold text-white mb-2">4.3 Legal Compliance</h3>
            <p className="mb-4">
              We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Comply with legal obligations</li>
              <li>Protect our rights and property</li>
              <li>Prevent fraud or security threats</li>
              <li>Protect the safety of users or the public</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">4.4 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change via email or prominent notice on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="mb-4">We implement industry-standard security measures to protect your information:</p>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">5.1 Encryption</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li><strong>At Rest:</strong> AES-256 encryption for all stored data</li>
              <li><strong>In Transit:</strong> TLS 1.3 encryption for all network communications</li>
              <li><strong>Credentials:</strong> Hashed and encrypted API keys and passwords</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">5.2 Infrastructure Security</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li><strong>Isolated VPCs:</strong> Network isolation for customer workloads</li>
              <li><strong>Access Controls:</strong> Role-based permissions and multi-factor authentication</li>
              <li><strong>Security Monitoring:</strong> 24/7 intrusion detection and logging</li>
              <li><strong>Regular Audits:</strong> SOC 2 Type II compliance audits</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">5.3 Data Isolation</h3>
            <p>
              Customer workloads and data are isolated from other users. We do not access, analyze, or use your model training data, code, or inference results for any purpose other than providing the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
            <p className="mb-4">We retain your information for as long as necessary to provide the Service and comply with legal obligations:</p>

            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Account Data:</strong> Retained while your account is active plus 30 days after closure</li>
              <li><strong>Payment Records:</strong> Retained for 7 years for tax and accounting purposes</li>
              <li><strong>Usage Logs:</strong> Retained for 90 days for performance monitoring and security</li>
              <li><strong>Support Tickets:</strong> Retained for 2 years for service improvement</li>
              <li><strong>Compute Data:</strong> Deleted immediately upon service termination unless backup requested</li>
            </ul>

            <p className="mt-4">
              You may request deletion of your data at any time by contacting us at privacy@hanzo.ai. We will comply with deletion requests within 30 days, subject to legal retention requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Privacy Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights:</p>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">7.1 General Rights</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">7.2 GDPR Rights (EU/EEA Users)</h3>
            <p className="mb-4">If you are located in the European Union or European Economic Area, you have additional rights under GDPR:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Right to object to processing</li>
              <li>Right to restrict processing</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
              <li>Right to withdraw consent at any time</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">7.3 CCPA Rights (California Users)</h3>
            <p className="mb-4">California residents have the following rights under CCPA:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>

            <p className="mt-4">
              To exercise any of these rights, please contact us at privacy@hanzo.ai. We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Tracking</h2>
            <p className="mb-4">We use cookies and similar tracking technologies to improve your experience:</p>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">8.1 Essential Cookies</h3>
            <p className="mb-4">Required for the Service to function properly:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Authentication and session management</li>
              <li>Security and fraud prevention</li>
              <li>Load balancing and performance optimization</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">8.2 Analytics Cookies</h3>
            <p className="mb-4">Help us understand how users interact with the Service (with your consent):</p>
            <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
              <li>Page views and navigation patterns</li>
              <li>Feature usage and engagement metrics</li>
              <li>Error tracking and debugging</li>
            </ul>

            <p className="mt-4">
              You can control cookie preferences through your browser settings. Note that disabling essential cookies may affect Service functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws through:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Data Processing Agreements with service providers</li>
              <li>Adherence to Privacy Shield principles (where applicable)</li>
              <li>Adequate security measures for cross-border transfers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
            <p>
              The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 18, we will take steps to delete such information promptly.
            </p>
            <p className="mt-4">
              If you believe we have collected information from a child, please contact us at privacy@hanzo.ai.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites (such as hanzo.ai, NVIDIA, and partner sites). We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 mt-4 mb-4">
              <li>Posting the updated policy on this page with a new "Last Updated" date</li>
              <li>Sending an email notification to your registered email address</li>
              <li>Displaying a prominent notice on the Service</li>
            </ul>
            <p>
              Your continued use of the Service after changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
            <p className="mb-4">If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:</p>
            <div className="mt-4 p-4 bg-black/40 rounded-lg border border-dark-border">
              <p><strong>Hanzo Industries Inc</strong></p>
              <p><strong>Privacy Team</strong></p>
              <p>Email: <a href="mailto:privacy@hanzo.ai" className="text-primary hover:underline">privacy@hanzo.ai</a></p>
              <p>Support: <a href="mailto:support@hanzo.ai" className="text-primary hover:underline">support@hanzo.ai</a></p>
              <p>Website: <a href="https://hanzo.ai" className="text-primary hover:underline">hanzo.ai</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Data Protection Officer (EU/EEA)</h2>
            <p>
              For users in the European Union and European Economic Area, you may contact our Data Protection Officer regarding GDPR-related inquiries:
            </p>
            <div className="mt-4 p-4 bg-black/40 rounded-lg border border-dark-border">
              <p><strong>Data Protection Officer</strong></p>
              <p>Email: <a href="mailto:dpo@hanzo.ai" className="text-primary hover:underline">dpo@hanzo.ai</a></p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>By using Hanzo.Computer, you acknowledge that you have read and understood this Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
