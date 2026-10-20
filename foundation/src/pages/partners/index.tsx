import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

/**
 * Two partners, because there are two.
 *
 * This page used to name WWF, the Wildlife Conservation Society, the Jane
 * Goodall Institute, Ocean Conservancy, Panthera, IUCN, CITES, Planet Labs,
 * Microsoft and several indigenous councils as partners, under counts — 127
 * organisations, 67 countries, $45M — that came from nowhere. Claiming another
 * organisation's endorsement is theirs to give, and a charity soliciting
 * donations beside the claim is the worst place to get it wrong.
 */

const PARTNERS = [
  {
    name: 'Shark Stewards International',
    hue: 'var(--blue)',
    body: 'Shark conservation through research, education and policy advocacy. We work together on marine habitat protection.',
    href: 'https://sharkstewards.org',
  },
  {
    name: 'NVIDIA',
    hue: 'var(--green)',
    body: 'Compute for training and evaluating the open Zen models, and for the conservation research that runs on them.',
    href: 'https://nvidia.com',
  },
];

export default function Partners() {
  return (
    <Layout>
      <Seo
        templateTitle="Partners"
        description="The organisations Zoo Labs Foundation works with."
      />
      <Navbar />

      <section className="container py-24">
        <h1 className="text-5xl md:text-7xl font-black">Partners</h1>
        <p className="mt-6 text-lg text-secondary" style={{ maxWidth: '58ch' }}>
          The organisations we actually work with. If you would like to be one of them,
          the research is open and the door is too.
        </p>

        <div className="grid-cards" style={{ marginTop: 'var(--space-10)' }}>
          {PARTNERS.map((partner) => (
            <article
              key={partner.name}
              className="card p-6"
              style={{ borderLeft: `10px solid ${partner.hue}` }}
            >
              <h2 className="text-2xl font-bold">{partner.name}</h2>
              <p className="mt-3 text-secondary">{partner.body}</p>
              <a
                href={partner.href}
                className="mt-4 inline-flex font-bold"
              >
                Visit →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-24">
        <div className="card p-8 flex flex-wrap items-center justify-between gap-6">
          <div style={{ maxWidth: '52ch' }}>
            <h2 className="text-2xl md:text-3xl font-black">Work with us</h2>
            <p className="mt-3 text-secondary">
              We publish everything, so collaborating starts with reading it. Tell us what
              you are working on and where our research or models would help.
            </p>
          </div>
          <Link href="/getinvolved" className="action" data-fill>
            Get in touch
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
