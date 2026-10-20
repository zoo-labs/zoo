import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Header from '@/components/zoo-connect/Header';
import Fundraiser from '@/components/zoo-connect/Fundraiser';
import Campaign_Goal from '@/components/zoo-connect/Campaign_Goal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Elements } from '@stripe/react-stripe-js';
import { stripe } from '@/lib/stripe';

export default function ZooConnect() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <Elements stripe={stripe}>
          <Header />
        </Elements>
        <Fundraiser />
        <Campaign_Goal />
        <Footer />
    </Layout>
  );
}
