import Link from 'next/link';
import React from 'react';

import Footer from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Section, { Band } from '@/components/Section';
import Seo from '@/components/Seo';
import { U } from '@/config/registry';

const CAPABILITIES = [
  'Species identification from camera-trap images with 98% accuracy',
  'Predictive modelling for migration patterns and habitat change',
  'Real-time poaching threat detection and alerting',
  'Ecosystem health monitoring through satellite imagery analysis',
];

const METRICS = [
  { value: '15M+', label: 'Wildlife images analysed' },
  { value: '2,300+', label: 'Species identified and tracked' },
  { value: '87%', label: 'Reduction in response time to threats' },
];

const AREAS = [
  {
    title: 'Computer vision',
    body: 'Image recognition for species identification, behaviour analysis and population counting from drone and camera-trap footage.',
  },
  {
    title: 'Predictive analytics',
    body: 'Models that predict habitat loss, climate impact and migration change, to enable proactive conservation.',
  },
  {
    title: 'Natural language processing',
    body: 'Analysis of research papers, field reports and social media to track conservation trends and identify emerging threats.',
  },
  {
    title: 'Acoustic monitoring',
    body: 'Audio analysis that identifies species by their calls, monitors ecosystem health and detects illegal activity.',
  },
  {
    title: 'Genomic analysis',
    body: 'Machine learning applied to sequencing data to understand genetic diversity and guide breeding programmes.',
  },
  {
    title: 'Ledger integration',
    body: 'Verified wildlife data written to a public ledger, for transparent and tamper-evident conservation records.',
  },
];

const ENDPOINTS = [
  ['POST', '/v1/species/identify'],
  ['POST', '/v1/habitat/analyze'],
  ['GET', '/v1/threats/monitor'],
  ['POST', '/v1/migration/predict'],
  ['POST', '/v1/audio/classify'],
];

export default function AI() {
  return (
    <Layout>
      <Seo
        templateTitle='AI for Conservation'
        description="Zoo Foundation's AI initiatives for wildlife conservation through ZenLM and machine learning"
      />
      <Navbar />

      <section
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBlock: 'clamp(3rem, 8vw, 6rem)',
        }}
      >
        <Band>
          <p className='eyebrow mb-5'>Zoo Labs · applied research</p>
          <h1 className='display mb-6' style={{ maxWidth: '18ch' }}>
            AI for conservation
          </h1>
          <p className='lede' style={{ maxWidth: '42rem' }}>
            Machine learning applied to protecting endangered species — monitoring,
            prediction and the conservation strategies they support.
          </p>
        </Band>
      </section>

      {/* ZenLM */}
      <Section tone='card' edge='block'>
        <div className='grid gap-12 md:grid-cols-2'>
          <div>
            <p className='eyebrow'>Open weights</p>
            <h2 className='title mt-3'>The ZenLM framework</h2>
            <p className='lede mt-4'>
              ZenLM is trained on conservation data, species behaviour and environmental
              factors, and published with its weights so the results can be checked.
            </p>
            <ul className='mt-8 space-y-4'>
              {CAPABILITIES.map((line) => (
                <li
                  key={line}
                  className='pt-4 text-sm leading-relaxed'
                  style={{
                    borderTop: '1px solid var(--border)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className='card h-fit p-8'>
            <h3 className='text-lg font-semibold'>Impact metrics</h3>
            <dl className='mt-6 space-y-6'>
              {METRICS.map((m) => (
                <div key={m.label}>
                  <dt className='sr-only'>{m.label}</dt>
                  <dd className='m-0'>
                    <span className='block text-3xl font-semibold tracking-tight'>
                      {m.value}
                    </span>
                    <span
                      className='mt-1 block text-sm'
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {m.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Research areas */}
      <Section>
        <div className='mb-12 max-w-2xl'>
          <p className='eyebrow'>What the lab works on</p>
          <h2 className='title mt-3'>Research areas</h2>
        </div>
        <div className='grid gap-6 md:grid-cols-3'>
          {AREAS.map((area) => (
            <div key={area.title} className='card p-6'>
              <h3 className='text-lg font-semibold'>{area.title}</h3>
              <p
                className='mt-2 text-sm leading-relaxed'
                style={{ color: 'var(--muted-foreground)' }}
              >
                {area.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* API */}
      <Section tone='card' edge='block'>
        <div className='max-w-2xl'>
          <p className='eyebrow'>For developers</p>
          <h2 className='title mt-3'>Conservation AI API</h2>
          <p className='lede mt-4'>
            The conservation models are reachable at{' '}
            <code
              className='rounded px-1.5 py-0.5 font-mono text-[0.9em]'
              style={{ background: 'var(--muted)' }}
            >
              api.zoo.network
            </code>
            .
          </p>
        </div>

        <div className='card mt-10 max-w-2xl p-8'>
          <h3 className='text-lg font-semibold'>Endpoints</h3>
          <ul className='mt-4 space-y-3 font-mono text-sm'>
            {ENDPOINTS.map(([verb, path]) => (
              <li key={path} className='flex gap-3'>
                <span className='w-12 shrink-0 font-semibold' style={{ color: 'var(--brand)' }}>
                  {verb}
                </span>
                <span style={{ color: 'var(--muted-foreground)' }}>{path}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-8'>
          <Link href='/docs' className='action'>
            API documentation
          </Link>
        </div>
      </Section>

      {/* Take part */}
      <Section edge='top'>
        <div className='max-w-2xl'>
          <p className='eyebrow'>Collaborate</p>
          <h2 className='title mt-3'>Join the AI conservation work</h2>
          <p className='lede mt-4'>
            Partner with us to develop and deploy models that make a measurable difference
            in wildlife conservation.
          </p>
          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <Link href={U.getinvolved} className='action' data-fill=''>
              Get involved
            </Link>
            <a
              href='https://github.com/zooai'
              target='_blank'
              rel='noopener noreferrer'
              className='action'
            >
              View on GitHub <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </Layout>
  );
}
