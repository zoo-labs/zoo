import React from 'react';
import { Download } from 'lucide-react';

/**
 * Run your own.
 *
 * The control here was `bg-white … border border-white … text-black`: a white
 * pill, a white edge, on the near-white ground. It was legible only by its
 * text. It is an `.action` now, which is the site's one control — 44px, a
 * hairline that exists, and a pill radius stated once in the stylesheet.
 *
 * The line above the head read "Bring your community TO the Zoo foundation".
 * That capital TO is the only word shouting on the page and it is a preposition.
 */
export default function Campaign() {
  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div className='text-center mx-auto' style={{ maxWidth: '58ch' }}>
        <span className='pill eyebrow'>Bring your community to the foundation</span>
        <h2 className='mt-5 text-3xl md:text-4xl font-bold'>Create your own campaign</h2>
        <p className='mt-4 text-secondary'>
          A self-tailored campaign to raise funds for these animals by leaning on your own network.
          The guidebook is the whole method, and it is a download, not a sign-up.
        </p>
        <a
          href='/guidebook.pdf'
          download='zoo-campaign-guidebook.pdf'
          className='action mt-8'
          style={{ marginInline: 'auto' }}
        >
          <Download size={18} strokeWidth={1.75} aria-hidden />
          Download the guide
        </a>
      </div>
    </section>
  );
}
