import axios from 'axios';
import Link from 'next/link';
import React from 'react';

import { useStripe } from '@stripe/react-stripe-js';

import animals from '@/components/animals/animals.json';
import Photo from '@/components/Photo';
import { Band } from '@/components/Section';

/**
 * The species hero.
 *
 * It used to be a flip card holding two videos — `card_front` / `card_back`,
 * both under `/videos/` — and there is no `public/videos` directory, in this
 * repo or on the host. So the hero of all seven species pages was a black
 * rectangle with a flip button that turned one absent video into another. The
 * still render under `public/images` does exist, so the hero shows that.
 *
 * The species switcher reads `animals.json`, the same file the route table and
 * the page body read, so a species cannot be listed here and be unreachable.
 */
function Header({
  title,
  content,
  image,
  route,
}: {
  content: string;
  title: string;
  image: string;
  route: string;
}) {
  const stripe = useStripe();

  const buyCard = async () => {
    const { data } = await axios.get(`/api/buy_card/${route}`);
    await stripe!.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <section
      style={{
        borderBottom: '1px solid var(--border)',
        paddingBlock: 'clamp(3rem, 8vw, 6rem)',
      }}
    >
      <Band>
        <div className='grid items-center gap-12 lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <p className='eyebrow mb-5'>Endangered species</p>
            <h1 className='display mb-6'>{title}</h1>
            <p
              className='lede mb-8'
              style={{ maxWidth: '38rem' }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className='flex flex-wrap items-center gap-3'>
              <button type='button' onClick={buyCard} className='action' data-fill=''>
                Buy the card — $25
              </button>
              <Link href='/donation' className='action'>
                Donate
              </Link>
            </div>
          </div>
          <div className='lg:col-span-5'>
            <Photo
              src={image}
              alt={`A ${title}`}
              ratio='1 / 1'
              loading='eager'
              plate
              className='mx-auto max-w-md lg:max-w-none'
            />
          </div>
        </div>

        <nav
          className='mt-12 flex flex-wrap gap-2 pt-8'
          style={{ borderTop: '1px solid var(--border)' }}
          aria-label='Species'
        >
          {animals.map((a) => {
            const active = a.name === title;
            return (
              <Link
                key={a.route}
                href={`/animals/${a.route}`}
                className='pill'
                aria-current={active ? 'page' : undefined}
                style={
                  active
                    ? {
                        background: 'var(--brand)',
                        color: 'var(--brand-foreground)',
                        borderColor: 'transparent',
                      }
                    : undefined
                }
              >
                {a.name}
              </Link>
            );
          })}
        </nav>
      </Band>
    </section>
  );
}

export default Header;
