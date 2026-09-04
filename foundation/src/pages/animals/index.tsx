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
import { Band } from '@/components/Section';

export default function CollectPage() {
  return (
    <Layout>
        <Seo />
        <Navbar />
        <section
          style={{
            borderBottom: '1px solid var(--border)',
            paddingBlock: 'clamp(3rem, 8vw, 6rem)',
          }}
        >
          <Band>
            <div className='grid items-center gap-12 lg:grid-cols-12'>
              <div className='lg:col-span-7'>
                <p className='eyebrow mb-5'>Endangered wildlife sanctuary</p>
                <h1 className='display mb-6' style={{ maxWidth: '16ch' }}>
                  Our supported animals
                </h1>
                <p className='lede' style={{ maxWidth: '38rem' }}>
                  The endangered species we protect through conservation science,
                  sanctuaries and education — each with its own programme and field
                  partners.
                </p>
              </div>
              <div className='lg:col-span-5'>
                <Globe />
              </div>
            </div>
          </Band>
        </section>
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
