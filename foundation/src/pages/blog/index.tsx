import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { useCorpus } from '@/config/corpus';

/**
 * Research, not a newsroom.
 *
 * This page carried six invented news stories: a $500K grant approved, twelve
 * tigers rescued from the illegal wildlife trade, 98% species accuracy across
 * 2,300 species — two of them bylined to people who do not exist, "Dr. Sarah
 * Chen" and "Michael Torres". A credentialled name on a fabricated result is
 * how a reader stops checking.
 *
 * The species paper reports 91.2%, 94.7% and 95% on its own benchmarks, and
 * never 98%. So the page now lists work that was actually published, each entry
 * linking to the paper it summarises, and every summary drawn from that paper's
 * own abstract. One author, and it is the foundation.
 */

type Post = { title: string; blurb: string; topic: string; paper: string; customUrl?: string };

const POSTS: Post[] = [
  {
    topic: 'Life preservation',
    title: 'Training an autonomous system to value human life over its own hardware',
    blurb:
      'Factorial evaluations show surface syntax dominates output variance (72.57%) and models contradict themselves 51% of the time on opposing choices. Lifeguard introduces a tripartite objective and structural complement head to enforce human life preservation and eliminate hardware self-preservation bias.',
    paper: 'lifeguard',
    customUrl: 'https://github.com/zooai/lifeguard',
  },
  {
    topic: 'Biodiversity',
    title: 'Identifying a species from almost no examples',
    blurb:
      'Most classifiers need hundreds of labelled images per species. Most species do not have them — which is why automated monitoring stalls exactly where biodiversity is richest. This is what few-shot recognition can and cannot do about that.',
    paper: 'zoo-species-classification',
  },
  {
    topic: 'Field methods',
    title: 'The camera trap images nobody has looked at',
    blurb:
      'Camera networks produce millions of frames a year across conservation sites, and most are never processed because a person has to look at them. Deep learning for population monitoring and habitat assessment, and where it still needs a human.',
    paper: 'zoo-conservation-ai',
  },
  {
    topic: 'Climate',
    title: 'Where a species will be able to live',
    blurb:
      'Classical distribution models lean on correlations that break as the climate moves outside their training range. A neural approach to predicting range shifts, so protection is planned for where an animal is going rather than where it has been.',
    paper: 'zoo-habitat-modeling',
  },
  {
    topic: 'Privacy',
    title: 'Sharing a model without sharing the recordings',
    blurb:
      'Wildlife monitoring data is sensitive — the location of an endangered animal most of all — and it sits with independent institutions running different sensors. Federated training with differential privacy, so sites improve a shared model and keep their own data.',
    paper: 'zoo-federated-wildlife',
  },
  {
    topic: 'Accountability',
    title: 'Most forest carbon offsets may not be real',
    blurb:
      'Analyses suggest 70–90% of certified forest carbon credits represent reductions that did not happen. Measurement and verification infrastructure for nature-based credits, aimed at the part of the market that cannot currently be checked.',
    paper: 'zoo-carbon-credits',
  },
  {
    topic: 'Public science',
    title: 'What to do with a billion volunteer observations',
    blurb:
      'Citizen science generates enormous quantities of biodiversity data every year, and quality is the standing problem. A platform design for collection that stays usable once it is collected.',
    paper: 'zoo-citizen-science',
  },
];

const postUrl = (post: Post) => post.customUrl || `https://github.com/zooai/papers/tree/main/${post.paper}`;

export default function Blog() {
  const corpus = useCorpus();
  return (
    <Layout>
      <Seo
        templateTitle="Research notes"
        description="What Zoo Labs Foundation has published, in plain language, with a link to every paper."
      />
      <Navbar />

      <section className="container py-24">
        <h1 className="text-5xl md:text-7xl font-black">Research notes</h1>
        <p className="mt-6 text-lg text-secondary" style={{ maxWidth: '58ch' }}>
          Plain-language summaries of work the foundation has published. Each one links to
          the paper it describes, so you can check the summary against the source.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="https://papers.zoo.ngo" className="action" data-fill>
            All {corpus.papers} papers
          </a>
          <a href="https://zips.zoo.ngo" className="action">
            {corpus.proposals} proposals
          </a>
        </div>
      </section>

      <section className="container py-24">
        <ul className="grid-cards">
          {POSTS.map((post) => (
            <li key={post.paper} className="card p-6">
              <span
                className="text-xs tracking-wide font-bold"
                style={{ color: 'var(--magenta)' }}
              >
                {post.topic}
              </span>
              <h2 className="mt-2 text-xl font-bold">{post.title}</h2>
              <p className="mt-3 text-secondary">{post.blurb}</p>
              <a
                href={postUrl(post)}
                className="mt-4 inline-flex font-bold"
              >
                {post.customUrl ? 'View framework & dataset →' : 'Read the paper →'}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="container py-24">
        <div className="card p-8 flex flex-wrap items-center justify-between gap-6">
          <div style={{ maxWidth: '52ch' }}>
            <h2 className="text-2xl md:text-3xl font-black">Ask about any of it</h2>
            <p className="mt-3 text-secondary">
              Blue is a beluga whale and a marine scientist, and will say plainly when
              something is not known.
            </p>
          </div>
          <a href="https://zoolabs.io" className="action" data-fill>
            Ask Blue
          </a>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
