import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import StartCollecting from '@/components/Collecting';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Header from '@/pages/getinvolved/Header';
import InvolvedContent from '@/components/InvolvedContent';
import Comments from '@/components/Comment';
import Donation from '@/components/Donation';
import Volunteer from '@/components/Volunteer';
import Campaign from '@/components/Campaign';
export default function HomePage() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <Header />
        <InvolvedContent index={0} id='' image='/images/involved1.png' title='Our targeted focus.' content1="Dive into our diverse range of conservation programs, focused on habitat preservation, species protection, and community engagement." content2='Learn about our flagship initiatives, like the legal policies we support, how we can collect data to eliminate poaching and the on-the-ground activities our organization participates in throughout the year, which make a significant impact on preserving these endangered species.' type='2' direction='1' />
        <Comments />
        <InvolvedContent index={1} id="ground_activity" image='/images/involved2.png' title='On-Ground Activities' content1="The Zoo Labs Foundation plays a unequivocal role in animal preservation by conducting essential on-the-ground activities that foster research, conservation efforts, and the well-being of threatened species."  type='1' direction='2' />
        <InvolvedContent index={2} id="rescuing_animal" image='/images/involved3.png' title='Rescuing Animals' content1="One of the many ways to help save endangered species is by rescuing animals orphaned by poachers and working towards their successful reintegration into the wild."  type='1' direction='1' />
        <div className='bg-black pt-52'><Donation /></div>
        <InvolvedContent index={3} id="collecting_data" image='/images/involved4.png' title='Collecting Data' content1="At Zoo Labs Foundation, we're dedicated to understanding the lives of endangered animals by studying their behavior and population dynamics."  type='1' direction='2' />
        <InvolvedContent index={4} id="legal_avenues" image='/images/involved5.png' title='Legal Avenues' content1="By actively pursuing these legal avenues, Zoo Labs Foundation can help create a more robust legal framework for the protection of endangered species and their habitats.
"  type='1' direction='1' />
        <Volunteer />
        <StartCollecting />
        <Campaign />
        <Newsletter />
        <Footer />
    </Layout>
  );
}
