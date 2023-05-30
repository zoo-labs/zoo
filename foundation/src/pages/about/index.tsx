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
export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <Navbar />
      <Intro breadcrumbs="ZOO LABS FOUNDATION > ABOUT" title="About Zoo." comment="Dedicated to preserving the world's vulnerable wildlife by embracing the power of research, education, and partnership to create a thriving future for all species on our planet."/>
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
