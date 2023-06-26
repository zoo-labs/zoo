import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Header from '@/components/zoo-connect/Header';
import Fundraiser from '@/components/zoo-connect/Fundraiser';
import Campaign_Goal from '@/components/zoo-connect/Campaign_Goal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function ZooConnect() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
  return (
    <Layout>
        <Seo />
        <Navbar />
        <Elements stripe={stripePromise}>
          <Header />
        </Elements>
        <Fundraiser />
        <Campaign_Goal />
        <Footer />
    </Layout>
  );
}
