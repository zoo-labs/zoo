import Image from 'next/image';
import Link from 'next/link';

/**
 * The featured species.
 *
 * One tree, not two. This was a `max-md:hidden` desktop block beside a
 * `max-md:block` phone block, each stating the same copy and each mounting a
 * <ModelViewer> against `/models/Wolf/WOLF-ADULT.glb`, which does not exist —
 * so both showed an empty square. The still render does exist.
 */
function Detail() {
  return (
    <section style={{ paddingBlock: 'clamp(4rem, 8vw, 6rem)' }}>
      <div className='mx-auto' style={{ maxWidth: 1280, paddingInline: 'var(--page-gutter)' }}>
        <div className='card grid items-center gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-10'>
          <div
            className='relative w-full overflow-hidden'
            style={{
              aspectRatio: '1 / 1',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--plate)',
            }}
          >
            <Image
              src='/images/red_wolf.png'
              alt='A red wolf, of which fewer than 25 remain in the wild'
              fill
              sizes='(min-width: 768px) 45vw, 90vw'
              className='object-contain'
            />
          </div>

          <div className='flex flex-col items-start'>
            <p className='pill' style={{ color: 'var(--foreground)' }}>
              Critically endangered
            </p>
            <h2 className='title mt-4'>The red wolf</h2>
            <p className='lede mt-4'>
              Fewer than 25 red wolves remain in the wild. We deploy GPS collaring,
              bioacoustic sensors and genetic tracking to support their recovery.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Link href='/animals/red_wolf' className='action' data-fill=''>
                About the red wolf
              </Link>
              <Link href='/donation' className='action'>
                Support the sanctuary
              </Link>
              <Link href='/getinvolved' className='more ml-1'>
                Volunteer <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detail;
