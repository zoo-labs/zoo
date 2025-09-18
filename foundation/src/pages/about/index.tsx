import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Intro from '@/components/intro/Intro';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Principles from '@/components/Principles';
import Donation from '@/components/Donation';
import OurEfforts from '@/components/Ourefforts';
import Safeguard from '@/components/Safeguard';
import StartCollecting from '@/components/Collecting';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <Layout>
      <Seo />
      <Navbar />
        <Intro breadcrumbs="Zoo Labs Foundation" title="Mission" comment="Dedicated to protecting wildlife biodiversity through education, research and conservation efforts."/>
      
      <OurEfforts />
      <Principles />
      <Donation />
      <div className='max-md:hidden'>
      <StartCollecting />
      <Safeguard />
      </div>
      <div className='hidden max-md:block'>
      <Safeguard />
      <StartCollecting />
      </div>
      <Newsletter />
      <Footer />
    </Layout>
  );
}
