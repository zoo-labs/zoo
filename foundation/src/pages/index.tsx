import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Intro from '@/components/intro/Intro';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Comment from '@/components/Comment';
import Principles from '@/components/Principles';
import Donation from '@/components/Donation';
import AnimalDetail from '@/components/animal/Detail';
export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <Navbar />
      <Intro breadcrumbs="ZOO LABS FOUNDATION" title="Preserve" comment="The foundation's mission is to protect our planet's precious wildlife biodiversity through research, education, and collaboration with aligned charities."/>
      <Comment />
      <Principles />
      <Donation />
      <AnimalDetail />
    </Layout>
  );
}
