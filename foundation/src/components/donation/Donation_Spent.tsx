import React from 'react';
import Link from 'next/link';
import { Cpu, FlaskConical, PawPrint, ShieldCheck } from 'lucide-react';
import Away from '@/components/Away';
import { useCorpus, type Counts } from '@/config/corpus';

/**
 * Where the money goes.
 *
 * These three used to be drawn on `--surface-card`, a token @hanzo/design
 * publishes at `:root` for its DARK theme — rgb(38 38 38 / .5). This site never
 * mounts the light class, so the recipe resolved dark on a light page and the
 * cards came out as grey slabs carrying the ink colour: 2.54:1 on the body copy,
 * 2.95:1 on the heading. One card also read `--surface-card-emphasis` because a
 * click "selected" it, which is why three identical cards were three different
 * greys.
 *
 * They are `.card` now — the same rule the home page's three cards use — and the
 * selection is gone with them. It set a colour and nothing else: a div with an
 * onClick, no role, no key handler, and no consequence.
 */

/** A custom property, typed. --hue is what a card is coloured with. */
const hue = (value: string) => ({ ['--hue']: value }) as React.CSSProperties;

const areas = (corpus: Counts) => [
  {
    icon: PawPrint,
    hue: 'var(--green)',
    tag: 'Field operations',
    title: 'Sanctuary and rescue',
    body: 'Veterinary care, anti-poaching patrol equipment, sanctuary habitat construction, and rescue missions for wildlife worldwide.',
  },
  {
    icon: Cpu,
    hue: 'var(--blue)',
    tag: 'Open infrastructure',
    title: 'Compute and Zoo Gym',
    body: 'The distributed GPU training framework, Zoo Gym (TF-GRPO), and open mining protocols that put AI alignment work within reach of public science.',
  },
  {
    icon: FlaskConical,
    hue: 'var(--pink)',
    tag: 'Open science',
    title: 'Research and publication',
    body: `${corpus.papers} papers, ${corpus.proposals} improvement proposals and every model weight, published open access and free to read.`,
  },
];

export default function Donation_Spent() {
  const corpus = useCorpus();
  const AREAS = areas(corpus);
  return (
    <section className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
      <div style={{ maxWidth: '58ch' }}>
        <span className='pill eyebrow'>Direct charitable giving</span>
        <h2 className='mt-5 text-3xl md:text-4xl font-bold'>Where your support goes</h2>
        <p className='mt-4 text-secondary'>
          Every contribution goes to wildlife care, habitat protection and open-access research.
          Nothing here is a projection — it is what the money is spent on.
        </p>
      </div>

      <div className='mt-12 grid-cards'>
        {AREAS.map(({ icon: Icon, ...a }) => (
          <article
            key={a.title}
            className='card p-8 flex flex-col'
            style={{ ...hue(a.hue), background: '#ffffff' }}
          >
            <div className='flex items-center justify-between gap-4'>
              <span className='disc'>
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <span className='tint'>{a.tag}</span>
            </div>
            <h3 className='mt-5 text-xl font-semibold'>{a.title}</h3>
            <p className='mt-3 text-secondary flex-1'>{a.body}</p>
          </article>
        ))}
      </div>

      <div
        className='card p-8 mt-12'
        style={{
          ...hue('var(--blue)'),
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-8)',
          alignItems: 'center',
          background: 'color-mix(in oklab, var(--blue) 7%, #ffffff)',
          borderColor: 'color-mix(in oklab, var(--blue) 18%, transparent)',
        }}
      >
        <div>
          <span className='disc' data-outline>
            <ShieldCheck size={20} strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className='mt-5 text-xl font-semibold'>Tax-deductible 501(c)(3) giving</h3>
          <p className='mt-3 text-secondary' style={{ maxWidth: '52ch' }}>
            Zoo Labs Foundation is a recognized 501(c)(3) public charity, EIN 88-3538992. Donations
            are tax-deductible to the fullest extent the law permits.
          </p>
        </div>

        <div className='flex flex-wrap gap-3' style={{ justifySelf: 'start' }}>
          <a
            href='https://www.paypal.biz/zoongo'
            target='_blank'
            rel='noopener noreferrer'
            className='action'
            data-fill
            style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
          >
            Give today
            <Away />
          </a>
          <Link href='/donation/crypto' className='action'>
            Give in crypto
          </Link>
        </div>
      </div>
    </section>
  );
}
