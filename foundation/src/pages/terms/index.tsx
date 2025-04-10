import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
export default function HomePage() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <div className='max-md:pt-36 flex flex-col bg-black space-y-12 md:px-32 max-md:px-4 md:pt-32 pt-16'>
            <h1 className='text-white md:text-5xl xl:text-6xl max-md:text-3xl'>Terms of Use</h1>
            <p className='text-white text-xl'>
            At Zoo Labs Foundation, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, store, and disclose your information when you visit our website, use our services, or interact with us.<br /><br />
            By using our website or services, you agree to the terms of this Privacy Policy. We may update this policy from time to time, so please review it periodically to stay informed about any changes.<br /><br />
            1. Information We Collect<br />
We may collect the following types of information:<br /><br />

a. Personal Information: This includes any information that can be used to identify you, such as your name, email address, mailing address, phone number, and payment details. We collect personal information when you make a donation, sign up for our newsletter, register for an event, or otherwise interact with us.<br /><br />

b. Non-Personal Information: This refers to information that does not identify you personally, such as your browser type, IP address, device type, and usage data. We may collect non-personal information through cookies, web beacons, or other tracking technologies to analyze and improve our website&apos;s performance.<br /><br />

2. How We Use Your Information<br />

We may use your information for the following purposes:<br /><br />

a. To process your donations and provide you with a receipt.<br /><br />

b. To communicate with you about our conservation efforts, events, and updates.<br /><br />

c. To respond to your inquiries, requests, or feedback.<br /><br />

d. To improve our website, services, and user experience.<br /><br />

e. To comply with legal obligations and protect our rights and interests.<br /><br />

1. Sharing Your Information<br /><br />

We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:<br /><br />

a. With service providers that help us operate our website or process donations (e.g., payment processors, email service providers). These providers are only given access to the information needed to perform their services and are bound by strict confidentiality agreements.<br /><br />

b. With law enforcement, government agencies, or courts when required by law or to protect our legal rights and interests.<br /><br />

2. Cookies and Tracking Technologies<br /><br />

We use cookies and other tracking technologies to collect non-personal information and enhance your experience on our website. You can adjust your browser settings to refuse or manage cookies, but doing so may affect the functionality of our website.<br /><br />

3. Security<br /><br />

We take reasonable precautions to protect your personal information from unauthorized access, loss, misuse, or alteration. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your information.<br /><br />

4. Children&apos;s Privacy<br /><br />
Our website and services are not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information as soon as possible.<br /><br />

5. Third-Party Links<br /><br />
Our website may contain links to third-party websites that are not governed by this Privacy Policy. We are not responsible for the privacy practices or content of these websites, and we encourage you to review their privacy policies before providing them with any personal information.<br /><br />

6. Your Rights and Choices<br /><br />
You may have certain rights and choices concerning your personal information, such as the right to access, update, or delete your information, or opt-out of receiving marketing communications. To exercise these rights, please contact us using the information provided below.<br /><br />

7. Contact Us<br /><br />

If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
Zoo Labs Foundation<br /><br />

hello@zoo.ngo<br />
415-373-2496<br /><br />

We will make every effort to respond to your inquiries and address any concerns as quickly as possible.<br /><br />

8. Changes to This Privacy Policy<br /><br />

We may update this Privacy Policy from time to time to reflect changes in our practices or relevant laws and regulations. When we make changes, we will update the &quot;Last Updated&quot; date at the beginning of this policy. We encourage you to review this policy periodically to stay informed about how we collect, use, and protect your personal information.<br /><br />

9. International Users<br /><br />

If you are accessing our website or services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States, where our servers are located and our central database is operated. By using our services, you understand and agree that your information may be transferred to our facilities and those third parties with whom we share it as described in this Privacy Policy.<br /><br />

10. California Residents<br /><br />

If you are a California resident, you may have certain additional rights under the California Consumer Privacy Act (CCPA). To learn more about your California privacy rights, please consult our CCPA Privacy Notice for California Residents, which is incorporated into this Privacy Policy by reference.<br /><br />

11. European Union Residents<br /><br />

If you are a resident of the European Union (EU) or the European Economic Area (EEA), you may have additional rights under the General Data Protection Regulation (GDPR). These rights may include the right to access, rectify, erase, restrict, or object to the processing of your personal information. To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section of this Privacy Policy.<br /><br />

12. Consent to Receive Electronic Communications<br /><br />

By providing us with your email address, you consent to receive communications from us electronically, including newsletters, updates, and other information related to Zoo Labs Foundation. You may unsubscribe from these communications at any time by following the &quot;unsubscribe&quot; instructions provided in the email or by contacting us directly.<br /><br />

13. Governing Law<br /><br />

This Privacy Policy and any disputes related to it or our privacy practices shall be governed by the laws of the United States and the applicable state laws where Zoo Labs Foundation is headquartered, without regard to any conflict of laws principles.
            </p>
            <h1 className='text-white md:text-5xl xl:text-6xl max-md:text-3xl'>Refund Policy for Zoo NGO</h1>
            <p className='text-white text-xl'>
            1. General Policy: Donations made to Zoo NGO are generally non-refundable. Exceptions are at the organization&apos;s discretion and must meet specific criteria.<br /><br />

2. Error Correction: Donors who make an error, such as the wrong amount or duplicate transactions, must contact us within 48 hours for a refund.<br /><br />

3. Unauthorized Donations: Report suspected fraudulent activity immediately for verification and potential refund.<br /><br />

4. Tax Implications: Refunds may affect tax obligations. Consult a tax professional for guidance.<br /><br />

5. Request Process: To request a refund, contact a@zoo.ngo in writing within the eligibility period.<br /><br />

6. Refund Timing: Approved refunds are processed within 14 business days via the original payment method.<br /><br />

7. Amendments: Zoo NGO reserves the right to amend this policy.<br /><br />
By donating, you agree to this refund policy.
            </p>
        </div>
        <Newsletter />
        <Footer />
    </Layout>
  );
}
