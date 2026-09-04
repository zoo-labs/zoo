import Image from 'next/image';
import Link from 'next/link';

import { STATS, U } from '@/config/registry';

/**
 * The hero, in hanzo.industries' anatomy: eyebrow, then the claim, then one
 * sentence of what it means, then the actions, then the numbers that back it.
 *
 * The featured-species card carries the animal's name as REAL TEXT under the
 * picture rather than relying on a label baked into the artwork. A baked label
 * only survives if the frame it was drawn for is the frame it gets, and the
 * moment the card is asked to fill a different box the name is what gets cut.
 * The picture is given a fixed square box and `object-contain`, so it is
 * letterboxed rather than cropped at every width.
 */
function Intro({
  breadcrumbs,
  title,
  comment,
}: {
  breadcrumbs: string | String;
  title: string;
  comment?: string;
}) {
  return (
    <section
      style={{
        borderBottom: '1px solid var(--border)',
        paddingBlock: 'clamp(3rem, 8vw, 6rem)',
      }}
    >
      <div className='mx-auto' style={{ maxWidth: 1280, paddingInline: 'var(--page-gutter)' }}>
        <div className='grid items-center gap-12 lg:grid-cols-12'>
          <div className='flex flex-col items-start lg:col-span-7'>
            <p className='eyebrow mb-5'>{breadcrumbs}</p>

            <h1 className='display mb-6'>
              {title} Earth&rsquo;s wildlife
            </h1>

            <p className='lede mb-8' style={{ maxWidth: '38rem' }}>
              {comment ||
                'Protecting endangered species through open-access research, bioacoustics, community field sanctuaries and wildlife science anyone can read.'}
            </p>

            <div className='flex flex-wrap items-center gap-3'>
              <Link href={U.animals} className='action' data-fill=''>
                Explore the species
              </Link>
              <Link href={U.research} className='action'>
                Read the research
              </Link>
              <a
                href={U.labs}
                target='_blank'
                rel='noopener noreferrer'
                className='more ml-1'
              >
                Zoo Labs <span aria-hidden>↗</span>
              </a>
            </div>

            <dl
              className='mt-12 grid w-full grid-cols-2 gap-6 pt-10 sm:grid-cols-4'
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className='sr-only'>{stat.label}</dt>
                  <dd className='m-0'>
                    <span className='block text-2xl font-semibold tracking-tight'>
                      {stat.value}
                    </span>
                    <span
                      className='mt-1 block text-[13px]'
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className='lg:col-span-5'>
            <figure className='card m-0 mx-auto max-w-md overflow-hidden p-4 lg:max-w-none'>
              {/* The render's own ground, so picture and plate are one surface
               * and the square is never cropped at any width. */}
              <div
                className='relative w-full overflow-hidden'
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--plate)',
                }}
              >
                <Image
                  src='/images/giraffe.png'
                  alt='A Nubian giraffe, one of the endangered species Zoo Labs Foundation works on'
                  fill
                  sizes='(min-width: 1024px) 30vw, 90vw'
                  className='object-contain'
                  priority
                />
              </div>
              <figcaption className='mt-4 flex items-center justify-between gap-4'>
                <div>
                  <p className='text-[13px]' style={{ color: 'var(--muted-foreground)' }}>
                    Featured species
                  </p>
                  <p className='text-base font-semibold'>Nubian giraffe</p>
                </div>
                <Link href={U.nubianGiraffe} className='more shrink-0'>
                  View in 3D <span aria-hidden>→</span>
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
