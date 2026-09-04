import Link from 'next/link';
import React from 'react';

import Photo from '@/components/Photo';
import { Band } from '@/components/Section';

/**
 * The donation hero.
 *
 * The three primary controls used to be labelled with emoji — 💵 Donate Cash,
 * ₿ Donate Crypto, 🌿 Healing Farm — and the eyebrow above them opened with 🆘.
 * A pictograph is not a word: it renders differently on every platform, a
 * screen reader announces it as "money with wings", and none of the four says
 * anything the label beside it does not already say. The words are the labels.
 */
function Header() {
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
            <p className='eyebrow mb-5'>End the road to extinction</p>
            <h1 className='display mb-6' style={{ maxWidth: '18ch' }}>
              Donate to the Zoo Labs Foundation
            </h1>
            <p className='lede mb-8' style={{ maxWidth: '40rem' }}>
              It is our driving purpose to deepen the connection humans have with animals
              by creating sustainable sanctuaries for endangered species — shared with
              local visitors and educators, and open to the community. You could save a
              life today with a monthly donation or a one-time contribution.
            </p>

            <div className='flex flex-wrap items-center gap-3'>
              <a
                href='https://www.paypal.biz/zoongo'
                target='_blank'
                rel='noopener noreferrer'
                className='action'
                data-fill=''
              >
                Donate cash
              </a>
              <Link href='/donation/crypto' className='action'>
                Donate crypto
              </Link>
              <Link href='/donation/farm' className='action'>
                Healing farm
              </Link>
            </div>

            <a
              href='https://zoo.fund'
              target='_blank'
              rel='noopener noreferrer'
              className='more mt-6'
            >
              Crowdfund via the DAO <span aria-hidden>↗</span>
            </a>
          </div>

          <div className='lg:col-span-5'>
            {/* `/videos/pygmy_flower.mp4` was never in the repository — there is
              * no `public/videos` directory at all — so this column played
              * nothing and showed a black rectangle. `donation_header.png` is
              * the still the markup already named, in a comment, beside it. */}
            <Photo
              src='/images/donation_header.png'
              alt='A pygmy hippo, one of the species the foundation supports'
              ratio='1 / 1'
              loading='eager'
              plate
              className='mx-auto max-w-md lg:max-w-none'
            />
          </div>
        </div>
      </Band>
    </section>
  );
}

export default Header;
