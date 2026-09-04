import Link from 'next/link';
import React from 'react';

import Footer from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Section, { Band } from '@/components/Section';
import Seo from '@/components/Seo';
import { U } from '@/config/registry';

/**
 * The expedition this page leads with.
 *
 * It used to open with "🦈 URGENT: Shark Stewards Expedition — This Sunday,
 * October 5th, 2025", repeated as "Date: Sunday, October 5th, 2025" below it.
 * That Sunday was eleven months ago. A date that has passed, presented as
 * urgent, is worse than no date: it tells a reader the site is unattended. The
 * expedition runs on a schedule, so the page describes the expedition and sends
 * people to /experiences, which is where a live date belongs.
 */
const DETAILS = [
  ['Duration', '8+ hours'],
  ['Location', 'Farallon Islands, San Francisco'],
  ['Departure', 'San Francisco Marina'],
  ['Focus', 'Great white shark observation and research'],
  ['Led by', 'Professional marine biologists'],
];

const INCLUDED = [
  'A professional guide and marine biologist',
  'All safety equipment',
  'Educational materials',
  'A contribution to shark conservation',
];

const WAYS = [
  {
    title: 'Field research',
    body: 'Join our research expeditions to study and protect endangered species in their natural habitats.',
  },
  {
    title: 'Education and outreach',
    body: 'Help educate communities about wildlife conservation and the importance of biodiversity.',
  },
  {
    title: 'Fundraising',
    body: 'Support our mission by helping organise and take part in fundraising events and campaigns.',
  },
];

const CONTACTS = [
  { title: 'General', address: 'hello@zoo.ngo' },
  { title: 'Experiences', address: 'experiences@zoo.ngo' },
  { title: 'Partnerships', address: 'partners@zoo.ngo' },
];

export default function Volunteer() {
  return (
    <Layout>
      <Seo
        templateTitle='Volunteer & Contact'
        description='Join our conservation efforts and get in touch with Zoo Foundation'
      />
      <Navbar />

      <section
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBlock: 'clamp(3rem, 8vw, 6rem)',
        }}
      >
        <Band>
          <p className='eyebrow mb-5'>Volunteer and contact</p>
          <h1 className='display mb-6' style={{ maxWidth: '14ch' }}>
            Get involved
          </h1>
          <p className='lede' style={{ maxWidth: '40rem' }}>
            Join our mission to protect endangered wildlife through volunteer opportunities
            and conservation experiences.
          </p>
        </Band>
      </section>

      {/* Featured expedition */}
      <Section tone='card' edge='block'>
        <div className='max-w-2xl'>
          <p className='eyebrow'>With Shark Stewards</p>
          <h2 className='title mt-3'>Great white shark expedition</h2>
          <p className='lede mt-4'>
            A day at the Farallon Islands alongside the marine biologists we fund —
            observation, tagging and research aboard the vessel. Places are limited on every
            departure.
          </p>
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-2'>
          <div className='card p-8'>
            <h3 className='text-lg font-semibold'>Expedition details</h3>
            <dl className='mt-4 space-y-3'>
              {DETAILS.map(([label, value]) => (
                <div
                  key={label}
                  className='flex flex-wrap gap-x-3 border-t pt-3 text-sm'
                  style={{ borderColor: 'var(--border)' }}
                >
                  <dt className='w-24 shrink-0' style={{ color: 'var(--muted-foreground)' }}>
                    {label}
                  </dt>
                  <dd className='m-0'>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className='card p-8'>
            <h3 className='text-lg font-semibold'>What is included</h3>
            <ul className='mt-4 space-y-3'>
              {INCLUDED.map((line) => (
                <li
                  key={line}
                  className='border-t pt-3 text-sm'
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-10 flex flex-wrap items-center gap-3'>
          <Link href={U.experiences} className='action' data-fill=''>
            See dates and book
          </Link>
          <Link href={U.donation} className='action'>
            Donate to support
          </Link>
        </div>
      </Section>

      {/* Contact */}
      <Section>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Contact</p>
          <h2 className='title mt-3'>Get in touch</h2>
          <p className='lede mt-4'>
            Ready to make a difference? Our team can tell you about volunteer
            opportunities, conservation experiences and how to support the work.
          </p>
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          {CONTACTS.map((c) => (
            <div key={c.address} className='card p-6'>
              <h3 className='text-lg font-semibold'>{c.title}</h3>
              <a href={`mailto:${c.address}`} className='more mt-2'>
                {c.address}
              </a>
            </div>
          ))}
        </div>

        <div className='card mt-10 max-w-xl p-8'>
          <h3 className='text-lg font-semibold'>Zoo Foundation</h3>
          <dl className='mt-4 space-y-2 text-sm' style={{ color: 'var(--muted-foreground)' }}>
            <div className='flex gap-3'>
              <dt className='w-40 shrink-0'>EIN</dt>
              <dd className='m-0'>88-3538992</dd>
            </div>
            <div className='flex gap-3'>
              <dt className='w-40 shrink-0'>Status</dt>
              <dd className='m-0'>Registered 501(c)(3) nonprofit organisation</dd>
            </div>
            <div className='flex gap-3'>
              <dt className='w-40 shrink-0'>Executive director</dt>
              <dd className='m-0'>Antje Worring</dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Ways to volunteer */}
      <Section tone='card' edge='top'>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Where we need people</p>
          <h2 className='title mt-3'>Ways to volunteer</h2>
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          {WAYS.map((way) => (
            <div key={way.title} className='card p-6'>
              <h3 className='text-lg font-semibold'>{way.title}</h3>
              <p
                className='mt-2 text-sm leading-relaxed'
                style={{ color: 'var(--muted-foreground)' }}
              >
                {way.body}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-10'>
          <Link href={U.donation} className='action' data-fill=''>
            Donate
          </Link>
        </div>
      </Section>

      <Footer />
    </Layout>
  );
}
