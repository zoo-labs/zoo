import React from 'react';
import Link from 'next/link';

/**
 * Three ways in.
 *
 * The cards were `aspect-square w-1/3 border rounded-xl border-white` — a white
 * edge on a near-white ground, squared off by an aspect class the stylesheet
 * does not define, with the arrow glyphs drawn `fill="white"` and therefore
 * invisible. They are `.card`, which is the one surface this site has.
 *
 * "fundaraising" was in the third card's copy.
 */

const TIERS = [
  {
    amount: '$50',
    body: 'Goes towards planting native species and restoring habitats and water sources.',
  },
  {
    amount: '$100',
    body: 'Funds staff and volunteers working hands-on to protect and care for endangered animals.',
  },
  {
    amount: 'Any amount',
    body: '70% of your donation funds program activities, and 30% goes towards fundraising and admin.',
  },
];

export default function Donation() {
  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div className='text-center mx-auto' style={{ maxWidth: '58ch' }}>
        <span className='pill eyebrow'>Fuel conservation impact</span>
        <h2 className='mt-5 text-3xl md:text-4xl font-bold'>Select your donation</h2>
      </div>

      <div className='mt-12 grid-cards'>
        {TIERS.map((t) => (
          <article
            key={t.amount}
            className='card p-8 flex flex-col'
            style={{ background: '#ffffff' }}
          >
            <p className='text-2xl md:text-3xl font-bold'>{t.amount}</p>
            <p className='mt-3 text-secondary flex-1'>{t.body}</p>
            <Link
              href='/donation'
              className='action mt-6'
              style={{ alignSelf: 'flex-start' }}
            >
              Donate
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
