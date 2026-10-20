import React from 'react';
import Link from 'next/link';
import { Boxes, Cpu, FileText, ShieldCheck } from 'lucide-react';
import Away from '@/components/Away';
import { useCorpus, type Counts } from '@/config/corpus';

/**
 * What the foundation has, in four numbers.
 *
 * Every colour in here was a hardcoded hex from the dark palette, written
 * inline: `#FFFFFF` on the metric, `#E4E4E7` on the label, `#A1A1AA` on the
 * copy, and a card of `rgba(255,255,255,0.02)`. On the light ground the metric
 * measured 1.07:1 — the number "86" was white text on near-white paper, and it
 * was not that it read poorly, it was that it was not there. Twenty elements on
 * /getinvolved failed the contrast floor and twelve of them were invisible.
 *
 * It is `.card` with the palette's own roles now, so the ground can change
 * again without anything in this file being touched. The model count comes from
 * corpus.tsx rather than from a `45+` typed here for the second time.
 */

/** A custom property, typed. --hue is what a card is coloured with. */
const hue = (value: string) => ({ ['--hue']: value }) as React.CSSProperties;

const stats = (corpus: Counts) => [
  {
    icon: FileText,
    hue: 'var(--blue)',
    metric: String(corpus.papers),
    label: 'Papers published',
    desc: 'Preprints and formal proofs covering TF-GRPO, ASO and post-quantum consensus.',
    link: 'Explore the papers',
    href: 'https://papers.zoo.ngo',
    external: true,
  },
  {
    icon: Boxes,
    hue: 'var(--green)',
    metric: String(corpus.models),
    label: 'Open-weight Zen models',
    desc: 'Frontier foundation models from 600M parameters up, every one with verifiable open weights.',
    link: 'The Zen suite',
    href: '/ai',
    external: false,
  },
  {
    icon: Cpu,
    hue: 'var(--pink)',
    metric: '100% open',
    label: 'Compute and Gym',
    desc: 'Open AI mining protocols, proof-of-useful-work, and Zoo Gym reinforcement learning.',
    link: 'Zoo Gym',
    href: 'https://github.com/zooai/gym',
    external: true,
  },
  {
    icon: ShieldCheck,
    hue: 'var(--blue)',
    metric: '501(c)(3)',
    label: 'Tax-exempt charity',
    desc: 'Tax-deductible donations supporting frontline sanctuaries and open science.',
    link: 'Donations and the 990',
    href: '/donation',
    external: false,
  },
];

export default function Comment() {
  const corpus = useCorpus();
  const STATS = stats(corpus);
  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div
        className='grid-cards'
        style={{ ['--grid-card-min']: '15rem' } as React.CSSProperties}
      >
        {STATS.map(({ icon: Icon, ...s }) => (
          <article
            key={s.label}
            className='card p-6 flex flex-col'
            style={{ ...hue(s.hue), background: '#ffffff' }}
          >
            <span className='disc'>
              <Icon size={20} strokeWidth={1.75} aria-hidden />
            </span>
            <p className='mt-5 text-2xl md:text-3xl font-bold'>{s.metric}</p>
            <p className='eyebrow mt-1'>{s.label}</p>
            <p className='mt-3 text-sm text-secondary flex-1'>{s.desc}</p>

            {s.external ? (
              <a
                href={s.href}
                target='_blank'
                rel='noopener noreferrer'
                className='tint mt-6'
                style={{ alignSelf: 'flex-start' }}
              >
                {s.link}
                <Away />
              </a>
            ) : (
              <Link href={s.href} className='tint mt-6' style={{ alignSelf: 'flex-start' }}>
                {s.link}
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
