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
                  src="/images/volunteer-experiences/sharks.jpg"
                  alt="Ultimate Luxury Great White Shark Expedition"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">Ultimate Luxury Great White Shark Expedition (20 Guests)</h3>
                <p className="text-gray-400 text-sm mb-2">Farallone Islands, San Francisco, USA</p>
                <p className="text-lg font-bold">$75,000 / group expedition</p>
              </div>
            </Link>
            
            <Link href="/experiences/7" className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="/images/volunteer-experiences/intimate-shark-diving.jpg"
                  alt="Intimate Great White Shark Encounter"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">Intimate Great White Shark Encounter (2 Guests)</h3>
                <p className="text-gray-400 text-sm mb-2">Farallone Islands, San Francisco, USA</p>
                <p className="text-lg font-bold">$2,500 / intimate experience</p>
              </div>
            </Link>
            
            <Link href="/experiences/8" className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="/images/volunteer-experiences/premium-shark-expedition.jpg"
                  alt="Premium Great White Shark Expedition"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">Premium Great White Shark Expedition</h3>
                <p className="text-gray-400 text-sm mb-2">Farallone Islands, San Francisco, USA</p>
                <p className="text-lg font-bold">$3,500 / expedition</p>
              </div>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="/experiences" className="inline-block bg-white hover:bg-black hover:text-white border border-white px-6 py-3 rounded-lg text-black font-medium transition-colors">
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
