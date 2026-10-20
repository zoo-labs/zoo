import React, { useState } from 'react';
import Link from 'next/link';

/**
 * One species, held up.
 *
 * This was two copies of itself — a desktop block marked `max-md:hidden` and a
 * phone block marked `hidden max-md:block`. Neither variant exists in the
 * stylesheet, so the browser read `hidden` on the phone copy at every width and
 * nothing at all on the desktop copy: one block was permanently invisible and
 * the other was permanently on, phone included. One block, one grid, and it
 * folds by itself.
 *
 * It is a photograph, not a model. The model had no width the stylesheet
 * recognized, so it collapsed to a viewer's intrinsic default and sat as a
 * small animal against the left edge of the page — and a WebGL canvas is a
 * strange thing to make an editorial block wait on. The twins are on the
 * species pages, where turning one around is the point.
 */
export default function Detail() {
  const [there, setThere] = useState(true);

  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
      >
        <div className='plate' style={{ aspectRatio: '1 / 1', width: '100%' }}>
          {there && (
            <img
              src='/images/red_wolf.png'
              alt='A red wolf, photographed at night'
              width={800}
              height={800}
              decoding='async'
              onError={() => setThere(false)}
            />
          )}
        </div>

        <div>
          <span className='pill eyebrow'>Endangered species we support</span>
          <h2 className='mt-5 text-3xl md:text-4xl font-bold'>The red wolf</h2>
          {/* The only claim here is the range, which is the one the globe on
              this page already marks. A population figure would be a number
              this site cannot point at. */}
          <p className='mt-4 text-secondary' style={{ maxWidth: '44ch' }}>
            The last wild red wolves live on the Albemarle Peninsula in North Carolina. Be an
            indispensable part of the work to keep them there.
          </p>

          <div className='mt-8 flex flex-wrap gap-3'>
            <Link
              href='/animals/red_wolf'
              className='action'
              data-fill
              style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
            >
              Read about the red wolf
            </Link>
            <Link href='/getinvolved#volunteer' className='action'>
              Volunteer
            </Link>
            <Link href='/donation' className='action'>
              Donate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
