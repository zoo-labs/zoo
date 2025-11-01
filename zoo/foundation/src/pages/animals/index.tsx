import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Animal_Item from '@/components/animal/Detail';
import Animals from '@/components/animal/Item';
import Donation from '@/components/Donation';
import Volunteer from '@/components/Volunteer';
import Campaign from '@/components/Campaign';
import Aiding from '@/components/Aiding';
import Globe from '@/components/WrapGlobe';

export default function CollectPage() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <div className='pt-16 px-6 md:px-12 bg-black relative'>
          <div className='flex flex-col items-center justify-center relative'>
            <div className='relative z-10 mb-8'>
              <Globe />
            </div>
            <div className='text-center -mt-12 relative z-20'>
              <h1 className='text-white text-center text-4xl md:text-5xl lg:text-6xl mb-8'>Our Supported Animals</h1>
              <p className='text-gray-300 text-center text-lg md:text-xl max-w-3xl mx-auto mb-12'>Learn about the endangered species we&apos;re protecting through conservation efforts and education.</p>
            </div>
          </div>
        </div>
        <Aiding />
        <Animal_Item />
        <Animals />
        <Donation />
        <Volunteer />
        <Campaign />
        <Newsletter />
        <Footer />
    </Layout>
  );
}
