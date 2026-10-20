import React, { useState } from 'react';
import Link from 'next/link';
import { Bitcoin, HandCoins, RadioTower } from 'lucide-react';
import Away from '@/components/Away';

/**
 * The ask.
 *
 * The three buttons were labelled with emoji — 💵 ₿ 📡 — which the site draws
 * nowhere else and which render as a different picture on every platform. They
 * are line icons from the set the home page already uses, at the size the home
 * page sets them.
 *
 * The film is a hippo shot against black. It sat in a square-cornered box with
 * a `bg-black/40` behind it, so the black of the footage met the paper at a
 * hard edge and read as a hole in the page. `.plate` is the site's answer to
 * "somewhere for a photograph to be": it rounds the corner, crops with
 * object-fit, and stands on deep water, so the dark in the film belongs to the
 * plate. If the file ever goes missing what is left is the plate, not a broken
 * player.
 */
export default function Header() {
  const [film, setFilm] = useState(true);

  return (
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
          <span className='pill eyebrow'>501(c)(3) non-profit &bull; EIN 88-3538992</span>

          <h1 className='mt-6'>Support sanctuaries, and the science.</h1>

          <p className='mt-6 text-lg text-secondary' style={{ maxWidth: '46ch' }}>
            We fund frontline animal care, wildlife reserve maintenance, anti-poaching field
            equipment, and open-source foundation research. Every one of those is a thing you can go
            and look at.
          </p>

          <div className='mt-8 flex flex-wrap gap-3'>
            <a
              href='https://www.paypal.biz/zoongo'
              target='_blank'
              rel='noopener noreferrer'
              className='action'
              data-fill
              style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
            >
              <HandCoins size={18} strokeWidth={1.75} aria-hidden />
              Donate via PayPal
              <Away />
            </a>
            <Link href='/donation/crypto' className='action'>
              <Bitcoin size={18} strokeWidth={1.75} aria-hidden />
              Donate crypto
            </Link>
            <Link href='/coin' className='action'>
              <RadioTower size={18} strokeWidth={1.75} aria-hidden />
              Sponsor a sensor node
            </Link>
          </div>
        </div>

        <div className='plate' style={{ aspectRatio: '1 / 1', width: '100%' }}>
          {film && (
            <video
              autoPlay
              loop
              muted
              playsInline
              onError={() => setFilm(false)}
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src='/videos/pygmy_flower.mp4' type='video/mp4' />
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
