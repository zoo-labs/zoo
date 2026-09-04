import Link from 'next/link';

import { U } from '@/config/registry';

const PRINCIPLES = [
  {
    id: 'conservation',
    title: 'Conservation in the field',
    desc: 'Protecting endangered fauna and the wilderness they need, through hands-on field work with local partners.',
  },
  {
    id: 'education',
    title: 'Teaching with the work',
    desc: 'Models, expeditions and research published so students and teachers can use them without asking us.',
  },
  {
    id: 'sensing',
    title: 'Ecological AI and sensors',
    desc: 'Bioacoustic monitoring, satellite tracking and edge computer vision, deployed where poaching happens.',
  },
  {
    id: 'community',
    title: 'Community-led stewardship',
    desc: 'Working directly with indigenous populations and the sanctuaries already doing the work.',
  },
  {
    id: 'coexistence',
    title: 'Coexistence, not exclusion',
    desc: 'Wildlife corridors and regenerative ecosystems that people and animals share.',
  },
];

function Principles() {
  return (
    <section
      style={{
        borderBottom: '1px solid var(--border)',
        paddingBlock: 'clamp(4rem, 8vw, 6rem)',
      }}
    >
      <div className='mx-auto' style={{ maxWidth: 1280, paddingInline: 'var(--page-gutter)' }}>
        <div className='max-w-2xl'>
          <p className='eyebrow'>What we stand for</p>
          <h2 className='title mt-3'>The principles that drive us</h2>
          <p className='lede mt-4'>
            A research foundation of animal lovers, families, scientists and AI
            researchers — with everything it makes in public.
          </p>
        </div>

        <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {PRINCIPLES.map((p) => (
            <div key={p.id} className='card p-6'>
              <h3 className='text-lg font-semibold'>{p.title}</h3>
              <p
                className='mt-2 text-sm leading-relaxed'
                style={{ color: 'var(--muted-foreground)' }}
              >
                {p.desc}
              </p>
            </div>
          ))}

          {/* The one place on the page that spends the brand colour. */}
          <div
            className='flex flex-col justify-between gap-6 p-6'
            style={{
              borderRadius: 'var(--radius-xl)',
              background: 'var(--brand)',
              color: 'var(--brand-foreground)',
            }}
          >
            <div>
              <h3 className='text-lg font-semibold'>Join the expedition</h3>
              <p className='mt-2 text-sm leading-relaxed' style={{ opacity: 0.85 }}>
                Help protect wildlife with science, a donation, or your time in the field.
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Link
                href={U.donation}
                className='action'
                style={{
                  minHeight: 38,
                  paddingInline: 18,
                  background: 'var(--brand-foreground)',
                  color: 'var(--brand)',
                  border: 0,
                }}
              >
                Donate
              </Link>
              <a
                href={U.labs}
                target='_blank'
                rel='noopener noreferrer'
                className='action'
                style={{
                  minHeight: 38,
                  paddingInline: 18,
                  color: 'var(--brand-foreground)',
                  borderColor: 'rgb(255 255 255 / 0.4)',
                }}
              >
                Zoo Labs <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Principles;
