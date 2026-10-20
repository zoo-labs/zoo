import * as React from 'react';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Animal_Item from '@/components/animal/Detail';
import Donation from '@/components/Donation';
import Volunteer from '@/components/Volunteer';
import Campaign from '@/components/Campaign';
import Aiding from '@/components/Aiding';
import Globe from '@/components/WrapGlobe';
import animals from '@/components/animals/animals.json';

/**
 * The species we support.
 *
 * The grid used to live inside the avatar component, which meant two different
 * things — "the species this foundation supports" and "the three ages of one
 * animal" — were the same code with a boolean between them, and neither could
 * be right. The list is here now, and it is read from animals.json, which is
 * already what the species pages and getStaticPaths read. A species is added by
 * adding it there, once.
 *
 * Each one is a photograph in a `.plate`. The 3D models the grid used to mount
 * never painted a frame here — six model-viewers on one page, each with an
 * aspect class the stylesheet does not define — so the page carried six
 * captions over roughly 700px of nothing. Every one of these stills exists in
 * public/images, and the plate is what is left if one ever does not.
 */

function Species() {
  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div className='text-center mx-auto' style={{ maxWidth: '58ch' }}>
        <h2 className='text-3xl md:text-4xl font-bold'>Every species we support</h2>
        {/* Counted from the list it is standing next to, so the sentence cannot
            disagree with the grid under it. */}
        <p className='mt-4 text-secondary'>
          {animals.length} endangered animals, each with a digital twin you can turn around, and a
          page on what threatens it.
        </p>
      </div>

      <div className='mt-12 grid-cards'>
        {animals.map((a) => (
          <Link
            key={a.route}
            href={`/animals/${a.route}`}
            className='card p-4 flex flex-col'
            style={{ background: '#ffffff' }}
          >
            <Plate src={a.image} alt={a.name} />
            <span className='mt-4 mb-1 px-2 flex items-center justify-between gap-2 font-medium'>
              {a.name}
              <ChevronRight />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** One photograph, or the plate it would have been on. Never a broken glyph. */
function Plate({ src, alt }: { src: string; alt: string }) {
  const [there, setThere] = React.useState(true);
  return (
    <span className='plate' style={{ display: 'block', aspectRatio: '1 / 1', width: '100%' }}>
      {there && (
        <img src={src} alt={alt} decoding='async' onError={() => setThere(false)} />
      )}
    </span>
  );
}

function ChevronRight() {
  return (
    <svg width='6' height='11' viewBox='0 0 6 11' fill='none' aria-hidden>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z'
        fill='currentColor'
      />
    </svg>
  );
}

export default function AnimalsPage() {
  return (
    <Layout>
      <Seo
        templateTitle='Supported animals'
        description='The endangered species Zoo Labs Foundation supports, each with a digital twin and a page on what threatens it.'
      />
      <Navbar />

      <section className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-12)',
            alignItems: 'center',
          }}
        >
          <div>
            <span className='pill eyebrow'>Endangered species we support</span>
            <h1 className='mt-6'>Our supported animals</h1>
            <p className='mt-6 text-lg text-secondary' style={{ maxWidth: '46ch' }}>
              Learn about the endangered species we protect through conservation work and
              education. The globe marks where each one still lives.
            </p>
          </div>

          <Globe />
        </div>
      </section>

      <Aiding />
      <Animal_Item />
      <Species />
      <Donation />
      <Volunteer />
      <Campaign />
      <Newsletter />
      <Footer />
    </Layout>
  );
}
