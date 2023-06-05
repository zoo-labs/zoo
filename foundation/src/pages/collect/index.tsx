import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import StartCollecting from '@/components/Collecting';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Header from '@/components/collect/Header';
import Animal_Item from '@/components/animal/Detail';
import Animals from '@/components/animal/Item';
import Donation from '@/components/Donation';
import Volunteer from '@/components/Volunteer';
import Campaign from '@/components/Campaign';
import Aiding from '@/components/Aiding';
import TradingCard from '@/components/collect/TradingCard';
import CardList from '@/components/collect/CardList';
import Support from '@/components/collect/Support';

export default function CollectPage() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <Header />
        <Aiding />
        <TradingCard />
        <CardList />
        <Support />
        <Animal_Item />
        <Animals />
        <Donation />
        <Volunteer />
        <StartCollecting />
        <Campaign />
        <Newsletter />
        <Footer />
    </Layout>
  );
}
