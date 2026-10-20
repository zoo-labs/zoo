import React from 'react';
import Link from 'next/link';
import { Calendar, FileText, Globe, Heart, Layers, Leaf, MessageCircle, TrendingUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Away from '@/components/Away';
import Blue from '@/components/Blue';
import Portal from '@/components/Portal';
import { useCorpus, type Counts } from '@/config/corpus';

/**
 * Every number and every name on this page is one we can point at: the counts
 * come from src/config/corpus.tsx, which counts them in
 * github.com/zoo-apps/papers rather than trusting a literal, and no organisation
 * is named as a partner unless it is one. A charity asking for money does not
 * get to round any of that up.
 *
 * The page is two grounds. The night carries the header and the hero; the paper
 * carries everything after it; and the numbers sit across the seam, which is
 * the only element on the site that belongs to both.
 */

/** A custom property, typed. --hue is what a card is coloured with. */
const hue = (value: string) => ({ ['--hue']: value }) as React.CSSProperties;

/* One line each. "Improvement proposals" was the only label that wrapped, and a
   two-line label in a four-across row hangs its whole cell below the other
   three. The registry already calls them Proposals — same word, one place
   shorter, and the four labels now read as a set. */
const counts = (corpus: Counts) => [
  { icon: FileText, value: String(corpus.papers), label: 'Papers' },
  { icon: TrendingUp, value: String(corpus.proposals), label: 'Proposals' },
  { icon: Globe, value: 'Everything', label: 'Open source' },
  { icon: Calendar, value: '2021', label: 'Founded' },
];

const WORK = [
  {
    icon: Layers,
    hue: 'var(--blue)',
    title: 'Open models',
    body: 'The Zen family is developed in the open and published with its weights, so anyone can run, inspect and build on it without asking us.',
    href: 'https://huggingface.co/zenlm',
    cta: 'Weights on Hugging Face',
  },
  {
    icon: Leaf,
    hue: 'var(--green)',
    title: 'Conservation research',
    body: 'Peer-style papers on wildlife population monitoring, species classification, habitat modeling and citizen science — written to be used, not cited.',
    href: 'https://papers.zoo.ngo',
    cta: 'Read the papers',
  },
  {
    icon: MessageCircle,
    hue: 'var(--pink)',
    title: 'Teaching with Blue',
    body: 'Blue is a beluga whale who answers questions about the ocean for children, students and researchers, and says plainly when something is not known.',
    href: 'https://zoolabs.io',
    cta: 'Ask Blue',
  },
];

export default function Home() {
  const corpus = useCorpus();
  const COUNT = counts(corpus);
  return (
    <Layout>
      <Seo
        title='Zoo Labs Foundation — Open AI and Wildlife Research'
        description='A 501(c)(3) non-profit publishing open AI models and conservation research, and teaching with them. Everything we make is public.'
      />
      {/* The landing opens on the night band and the bar is the top of it. */}
      <Navbar ground="night" />

      {/* The padding lives with the rule in globals.css, not here: an inline style
          wins over the class, so stating it twice meant `.hero` could not decide
          its own height. */}
      <section className='night hero'>
        <div className='container'>
          <div className='hero-two'>
            <div>
              <span className='pill eyebrow'>501(c)(3) non-profit • EIN 88-3538992</span>

              <h1 className='mt-6'>
                <span style={{ display: 'block' }}>Open AI,</span>
                <span style={{ display: 'block' }}>and the animals</span>
                <span style={{ display: 'block' }}>it is for.</span>
              </h1>

              <p className='mt-6 text-lg text-secondary' style={{ maxWidth: '46ch' }}>
                Zoo Labs Foundation is a non-profit research organization. We publish open AI models
                and conservation research, and build the things that teach with them. All of it is
                open source — the weights, the papers, the code and the arguments.
              </p>

              <p className='mt-4 text-secondary' style={{ maxWidth: '46ch' }}>
                Blue is here, right now — a beluga whale who answers questions about the ocean and
                about the research below it. No account, nothing to install; ask it anything.
              </p>

              <div className='mt-8 flex flex-wrap gap-3'>
                <Link href='/donation' className='action' data-fill>
                  Donate
                </Link>
                <a href='https://papers.zoo.ngo' target='_blank' rel='noopener noreferrer' className='action'>
                  Read the research
                  <Away />
                </a>
              </div>
            </div>

            <Portal />
          </div>
        </div>
      </section>

      <div className='container straddle'>
        <dl className='stats'>
          {COUNT.map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <Icon size={22} strokeWidth={1.5} style={{ color: 'var(--text-tertiary)' }} aria-hidden />
              <div>
                <dd className='text-2xl md:text-4xl font-bold'>{value}</dd>
                <dt className='eyebrow mt-1'>{label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <section id='products' className='container' style={{ paddingTop: 'var(--section-y-lg)' }}>
        <div className='text-center mx-auto' style={{ maxWidth: '58ch' }}>
          <h2 className='text-3xl md:text-4xl font-bold'>What we do</h2>
          <p className='mt-4 text-secondary'>
            We advance open AI for conservation, education and discovery. Everything we build is
            open, transparent and made to be used.
          </p>
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
        <div
          className='card p-8'
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
              <Heart size={20} strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className='mt-5 text-2xl md:text-3xl font-bold'>This is a public good</h2>
            <p className='mt-3 text-secondary' style={{ maxWidth: '44ch' }}>
              We&apos;re a 501(c)(3) non-profit funded by grants and donations. Your support keeps
              research open and accessible.
            </p>
            <Link
              href='/donation'
              className='action mt-6'
              data-fill
              style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
            >
              Donate to the Foundation
              <Away />
            </Link>
          </div>

          <div style={{ width: '100%', maxWidth: 360, marginLeft: 'auto' }}>
            <Blue ratio='4 / 3' />
          </div>
        </div>
      </section>

      <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 className='text-2xl md:text-3xl font-bold'>Stay in the loop</h2>
            <p className='mt-3 text-secondary' style={{ maxWidth: '42ch' }}>
              Get updates on new models, papers and projects from the Foundation.
            </p>
          </div>

          {/* Inert on purpose. There is no list to post to — the only newsletter
              code on the site posts to a Mailchimp URL with the placeholder id
              still in it and then thanks you regardless of what happened. A form
              that cannot subscribe you should not say that it did. Give this an
              endpoint and the handler is the one line below. */}
          <form className='field' onSubmit={(e) => e.preventDefault()}>
            <input type='email' name='email' placeholder='Email address' aria-label='Email address' />
            <button
              type='submit'
              className='action'
              data-fill
              style={{ ['--fill']: 'var(--night)', paddingInline: 'var(--space-5)' } as React.CSSProperties}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
