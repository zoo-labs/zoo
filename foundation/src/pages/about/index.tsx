import React from 'react';
import Link from 'next/link';
import {
  BadgeCheck,
  BookOpen,
  Boxes,
  FileText,
  Layers,
  Network,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Away from '@/components/Away';
import { useCorpus, type Counts } from '@/config/corpus';

/**
 * The foundation.
 *
 * Written against the home page's vocabulary — `.card`, `.disc`, `.tint`,
 * `.pill`, `.eyebrow`, `.action` — rather than against Tailwind, which has
 * never been in this build. That is what "What We Do" was: three rows of
 * `flex-col md:flex-row` with a `w-full md:w-64` panel beside a `flex-1` column.
 * `md:flex-row` is one of the names the stylesheet answers and `md:w-64` is not,
 * so the panel stayed 100% wide inside the row and squeezed its own text column
 * to about 50px — one word per line, 350px tall. The middle row asked for
 * `md:flex-row-reverse`, which the stylesheet does not answer at all, so that
 * one never became a row and rendered full width. Two rows broken, one row
 * fine, one root cause.
 *
 * The CTA had the same shape of fault: `flex-col sm:flex-row` with no
 * `sm:flex-row` rule, so the buttons stayed in a column and stretched to the
 * container. And "Read Our Papers" was `border-2 border-white` on the near-white
 * ground — an outline you could only find by its text.
 *
 * Every count comes from src/config/corpus.tsx. This page used to publish 7
 * papers and 102 proposals while the home page published 86 and 149.
 */

/** A custom property, typed. --hue is what a card is coloured with. */
const hue = (value: string) => ({ ['--hue']: value }) as React.CSSProperties;

const counts = (corpus: Counts) => [
  {
    icon: Boxes,
    hue: 'var(--blue)',
    value: String(corpus.models),
    label: 'Open models',
    body: 'From 600M to 480B parameters, every one of them published with its weights.',
  },
  {
    icon: FileText,
    hue: 'var(--green)',
    value: String(corpus.papers),
    label: 'Papers',
    body: 'Conservation, learning and model architecture, written to be used rather than cited.',
  },
  {
    icon: TrendingUp,
    hue: 'var(--pink)',
    value: String(corpus.proposals),
    label: 'Proposals',
    body: 'How a change to the ecosystem is argued in the open, and recorded.',
  },
];

const values = (corpus: Counts) => [
  {
    icon: BookOpen,
    title: 'Open by default',
    body: 'Open weights, open papers, open code. Closed AI is a dead end for science.',
  },
  {
    icon: BadgeCheck,
    title: 'Formally verified',
    body: `${corpus.proofs} machine-checked proofs. Critical systems are proved, not asserted.`,
  },
  {
    icon: Users,
    title: 'Community governed',
    body: `${corpus.proposals} proposals. Research direction is decided by contributors, not executives.`,
  },
  {
    icon: ShieldCheck,
    title: 'Safe by design',
    body: 'Zen-guard safety models. Alignment research is built in rather than bolted on.',
  },
];

const work = (corpus: Counts) => [
  {
    icon: Layers,
    hue: 'var(--blue)',
    title: 'Frontier model research',
    body: `The Zen family of open models — ${corpus.models} of them, from 600M-parameter edge models to 480B-parameter frontier systems, all with open weights.`,
    href: 'https://huggingface.co/zenlm',
    cta: 'Weights on Hugging Face',
  },
  {
    icon: Boxes,
    hue: 'var(--green)',
    title: 'Training infrastructure',
    body: 'Zoo Gym: an open platform supporting 100+ models, 8 training methods and multi-GPU distributed training, with a 99.8% cost reduction via Training-Free GRPO.',
    href: 'https://github.com/zooai/gym',
    cta: 'Gym on GitHub',
  },
  {
    icon: Network,
    hue: 'var(--pink)',
    title: 'Decentralized AI network',
    body: 'Zoo Network: decentralized AI compute with recursive self-learning, post-quantum secure consensus, and FHE for private inference.',
    href: 'https://zoo.network',
    cta: 'The network',
  },
];

const ECOSYSTEM = [
  {
    title: 'Zoo Labs Foundation',
    body: '501(c)(3) research foundation advancing open science, the Zen models, and wildlife conservation.',
  },
  {
    title: 'Hanzo AI',
    body: 'Frontier AI infrastructure, sovereign inference, and distributed GPU cloud.',
  },
  {
    title: 'Zoo Gym',
    body: 'Open distributed reinforcement learning framework with Training-Free GRPO.',
  },
];

export default function About() {
  const corpus = useCorpus();
  const COUNT = counts(corpus);
  const VALUES = values(corpus);
  const WORK = work(corpus);
  return (
    <Layout>
      <Seo
        templateTitle='About Zoo Labs Foundation'
        description='A 501(c)(3) advancing open AI research: frontier models, decentralized training, and formal verification.'
      />
      <Navbar />

      <section className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
        <div style={{ maxWidth: '52ch' }}>
          <span className='pill eyebrow'>501(c)(3) non-profit &bull; EIN 88-3538992</span>
          <h1 className='mt-6'>Open AI research, for everyone.</h1>
          <p className='mt-6 text-lg text-secondary' style={{ maxWidth: '46ch' }}>
            Zoo Labs Foundation advances open-source AI research, frontier model development and
            decentralized science. Everything we make is public.
          </p>
        </div>
      </section>

      <section className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
        <div style={{ maxWidth: '58ch' }}>
          <h2 className='text-3xl md:text-4xl font-bold'>Our mission</h2>
          <p className='mt-4 text-secondary'>
            Advance open AI research by building frontier models, publishing what we learn, and
            making the tools that let other researchers do the same.
          </p>
        </div>

        <div className='mt-12 grid-cards'>
          {COUNT.map(({ icon: Icon, ...c }) => (
            <article
              key={c.label}
              className='card p-8 flex flex-col'
              style={{ ...hue(c.hue), background: '#ffffff' }}
            >
              <span className='disc'>
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <p className='mt-5 text-3xl md:text-4xl font-bold'>{c.value}</p>
              <p className='eyebrow mt-1'>{c.label}</p>
              <p className='mt-3 text-secondary flex-1'>{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
        <div style={{ maxWidth: '68ch' }}>
          <h2 className='text-3xl md:text-4xl font-bold'>Our story</h2>
          <div className='mt-6 space-y-4 text-secondary'>
            <p>
              Founded in 2021, on the belief that frontier AI should be open, verifiable and
              community-governed rather than locked behind a corporate wall.
            </p>
            <p>
              We built the Zen model family on the Qwen3+ architecture: {corpus.models} models
              spanning text, code, vision, audio, video and 3D generation, every one with open
              weights on Hugging Face.
            </p>
            <p>
              The research spans Hamiltonian large language models, decentralized semantic
              optimization, and {corpus.proofs} formally verified proofs in Lean 4 and TLA+. We
              publish all of it open access.
            </p>
            <p>
              Zoo Gym, our training platform, has let thousands of researchers train and fine-tune
              models at a fraction of the usual cost through Training-Free GRPO.
            </p>
          </div>
        </div>
      </section>

      <section className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
        <div className='text-center mx-auto' style={{ maxWidth: '58ch' }}>
          <h2 className='text-3xl md:text-4xl font-bold'>Core values</h2>
        </div>

        {/* Four across, using the grid's own minimum rather than a new rule. */}
        <div
          className='mt-12 grid-cards'
          style={{ ['--grid-card-min']: '15rem' } as React.CSSProperties}
        >
          {VALUES.map(({ icon: Icon, ...v }) => (
            <article
              key={v.title}
              className='card p-6 flex flex-col'
              style={{ ...hue('var(--blue)'), background: '#ffffff' }}
            >
              <span className='disc' data-outline>
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className='mt-5 text-lg font-semibold'>{v.title}</h3>
              <p className='mt-3 text-secondary flex-1'>{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
        <div className='text-center mx-auto' style={{ maxWidth: '58ch' }}>
          <h2 className='text-3xl md:text-4xl font-bold'>What we do</h2>
        </div>

        <div className='mt-12 grid-cards'>
          {WORK.map(({ icon: Icon, ...w }) => (
            <article
              key={w.title}
              className='card p-8 flex flex-col'
              style={{ ...hue(w.hue), background: '#ffffff' }}
            >
              <span className='disc'>
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className='mt-5 text-xl font-semibold'>{w.title}</h3>
              <p className='mt-3 text-secondary flex-1'>{w.body}</p>
              <a
                href={w.href}
                target='_blank'
                rel='noopener noreferrer'
                className='tint mt-6'
                style={{ alignSelf: 'flex-start' }}
              >
                {w.cta}
                <Away />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
        <div className='text-center mx-auto' style={{ maxWidth: '58ch' }}>
          <h2 className='text-3xl md:text-4xl font-bold'>Open ecosystem</h2>
          <p className='mt-4 text-secondary'>
            Built on open frontier AI research, verifiable post-quantum consensus, decentralized
            compute, and open science.
          </p>
        </div>

        <div className='mt-12 grid-cards'>
          {ECOSYSTEM.map((e) => (
            <article key={e.title} className='card p-8' style={{ background: '#ffffff' }}>
              <h3 className='text-xl font-semibold'>{e.title}</h3>
              <p className='mt-3 text-secondary'>{e.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
        <div
          className='card p-8'
          style={{
            ...hue('var(--blue)'),
            background: 'color-mix(in oklab, var(--blue) 7%, #ffffff)',
            borderColor: 'color-mix(in oklab, var(--blue) 18%, transparent)',
          }}
        >
          <h2 className='text-2xl md:text-3xl font-bold'>Advance open AI research</h2>
          <p className='mt-3 text-secondary' style={{ maxWidth: '52ch' }}>
            Fund open-source models, contribute to a proposal, or train on Zoo Gym. Every
            contribution is tax-deductible.
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            <Link
              href='/donation'
              className='action'
              data-fill
              style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
            >
              Support our research
            </Link>
            <Link href='/research' className='action'>
              Read our papers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
