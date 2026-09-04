import Link from 'next/link';
import { useState } from 'react';

import Section from '@/components/Section';
import { U } from '@/config/registry';

const TIERS = [
  {
    amount: '$50',
    body: 'Goes towards planting native species and restoring habitats and water sources.',
  },
  {
    amount: '$100',
    body: 'Funds staff and volunteers working hands-on to protect and care for endangered animals.',
  },
];

/**
 * The donation tiers.
 *
 * This block used to be the hard black cut two thirds of the way down
 * /animals — the page ran light to about y=3300 and then dropped into a
 * `bg-black` band. It is now one era with the rest of the page.
 */
function Donation() {
  const [custom, setCustom] = useState('');

  return (
    <Section tone='card' edge='block'>
      <div className='max-w-2xl'>
        <p className='eyebrow'>Fuel conservation impact</p>
        <h2 className='title mt-3'>Select your donation</h2>
      </div>

      <div className='mt-12 grid gap-6 md:grid-cols-3'>
        {TIERS.map((tier) => (
          <div key={tier.amount} className='card flex flex-col justify-between gap-6 p-6'>
            <div>
              <p className='text-3xl font-semibold tracking-tight'>{tier.amount}</p>
              <p
                className='mt-3 text-sm leading-relaxed'
                style={{ color: 'var(--muted-foreground)' }}
              >
                {tier.body}
              </p>
            </div>
            <Link href={U.donation} className='action self-start' data-fill=''>
              Donate {tier.amount}
            </Link>
          </div>
        ))}

        <div className='card flex flex-col justify-between gap-6 p-6'>
          <div>
            <p className='text-3xl font-semibold tracking-tight'>Custom</p>
            <p
              className='mt-3 text-sm leading-relaxed'
              style={{ color: 'var(--muted-foreground)' }}
            >
              70% of your donation funds programme activities; 30% goes towards fundraising
              and administration.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <label className='sr-only' htmlFor='custom-amount'>
              Donation amount in dollars
            </label>
            <div
              className='flex flex-1 items-center gap-1 rounded-full border px-4 py-2.5'
              style={{ borderColor: 'var(--input)' }}
            >
              <span style={{ color: 'var(--muted-foreground)' }}>$</span>
              <input
                id='custom-amount'
                inputMode='decimal'
                className='w-full bg-transparent text-sm outline-none'
                placeholder='Amount'
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
            </div>
            <Link href={U.donation} className='action shrink-0'>
              Give
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Donation;
