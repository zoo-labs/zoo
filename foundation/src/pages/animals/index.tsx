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
        <div className='pt-16 pb-12 px-6 md:px-12 bg-gradient-to-b from-emerald-50/50 via-white to-white relative border-b border-gray-100'>
          <div className='flex flex-col items-center justify-center relative'>
            <div className='relative z-10 mb-6'>
              <Globe />
            </div>
            <div className='text-center relative z-20 max-w-3xl mx-auto'>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
                🐾 Endangered Wildlife Sanctuary
              </span>
              <h1 className='text-gray-950 text-center text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4'>
                Our Supported Animals
              </h1>
              <p className='text-gray-600 text-center text-lg md:text-xl leading-relaxed'>
                Learn about and interact in 3D with the endangered species we&apos;re protecting through conservation science, sanctuaries, and education.
              </p>
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
