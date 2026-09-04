import Link from 'next/link';
import React from 'react';

import Footer from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Section, { Band } from '@/components/Section';
import Seo from '@/components/Seo';
import { U } from '@/config/registry';

/**
 * The three facts about how the foundation works.
 *
 * These were three emoji at 48px — 🌍 🔬 🤝 — carrying the whole weight of the
 * section. An emoji renders as a different picture on every platform and says
 * nothing a reader can act on, so the claim is now the heading and the emoji is
 * gone rather than replaced with an icon we would have had to invent.
 */
const FACTS = [
  {
    title: 'Global impact',
    body: 'Operating in 67 countries across 6 continents.',
  },
  {
    title: 'Science-based',
    body: 'Evidence-driven conservation strategies, published in full.',
  },
  {
    title: 'Community-led',
    body: 'Empowering local communities as the stewards of their own habitats.',
  },
];

const VALUES = [
  {
    title: 'Scientific rigour',
    body: 'Every decision backed by peer-reviewed research and data-driven insight.',
  },
  {
    title: 'Transparency',
    body: 'Public financial reports, annual disclosures and regular impact updates for all donors.',
  },
  {
    title: 'Education',
    body: 'Supporting research and educational programmes that advance conservation science.',
  },
  {
    title: 'Collaboration',
    body: 'Centring indigenous knowledge and empowering local communities.',
  },
];

const APPROACH = [
  {
    title: 'Research support',
    body: 'Supporting scientific research on endangered species and habitat conservation.',
  },
  {
    title: 'Community partnerships',
    body: 'Working with the local communities who protect and steward wildlife habitats.',
  },
  {
    title: 'Transparent operations',
    body: 'Publishing regular reports on how donations support conservation work.',
  },
];

const STORY = [
  'Founded in 2020 during a time of unprecedented environmental crisis, Zoo Foundation emerged from a commitment to support scientific research and field conservation through transparent, community-driven charitable giving.',
  'What started as a small team has grown into a network of conservation partners, research institutions and community supporters worldwide.',
  'We focus on supporting field research, conservation education and the partnerships that protect endangered species and their habitats.',
  'We work to preserve ecosystems, support local communities and create sustainable solutions for wildlife and people to coexist.',
];

const FOCUS = [
  'Protecting endangered species and their habitats.',
  'Supporting conservation research and education.',
  'Partnering with field organisations worldwide.',
];

function Cards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {items.map((item) => (
        <div key={item.title} className='card p-6'>
          <h3 className='text-lg font-semibold'>{item.title}</h3>
          <p
            className='mt-2 text-sm leading-relaxed'
            style={{ color: 'var(--muted-foreground)' }}
          >
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <Layout>
      <Seo
        templateTitle='About Zoo Foundation'
        description="Learn about our mission to protect Earth's wildlife through science, technology, and community action"
      />
      <Navbar />

      <section
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBlock: 'clamp(3rem, 8vw, 6rem)',
        }}
      >
        <Band>
          <p className='eyebrow mb-5'>Zoo Labs Foundation · 501(c)(3)</p>
          <h1 className='display mb-6' style={{ maxWidth: '20ch' }}>
            Protecting wildlife for future generations
          </h1>
          <p className='lede' style={{ maxWidth: '42rem' }}>
            Zoo Foundation is a 501(c)(3) nonprofit dedicated to wildlife conservation
            through research, education and partnerships with field organisations.
          </p>
        </Band>
      </section>

      {/* Mission */}
      <Section tone='card' edge='block'>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Mission</p>
          <h2 className='title mt-3'>Our mission</h2>
          <p className='lede mt-4'>
            We protect Earth’s biodiversity by supporting research, educating communities
            and partnering with conservation organisations.
          </p>
        </div>
        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          {FACTS.map((fact) => (
            <div key={fact.title} className='card p-6'>
              <h3 className='text-lg font-semibold'>{fact.title}</h3>
              <p
                className='mt-2 text-sm leading-relaxed'
                style={{ color: 'var(--muted-foreground)' }}
              >
                {fact.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Story */}
      <Section>
        <div className='max-w-3xl'>
          <p className='eyebrow'>Since 2020</p>
          <h2 className='title mt-3'>Our story</h2>
          <div className='mt-6 space-y-5'>
            {STORY.map((para) => (
              <p key={para.slice(0, 24)} className='lede'>
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone='card' edge='block'>
        <div className='mb-12 max-w-2xl'>
          <p className='eyebrow'>How we work</p>
          <h2 className='title mt-3'>Core values</h2>
        </div>
        <Cards items={VALUES} />
      </Section>

      {/* Focus */}
      <Section>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Where the money goes</p>
          <h2 className='title mt-3'>Our focus</h2>
        </div>
        <ul className='mt-8 max-w-2xl space-y-4'>
          {FOCUS.map((line) => (
            <li
              key={line}
              className='lede m-0 pt-4'
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {line}
            </li>
          ))}
        </ul>
      </Section>

      {/* Approach */}
      <Section tone='card' edge='block'>
        <div className='mb-12 max-w-2xl'>
          <p className='eyebrow'>In practice</p>
          <h2 className='title mt-3'>Our approach</h2>
        </div>
        <div className='grid gap-6 md:grid-cols-3'>
          {APPROACH.map((item) => (
            <div key={item.title} className='card p-6'>
              <h3 className='text-lg font-semibold'>{item.title}</h3>
              <p
                className='mt-2 text-sm leading-relaxed'
                style={{ color: 'var(--muted-foreground)' }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Partners */}
      <Section>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Partners</p>
          <h2 className='title mt-3'>Who we work with</h2>
          <p className='lede mt-4'>
            We collaborate with field conservation organisations to support research and
            protect endangered species.
          </p>
        </div>

        <div className='card mt-10 max-w-2xl p-8'>
          <h3 className='text-xl font-semibold'>Shark Stewards</h3>
          <p className='mt-3 text-sm leading-relaxed' style={{ color: 'var(--muted-foreground)' }}>
            Our primary partner for marine conservation, specialising in shark protection
            and ocean ecosystem research. Together we operate the Farallones Sanctuary
            expeditions and support critical marine research.
          </p>
          <Link href={U.experiences} className='more mt-6'>
            Shark Stewards expeditions <span aria-hidden>→</span>
          </Link>
        </div>

        <div className='mt-10 flex flex-wrap items-center gap-4'>
          <p className='m-0' style={{ color: 'var(--muted-foreground)' }}>
            Interested in partnering with us?
          </p>
          <Link href={U.partners} className='action'>
            Become a partner
          </Link>
        </div>
      </Section>

      {/* Take part */}
      <Section tone='card' edge='top'>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Tax-deductible 501(c)(3)</p>
          <h2 className='title mt-3'>Join the conservation movement</h2>
          <p className='lede mt-4'>
            Whether through donations, volunteering or spreading awareness, everyone can
            make a difference in protecting our planet’s wildlife.
          </p>
          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <Link href={U.donation} className='action' data-fill=''>
              Donate
            </Link>
            <Link href={U.getinvolved} className='action'>
              Get involved
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </Layout>
  );
}
