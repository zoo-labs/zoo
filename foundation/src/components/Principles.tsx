import * as React from 'react';
import Link from 'next/link';
import { useCorpus } from '@/config/corpus';

/**
 * The charter, drawn on the paper it is actually printed on.
 *
 * The five cards were built from inline literals for a dark page — a card at
 * `rgba(255,255,255,0.02)` on `--paper`, a title at `#FFFFFF`, body at
 * `#A1A1AA` — so the titles were white on near-white and the copy read 2.3:1.
 * They are the site's `.card` now, and every colour is a role, so the whole
 * block follows the ground it is put on rather than a ground it assumed.
 *
 * The blue is `--blue` (#1d4ed8), which is the accessible one: the `#3B82F6` /
 * `#60A5FA` pair that used to be here measures under 3:1 on white.
 */
export default function Principles() {
  const corpus = useCorpus();
  const principles = [
    { title: 'Open Science & Weights', desc: 'We train frontier reasoning models and release weights openly for global public research.' },
    { title: 'No Paywalls', desc: `All ${corpus.papers} papers, ${corpus.proposals} proposals and every benchmark dataset are free to read.` },
    { title: 'Formal Verification', desc: 'Critical models, consensus algorithms, and mathematical constraints are verified with Lean 4 formal proofs.' },
    { title: 'Safe by Design', desc: 'Alignment via Training-Free GRPO and RLVR tailored for open, verifiable autonomous agent systems.' },
    { title: '501(c)(3) Stewardship', desc: 'Tax-exempt public charity governed by scientists, researchers, and conservation leaders.' },
  ];

  return (
    <section className='py-24 bg-background border-t'>
      <div className='container mx-auto px-4 space-y-8'>
        <div className='text-center space-y-3 max-w-2xl mx-auto'>
          <span className='eyebrow'>Foundation Charter</span>
          <h2 className='text-3xl md:text-5xl font-bold text-foreground tracking-tight'>
            The Principles That Drive Us
          </h2>
          <p className='text-sm text-muted-foreground'>
            Advancing artificial intelligence in service of the living planet through open research, formal verification, and public stewardship.
          </p>
        </div>

        <div className='grid-cards' style={{ ['--grid-card-min']: '17.5rem' } as React.CSSProperties}>
          {principles.map((p, idx) => (
            <div key={p.title} className='card p-6 flex flex-col gap-2'>
              <div className='flex items-center gap-3'>
                {/* `.disc` reads --hue for its fill, so the numeral is one rule
                    at whatever size and colour it is asked for. */}
                <span
                  className='disc'
                  style={{
                    ['--hue']: 'var(--blue)',
                    width: 24,
                    height: 24,
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--weight-semibold)',
                  } as React.CSSProperties}
                >
                  {idx + 1}
                </span>
                <h3 className='text-base font-semibold text-foreground' style={{ margin: 0 }}>
                  {p.title}
                </h3>
              </div>
              <p className='text-sm text-muted-foreground' style={{ margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className='flex flex-wrap items-center justify-center gap-4 pt-4'>
          <Link
            href='/donation'
            className='action'
            data-fill
            style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
          >
            Support 501(c)(3) Research
          </Link>
          <a
            href='https://zoolabs.io'
            target='_blank'
            rel='noopener noreferrer'
            className='action'
          >
            🐬 Open ZooLabs.io Playground &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
