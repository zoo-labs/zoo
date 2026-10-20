import React, { useState } from 'react';
import Link from 'next/link';
import ReactCardFlip from "react-card-flip";
import axios from "axios";
import { useStripe } from '@stripe/react-stripe-js'
import animals from '@/components/animals/animals.json'

/**
 * One card, its two faces, and what the species is.
 *
 * The row was `md:w-1/2` beside `w-1/2` — neither of which the stylesheet
 * answers — so both halves were full width and the card stood above the copy at
 * every size. It is a grid now, and `minmax()` decides when there is room for
 * two columns without a breakpoint being named. The card holds `473/833`
 * inline, which is the one ratio on this page that is not a ramp value.
 */

/** The turn-over control. Was a `div` with an onClick: no keyboard, no name. */
function Flip({ onFlip }: { onFlip: () => void }) {
  return (
    <button
      type='button'
      onClick={onFlip}
      aria-label='Turn the card over'
      className='absolute z-10 flex items-center justify-center rounded-full cursor-pointer'
      style={{
        bottom: 'var(--space-4)',
        right: 'var(--space-4)',
        width: 45,
        height: 45,
        background: 'var(--white)',
        color: 'var(--carbon)',
      }}
    >
      <svg width='15' height='45' viewBox='0 0 20 17' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden>
        <path d="M12.7586 2.72001H3.53201L4.52469 1.74131C4.78597 1.48362 4.88806 1.108 4.79244 0.756034C4.69675 0.403999 4.41795 0.129101 4.06091 0.0347546C3.70395 -0.059523 3.32299 0.0411294 3.06163 0.298754L0.303024 3.01872C0.109057 3.21004 0 3.46949 0 3.74C0 4.01051 0.109052 4.26997 0.303024 4.46128L3.06163 7.18124C3.32299 7.43886 3.70395 7.53951 4.06091 7.44524C4.41795 7.35089 4.69676 7.076 4.79244 6.72396C4.88806 6.372 4.78598 5.99637 4.52469 5.73868L3.53201 4.75998H12.7586C14.1305 4.75998 15.4461 5.29732 16.4162 6.2537C17.3862 7.21014 17.9311 8.50728 17.9311 9.86001C17.9311 11.2127 17.3862 12.5098 16.4162 13.4663C15.4462 14.4227 14.1306 14.96 12.7586 14.96H6.55177C6.18216 14.96 5.84071 15.1545 5.65587 15.47C5.4711 15.7856 5.4711 16.1745 5.65587 16.49C5.84071 16.8056 6.18216 17 6.55177 17H12.7586C16.7516 17 20 13.7972 20 9.8601C20 5.92304 16.7516 2.72019 12.7586 2.72019V2.72001Z" fill="currentColor"/>
      </svg>
    </button>
  );
}

/** One face of the card: the video, and the control that turns it. */
function Face({ mp4, webm, onFlip }: { mp4: string; webm?: string; onFlip: () => void }) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='w-full border rounded-xl p-1'
        style={{ aspectRatio: '473 / 833' }}
        src={mp4}
      >
        {webm && <source src={webm} type='video/webm' />}
        <source src={mp4} type='video/mp4' />
      </video>
      <Flip onFlip={onFlip} />
    </>
  );
}

function Header({title,content,front,back,front_m,back_m,route}: {
  content: string;
  title: string;
  front: string;
  back: string;
  front_m: string;
  back_m: string;
  route: string;
}) {
  const [flip, setFlip] = useState(false);
  const stripe = useStripe();
  /* Null whenever the build carries no publishable key, which a static export
     normally does not. Asserting past it turned "checkout is not configured"
     into a TypeError on click. */
  const buyCard = async () => {
    if (!stripe) return;
    const { data } = await axios.get(`/api/buy_card/${route}`);
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
  const turn = () => setFlip(!flip);

  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
      >
        <div className='relative mx-auto w-full' style={{ maxWidth: '22rem' }}>
          <ReactCardFlip isFlipped={flip} flipDirection='horizontal'>
            <Face mp4={front_m} webm={front} onFlip={turn} />
            <Face mp4={back_m} onFlip={turn} />
          </ReactCardFlip>
        </div>

        <div>
          <h1 className='text-foreground max-md:text-3xl md:text-5xl xl:text-6xl'>{title}</h1>
          <p className='mt-6 text-lg text-secondary' dangerouslySetInnerHTML={{__html: content}} />

          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <button onClick={buyCard} className='action' data-fill>
              Buy $25
            </button>
            <button className='action'>
              Design
            </button>
          </div>
        </div>
      </div>

      {/* The switcher. It was seven links written out by hand — a third copy of
          a list animals.json already holds — in a `flex` row with no wrap,
          hidden below `md` by `max-md:hidden`, which the stylesheet does not
          answer. So on a phone it drew all seven anyway and ran from x=-74 to
          x=464 in a 390px viewport: the one thing on this site that scrolled
          sideways. It wraps now, which needs no breakpoint at all. */}
      <div className='mt-12 flex flex-wrap items-center justify-center gap-3'>
        {animals.map((a) => (
          <Link
            key={a.route}
            href={`/animals/${a.route}`}
            className='action'
            {...(a.name === title ? { 'data-fill': true } : {})}
            style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
            aria-current={a.name === title ? 'page' : undefined}
          >
            {a.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Header;
