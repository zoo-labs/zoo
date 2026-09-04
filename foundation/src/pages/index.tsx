import Link from 'next/link';
import React from 'react';

import AnimalDetail from '@/components/animal/Detail';
import AnimalItems from '@/components/animal/Item';
import Comment from '@/components/Comment';
import Footer from '@/components/Footer';
import Intro from '@/components/intro/Intro';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Principles from '@/components/Principles';
import Seo from '@/components/Seo';
import { U } from '@/config/registry';

/** What the lab builds. Data, so the grid cannot disagree with itself. */
const WORK = [
  {
    id: 'bioacoustics',
    title: 'Marine bioacoustics',
    body: 'Decoding beluga vocalisations, dolphin clicks and cetacean communication with open acoustic models, published with their weights.',
    label: 'Open weights',
    href: U.models,
    external: true,
  },
  {
    id: 'vision',
    title: 'Anti-poaching vision',
    body: 'Edge computer vision that runs on a camera trap rather than a datacentre, so a ranger station with no uplink still gets an alert.',
    label: 'Read the papers',
    href: U.papers,
    external: true,
  },
  {
    id: 'desci',
    title: 'Open grants',
    body: 'Proof-of-conservation telemetry and transparent grant-making, so where a donation went is a matter of public record.',
    label: 'Zoo Fund',
    href: U.fund,
    external: true,
  },
];

/** How to take part. */
const SUPPORT = [
  {
    id: 'give',
    title: 'Give',
    body: 'Funds field collars, anti-poaching patrols, veterinary medicine and food for the sanctuaries we work with.',
    label: 'Donate',
    href: U.donation,
  },
  {
    id: 'partner',
    title: 'Partner',
    body: 'Work with us as a research institution, university department or conservation trust.',
    label: 'Partner with us',
    href: U.partners,
  },
  {
    id: 'build',
    title: 'Build',
    body: 'Use the datasets, fine-tune the models, or contribute to the bioacoustic work at the lab.',
    label: 'Zoo Labs',
    href: U.labs,
    external: true,
  },
];

const BAND = { maxWidth: 1280, paddingInline: 'var(--page-gutter)' } as const;

function Cards({
  items,
}: {
  items: { id: string; title: string; body: string; label: string; href: string; external?: boolean }[];
}) {
  return (
    <div className='mt-12 grid gap-6 md:grid-cols-3'>
      {items.map((item) => (
        <div key={item.id} className='card flex flex-col justify-between gap-6 p-6'>
          <div>
            <h3 className='text-lg font-semibold'>{item.title}</h3>
            <p className='mt-2 text-sm leading-relaxed' style={{ color: 'var(--muted-foreground)' }}>
              {item.body}
            </p>
          </div>
          <Link
            href={item.href}
            className='more'
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {item.label} <span aria-hidden>{item.external ? '↗' : '→'}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <Seo />
      <Navbar />

      <Intro
        breadcrumbs='Zoo Labs Foundation · 501(c)(3)'
        title='Preserve'
        comment='Wildlife biodiversity, through open research, education and conservation work that anyone can read, check and build on.'
      />

      <Comment />
      <Principles />
      <AnimalDetail />
      <AnimalItems />

      {/* What we publish. The lab is the loudest link on the page. */}
      <section
        style={{
          background: 'var(--surface-card)',
          borderBlock: '1px solid var(--border)',
          paddingBlock: 'clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div className='mx-auto' style={BAND}>
          <div className='max-w-2xl'>
            <p className='eyebrow'>Open science</p>
            <h2 className='title mt-3'>Conservation research, published in full</h2>
            <p className='lede mt-4'>
              Zoo Labs is our applied research lab. It builds open foundational models,
              real-time bioacoustic interpreters and marine intelligence — and publishes
              the weights, not just the results.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <a href={U.labs} target='_blank' rel='noopener noreferrer' className='action' data-fill=''>
                Visit Zoo Labs <span aria-hidden>↗</span>
              </a>
              <Link href={U.research} className='action'>
                Read the research
              </Link>
            </div>
          </div>
          <Cards items={WORK} />
        </div>
      </section>

      {/* Field work. */}
      <section style={{ paddingBlock: 'clamp(4rem, 8vw, 6rem)' }}>
        <div className='mx-auto' style={BAND}>
          <div className='max-w-2xl'>
            <p className='eyebrow'>Field expeditions</p>
            <h2 className='title mt-3'>See the work being done</h2>
            <p className='lede mt-4'>
              Hands-on expeditions and sanctuary placements alongside the marine biologists
              and rangers we fund.
            </p>
          </div>

          <div className='mt-12 grid gap-6 md:grid-cols-3'>
            {[
              {
                id: '1',
                place: 'Farallon Islands, San Francisco',
                title: 'Great white shark expedition',
                body: 'Tagging and observation alongside marine biologists, with underwater telemetry.',
                price: '$75,000',
                unit: '20 guests',
                img: '/images/volunteer-experiences/luxury-yacht-shark-breach.jpg',
              },
              {
                id: '7',
                place: 'Farallon Islands, San Francisco',
                title: 'Intimate shark encounter',
                body: 'Conservation training and cage observation for two.',
                price: '$2,500',
                unit: '2 guests',
                img: '/images/volunteer-experiences/intimate-shark-two.jpg',
              },
              {
                id: '8',
                place: 'Farallon Islands, San Francisco',
                title: 'Research vessel voyage',
                body: 'A full day aboard the research vessel, capturing drone and hydrophone data.',
                price: '$3,500',
                unit: 'per expedition',
                img: '/images/volunteer-experiences/modular-shark-adventure.jpg',
              },
            ].map((x) => (
              <Link key={x.id} href={`/experiences/${x.id}`} className='card group overflow-hidden'>
                <div className='aspect-video overflow-hidden' style={{ background: 'var(--muted)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={x.img}
                    alt=''
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
                <div className='p-6'>
                  <p className='text-[13px]' style={{ color: 'var(--muted-foreground)' }}>
                    {x.place}
                  </p>
                  <h3 className='mt-1 text-lg font-semibold'>{x.title}</h3>
                  <p className='mt-2 text-sm' style={{ color: 'var(--muted-foreground)' }}>
                    {x.body}
                  </p>
                  <p className='mt-4 text-base font-semibold'>
                    {x.price}{' '}
                    <span className='font-normal' style={{ color: 'var(--muted-foreground)' }}>
                      / {x.unit}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className='mt-10'>
            <Link href={U.experiences} className='action'>
              All expeditions
            </Link>
          </div>
        </div>
      </section>

      {/* Take part. */}
      <section
        style={{
          background: 'var(--surface-card)',
          borderTop: '1px solid var(--border)',
          paddingBlock: 'clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div className='mx-auto' style={BAND}>
          <div className='max-w-2xl'>
            <p className='eyebrow'>Tax-deductible 501(c)(3)</p>
            <h2 className='title mt-3'>Take part</h2>
            <p className='lede mt-4'>
              Give, partner or build. Every donation is tax-deductible to the extent allowed
              by law, and every grant we make is on the public record.
            </p>
          </div>
          <Cards items={SUPPORT} />
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
