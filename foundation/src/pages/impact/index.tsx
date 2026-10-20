import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { useCorpus } from '@/config/corpus';

/**
 * What the research is, rather than what we wish it had already done.
 *
 * This page used to claim $12.3M in conservation funding, 15,420 animals
 * rescued, 284,000 volunteer hours, deployment to 200+ sites, 15 million images
 * analysed and 98% accuracy. The foundation's IRS determination is dated June
 * 2025 and the public record carries no filing; none of those things happened,
 * and a donor reading them was being misled about what their money had done.
 *
 * What did happen is the research below — every line links to the paper it
 * describes, so the claim and its evidence are the same click.
 */

const WORK = [
  {
    hue: 'var(--green)',
    title: 'Wildlife population monitoring',
    body: 'Deep learning for counting animals and assessing habitat from survey imagery, and what the method can and cannot resolve.',
    paper: 'zoo-conservation-ai',
  },
  {
    hue: 'var(--cyan)',
    title: 'Tracking without surveilling',
    body: 'Movement analytics that keep the location of an endangered animal out of the hands of anyone who would use it to find one.',
    paper: 'zoo-wildlife-tracking',
  },
  {
    hue: 'var(--magenta)',
    title: 'Recognising a species from few examples',
    body: 'Biodiversity monitoring where most species have almost no labelled images, which is most species.',
    paper: 'zoo-species-classification',
  },
  {
    hue: 'var(--yellow)',
    title: 'Where a species can still live',
    body: 'Modelling how distributions shift under climate change, so protection is planned for the range an animal will have.',
    paper: 'zoo-habitat-modeling',
  },
  {
    hue: 'var(--blue)',
    title: 'Learning across sites without pooling data',
    body: 'Federated training so field stations improve a shared model while their own recordings stay their own.',
    paper: 'zoo-federated-wildlife',
  },
  {
    hue: 'var(--green)',
    title: 'Watching land use from orbit',
    body: 'Detecting change from satellite imagery — clearing, encroachment, recovery — at a cadence fieldwork cannot match.',
    paper: 'zoo-satellite-ecology',
  },
  {
    hue: 'var(--cyan)',
    title: 'Counting with the public',
    body: 'A citizen science platform for biodiversity collection, and the problem of keeping volunteer data usable.',
    paper: 'zoo-citizen-science',
  },
  {
    hue: 'var(--red)',
    title: 'Carbon credits you can check',
    body: 'Measurement and verification for nature-based credits, written against the finding that most certified offsets do not hold up.',
    paper: 'zoo-carbon-credits',
  },
];

const paperUrl = (id: string) => `https://github.com/zooai/papers/tree/main/${id}`;

export default function Impact() {
  const corpus = useCorpus();
  return (
    <Layout>
      <Seo
        templateTitle="Impact"
        description="The conservation research Zoo Labs Foundation has published, with a link to every paper."
      />
      <Navbar />

      <section className="container py-24">
        <h1 className="text-5xl md:text-7xl font-black">Impact</h1>
        <p className="mt-6 text-lg text-secondary" style={{ maxWidth: '58ch' }}>
          We are a research foundation, and research is what we have to show. Every claim
          below is a paper you can read; none of it is a number we cannot source.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="https://papers.zoo.ngo" className="action" data-fill>
            All {corpus.papers} papers
          </a>
          <Link href="/transparency" className="action">
            Registration and filings
          </Link>
        </div>
      </section>

      <section className="container py-24">
        <h2 className="text-3xl md:text-4xl font-black">Conservation research</h2>
        <div className="mt-8 grid-cards">
          {WORK.map((item) => (
            <article
              key={item.title}
              className="card p-6"
              style={{ borderLeft: `10px solid ${item.hue}` }}
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-secondary">{item.body}</p>
              <a
                href={paperUrl(item.paper)}
                className="mt-4 inline-flex font-bold"
              >
                Read the paper →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-24">
        <div className="card p-8" style={{ borderLeft: '10px solid var(--yellow)' }}>
          <h2 className="text-2xl md:text-3xl font-black">What we have not done yet</h2>
          <p className="mt-3 text-secondary" style={{ maxWidth: '62ch' }}>
            We have not run a rescue operation, funded a sanctuary, or deployed a sensor
            network. When we do, the count will be on this page with the evidence beside it.
            Until then this page is short, and that is the honest length.
          </p>
        </div>
      </section>

      <section className="container py-24">
        <div className="card p-8 flex flex-wrap items-center justify-between gap-6">
          <div style={{ maxWidth: '52ch' }}>
            <h2 className="text-2xl md:text-3xl font-black">Fund the next paper</h2>
            <p className="mt-3 text-secondary">
              Donations pay for the research and the people doing it. Gifts to Zoo Labs
              Foundation Inc. are tax-deductible to the extent the law allows.
            </p>
          </div>
          <Link href="/donation" className="action" data-fill>
            Donate
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
