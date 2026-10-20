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
        <div
          className='flex flex-col'
          style={{
            gap: 'var(--space-12)',
            paddingTop: 'var(--section-y-lg)',
            paddingInline: 'clamp(var(--space-4), 6vw, var(--space-32))',
          }}
        >
            <h1 className='text-foreground md:text-5xl xl:text-6xl max-md:text-3xl'>Refund Policy for Zoo NGO</h1>
            <p className='text-foreground text-xl'>
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
