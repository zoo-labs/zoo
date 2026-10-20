import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * Three cards fanned out, and the fan is geometry rather than utilities.
 *
 * `w-[38%]`, `left-[31%]`, `-top-3`, `-rotate-6`, `z-[10]` and the two aspect
 * ratios were arbitrary-value Tailwind names, none of them published — so all
 * three cards sat at 0×0 in the same corner with no rotation at all. Percentages
 * and a transform say it directly, and an aspect-ratio keeps the stack the shape
 * of the artwork at every width.
 */
const cards = [
  { src: 'Hippo_Card_front', left: '0%', top: '0%', tilt: -6, layer: 1 },
  { src: 'TIGER_Card_front', left: '31%', top: '-3%', tilt: 0, layer: 2 },
  { src: 'TIGER_Card_Back', left: '62%', top: '0%', tilt: 6, layer: 1 },
];

const onward = 'inline-flex items-center gap-2 cursor-pointer text-foreground';

function Collecting() {
  return (
    <div className='bg-background py-24'>
      <div className='w-full text-center items-center flex flex-col'>
        <Link href='/animals' className='text-foreground md:text-4xl xl:text-6xl max-md:text-3xl max-md:my-5 mb-8'>
          Start Collecting
        </Link>

        <Link href='/animals' className='py-12' style={{ width: 'min(90%, 44rem)' }}>
          <div className='relative w-full' style={{ aspectRatio: '1182 / 833' }}>
            {cards.map((card) => (
              <div
                key={card.src}
                className='absolute'
                style={{
                  width: '38%',
                  left: card.left,
                  top: card.top,
                  transform: `rotate(${card.tilt}deg)`,
                  zIndex: card.layer,
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className='w-full border rounded-xl'
                  style={{ aspectRatio: '473 / 833' }}
                >
                  <source src={`/videos/${card.src}.webm`} type='video/webm' />
                  <source src={`/videos/${card.src}.mp4`} type='video/mp4' />
                </video>
              </div>
            ))}
          </div>
        </Link>

        <div className='flex flex-wrap items-center justify-center gap-6 mt-8'>
          <Link href='/animals' className={onward}>
            View Endangered Cards
            <ChevronRight size={16} aria-hidden />
          </Link>
          <Link href='https://app.zoolabs.io/' className={onward}>
            Shop Digital Collectibles
            <ChevronRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Collecting;
