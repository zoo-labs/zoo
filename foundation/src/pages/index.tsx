import * as React from 'react';
import Link from 'next/link';

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
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function IndexPage() {
  return (
    <Layout>
      <Seo />
      <Navbar />
      <Intro breadcrumbs="Zoo Labs Foundation" title="Preserve" comment=" Wildlife biodiversity through aligned charities, education, research and active conservation efforts."/>
      <Comment />
      <Principles />
      <Donation />
      <div className='bg-black pt-32'>
        <AnimalDetail />
      </div>
      <AnimalItems />
      <Safeguard />
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 text-center">Wildlife Volunteer Experiences</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Get up close with wildlife conservation through our volunteer programs at animal sanctuaries worldwide. Make a real impact while experiencing unforgettable adventures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured experiences preview - 3 cards */}
            <Link href="/experiences/1" className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1493962853295-0fd70327578a" 
                  alt="Big Cat Conservation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">Big Cat Conservation</h3>
                <p className="text-gray-400 text-sm mb-2">South Africa</p>
                <p className="text-lg font-bold">$1,200 / 2 weeks</p>
              </div>
            </Link>
            
            <Link href="/experiences/2" className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac" 
                  alt="Elephant Sanctuary" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">Elephant Sanctuary</h3>
                <p className="text-gray-400 text-sm mb-2">Thailand</p>
                <p className="text-lg font-bold">$950 / 1 week</p>
              </div>
            </Link>
            
            <Link href="/experiences/6" className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1487252665478-49b61b47f302" 
                  alt="Wildlife Rescue & Rehabilitation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">Wildlife Rescue Center</h3>
                <p className="text-gray-400 text-sm mb-2">Costa Rica</p>
                <p className="text-lg font-bold">$1,000 / 2 weeks</p>
              </div>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="/experiences" className="inline-block px-6 py-3 border border-white rounded-lg text-white hover:bg-white hover:text-black transition-colors font-medium">
              Browse All Experiences
            </Link>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </Layout>
  );
}
