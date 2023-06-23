import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Header from '@/components/zoo-connect/Header';
import Fundraiser from '@/components/zoo-connect/Fundraiser';
import Campaign_Goal from '@/components/zoo-connect/Campaign_Goal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ZooConnect() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <div className='flex max-md:flex-col md:justify-between bg-black md:px-8 lg:px-12 xl:px-16 2xl:px-24 md:space-x-8 lg:space-x-16 xl:space-x-24 md:pt-20'>
          <Header />
          <Fundraiser />
        </div>
        <Campaign_Goal />
        <Footer />
    </Layout>
  );
}
