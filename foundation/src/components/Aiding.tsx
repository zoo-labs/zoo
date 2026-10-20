import React from 'react';

/**
 * Why there are 3D animals on a conservation site at all.
 *
 * The section used to reach for `md:py-32`, `lg:py-52`, `xl:px-64` and
 * `w-1/2` — Tailwind names this build does not answer — so it had neither the
 * padding nor the columns it was written for, and the two paragraphs ran the
 * full width under a centred head. It is the section rhythm and the container
 * every other band on the site is on.
 *
 * The phone-only campaign card that used to hang off the bottom is gone. It was
 * marked `hidden max-md:flex`, a variant the stylesheet does not define, so it
 * never drew at any width; and it advertised "$7,379 of $12,400" and "3,274
 * donators" against `href='#'`. A charity does not publish a total it cannot
 * point at, least of all next to a link that goes nowhere.
 */
export default function Aiding() {
  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <h2 className='text-3xl md:text-4xl font-bold text-center mx-auto' style={{ maxWidth: '20ch' }}>
        Aiding species with digital twins
      </h2>

      <div
        className='mt-12'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-8)',
        }}
      >
        <p className='text-secondary'>
          Our work is paid for by philanthropic donations and by the proceeds from our virtual
          animals and trading cards.
        </p>
        <p className='text-secondary'>
          We are building content for children and adults alike: interactive experiences with the
          Zoo animals, aimed at lasting impact and at raising awareness.
        </p>
      </div>
    </section>
  );
}
