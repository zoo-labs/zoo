import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Intro from '@/components/intro/Intro';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Comment from '@/components/Comment';
import Principles from '@/components/Principles';
import Donation from '@/components/Donation';
import AnimalDetail from '@/components/animal/Detail';
import AnimalItems from '@/components/animal/Item';
import Safeguard from '@/components/Safeguard';
import StartCollecting from '@/components/Collecting';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function IndexPage() {
  return (
    <Layout>
      <Seo />
      <Navbar />
      <Intro breadcrumbs="Zoo Labs Foundation" title="Preserve" comment="Dedicated to protecting wildlife biodiversity through aligned charities, education, research and active conservation efforts."/>
      <Comment />
      <Principles />
      <Donation />
      <div className='bg-black pt-32'>
        <AnimalDetail />
      </div>
      <AnimalItems />
      <Safeguard />
      <StartCollecting />
      <Newsletter />
      <Footer />
    </Layout>
  );
}
