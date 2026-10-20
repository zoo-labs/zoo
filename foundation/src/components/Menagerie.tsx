import React, { useEffect, useRef, useState } from 'react';

/**
 * The animals, then Blue.
 *
 * These are the original Zoo card animations — the ones the foundation had
 * made — so the hero shows the actual work rather than a stock photograph of
 * a rainforest. It walks the set and ends on Blue, which is the hand-off to
 * the lab at zoolabs.io.
 *
 * One <video> element with a swapped source, not eight mounted at once: the
 * set is 15 MB and only the clip on screen should ever be fetched. The webm
 * is a third the size of the mp4, so it goes first and mp4 is the fallback.
 */

type Beast = { name: string; file: string; mp4: string; hue: string };

const CAST: Beast[] = [
  { name: 'Elephant', file: 'elephant_card_front', mp4: 'Elephant_Card_Front', hue: 'var(--cyan)' },
  { name: 'Giraffe', file: 'GIRAFFE_Card_Front', mp4: 'GIRAFFE_Card_Front', hue: 'var(--yellow)' },
  { name: 'Rhino', file: 'RHINO_Card_front', mp4: 'RHINO_Card_front', hue: 'var(--green)' },
  { name: 'Tiger', file: 'TIGER_Card_front', mp4: 'TIGER_Card_front', hue: 'var(--magenta)' },
  { name: 'Leopard', file: 'Leopard_Card_Front', mp4: 'Leopard_Card_Front', hue: 'var(--blue)' },
  { name: 'Red wolf', file: 'Redwolf_Card_front', mp4: 'Redwolf_Card_front', hue: 'var(--red)' },
  { name: 'Hippo', file: 'Hippo_Card_front', mp4: 'Hippo_Card_front', hue: 'var(--cyan)' },
];

/** Each animal gets a look, not a whole performance. */
const TEASE = 3600;

export default function Menagerie() {
  const [at, setAt] = useState(0);
  const [still, setStill] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  // Someone who asked for less motion gets the first animal, held.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setStill(query.matches);
    const listen = () => setStill(query.matches);
    query.addEventListener('change', listen);
    return () => query.removeEventListener('change', listen);
  }, []);

  useEffect(() => {
    video.current?.load();
    if (still) return;
    const next = setTimeout(() => setAt((n) => (n + 1) % (CAST.length + 1)), TEASE);
    return () => clearTimeout(next);
  }, [at, still]);

  const blue = at === CAST.length;
  const beast = CAST[Math.min(at, CAST.length - 1)];
  const hue = blue ? 'var(--cyan)' : beast.hue;

  return (
    <figure style={{ margin: 0, width: '100%' }}>
      <div
        style={{
          border: '2px solid var(--carbon)',
          boxShadow: '6px 6px 0 0 var(--carbon)',
          background: 'var(--blue)',
          overflow: 'hidden',
        }}
      >
        <video
          ref={video}
          key={at}
          autoPlay
          muted
          playsInline
          loop={still}
          onEnded={() => !still && setAt((n) => (n + 1) % (CAST.length + 1))}
          style={{ display: 'block', width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
        >
          {blue ? (
            <source src="/videos/blue.mp4" type="video/mp4" />
          ) : (
            <>
              <source src={`/videos/${beast.file}.webm`} type="video/webm" />
              <source src={`/videos/${beast.mp4}.mp4`} type="video/mp4" />
            </>
          )}
        </video>

        <figcaption
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 0.9rem',
            borderTop: '2px solid var(--carbon)',
            background: hue,
            color: blue ? '#fff' : 'var(--carbon)',
          }}
        >
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            {blue ? 'Blue, at the lab' : beast.name}
          </span>
          <span style={{ flex: 1 }} />
          {blue ? (
            <a
              href="https://zoolabs.io"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              Ask Blue ↗
            </a>
          ) : (
            <span aria-hidden style={{ display: 'flex', gap: 4 }}>
              {CAST.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    border: '1px solid var(--carbon)',
                    background: i === at ? 'var(--carbon)' : 'transparent',
                  }}
                />
              ))}
            </span>
          )}
        </figcaption>
      </div>
    </figure>
  );
}
