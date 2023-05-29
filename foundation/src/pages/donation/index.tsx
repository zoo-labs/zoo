import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import StartCollecting from '@/components/Collecting';
import Newsletter from '@/components/Newsletter';
import Campaign from '@/components/Campaign';
import Footer from '@/components/Footer';
import Header from '@/pages/donation/Header';
export default function HomePage() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <Header />
        <StartCollecting />
        <Campaign />
        <Newsletter />
        <Footer />
    </Layout>
  );
}
