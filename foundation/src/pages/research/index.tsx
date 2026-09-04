import Link from 'next/link';
import React, { useState } from 'react';

import Footer from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Section, { Band } from '@/components/Section';
import Seo from '@/components/Seo';

interface Paper {
  title: string;
  category: 'ai' | 'bioacoustics' | 'genetics' | 'habitat' | 'desci';
  authors: string;
  venue: string;
  year: string;
  abstract: string;
  link: string;
  isLabs?: boolean;
}

const PAPERS: Paper[] = [
  {
    title: "Marine Bioacoustics & Cetacean Language Modeling with ZenLM",
    category: "bioacoustics",
    authors: "Zoo Labs Foundation & Hanzo AI Research",
    venue: "Journal of Marine Science & AI",
    year: "2026",
    abstract: "Decoding Arctic beluga whale vocalizations, signature whistles, and social acoustic patterns using self-supervised audio foundation models and real-time hydrophone streams.",
    link: "https://zoolabs.io",
    isLabs: true,
  },
  {
    title: "Gym Training Platform: Decentralized Model Training at Scale",
    category: "ai",
    authors: "Zoo Labs Foundation",
    venue: "Zoo AI Technical Report",
    year: "2025",
    abstract: "Infrastructure for distributed deep learning training across heterogeneous edge compute nodes with 99% cost reduction via TF-GRPO for wildlife conservation models.",
    link: "https://github.com/zooai/papers/raw/main/pdfs/gym-training-platform.pdf",
  },
  {
    title: "Experience Ledger: Decentralized Semantic Optimization for Conservation",
    category: "desci",
    authors: "Zoo Labs Foundation",
    venue: "DeSci Quarterly",
    year: "2025",
    abstract: "Community-driven semantic optimization protocol for collaborative ecological model improvement with Byzantine-robust field data aggregation across 40+ sanctuaries.",
    link: "https://github.com/zooai/papers/raw/main/pdfs/experience-ledger-dso.pdf",
  },
  {
    title: "HLLM: Training-Free GRPO for Environmental Language Models",
    category: "ai",
    authors: "Zoo Labs Foundation",
    venue: "ArXiv Pre-Print",
    year: "2025",
    abstract: "Training-free group relative policy optimization achieving $18 training cost vs $10,000+ traditional fine-tuning with 100× data efficiency on wildlife taxonomy tasks.",
    link: "https://github.com/zooai/papers/raw/main/pdfs/hllm-training-free-grpo.pdf",
  },
  {
    title: "Zoo Network Architecture: Proof-of-Conservation Consensus",
    category: "desci",
    authors: "Zoo Labs Foundation",
    venue: "Zoo Protocol Specification",
    year: "2025",
    abstract: "Technical architecture for the Zoo decentralized AI and ecological sensor network with proof-of-contribution telemetry verification.",
    link: "https://github.com/zooai/papers/raw/main/pdfs/zoo-network-architecture.pdf",
  },
  {
    title: "ZIP-002: Zen Reranker for Biodiversity Data Retrieval",
    category: "ai",
    authors: "Zoo Labs Foundation",
    venue: "Zoo Improvement Proposal",
    year: "2025",
    abstract: "Specification for cross-encoder ecological search and taxonomical retrieval, enabling rapid field lookups of endangered fauna and flora.",
    link: "https://github.com/zooai/papers/raw/main/pdfs/zip-002-zen-reranker.pdf",
  },
  {
    title: "Autonomous Edge Computer Vision for Solar-Powered Camera Traps",
    category: "habitat",
    authors: "Zoo Labs Field Team & Conservation International",
    venue: "Remote Sensing in Ecology",
    year: "2025",
    abstract: "Real-time edge classification of 450 African and Asian species running on low-wattage solar camera traps with instant anti-poaching satellite alerts.",
    link: "https://zoolabs.io",
    isLabs: true,
  },
  {
    title: "eDNA Biodiversity Mapping in Tropical Rainforest Canopies",
    category: "genetics",
    authors: "Santos, M., Patel, R., Zoo Labs Research",
    venue: "Nature Conservation",
    year: "2025",
    abstract: "Metagenomic barcode sequencing across 50,000 sq km of Amazonian canopy establishing baseline biodiversity registers prior to climatic tipping points.",
    link: "https://zoolabs.io",
  },
  {
    title: "Genetic Rescue Protocols for Critically Endangered Red Wolf Populations",
    category: "genetics",
    authors: "Zoo Labs Wildlife Sanctuary Team",
    venue: "Conservation Genetics Journal",
    year: "2025",
    abstract: "Genome sequencing and assisted reproductive genomics for the remaining 25 wild Red Wolves, preventing inbreeding depression and boosting immunological resistance.",
    link: "https://zoo.ngo/animals/red_wolf",
  },
  {
    title: "Coral Reef Thermal Refugia Forecasting via Physics-Informed Neural Networks",
    category: "habitat",
    authors: "Chen, S., Liu, W., Zoo Labs Foundation",
    venue: "Ocean Science & Climate Review",
    year: "2025",
    abstract: "Predicting heat-tolerant coral genotypes and marine thermal refugia under warming sea scenarios to accelerate targeted reef restoration.",
    link: "https://zoolabs.io",
  },
];

/**
 * One accent, spent once.
 *
 * The stat row used to run four hues at once — emerald, sky, teal, amber — the
 * lab banner was an emerald-to-cyan gradient, and one word inside the H1 was
 * green. Four hues in a row is not a system; it reads as four unrelated facts.
 * The numbers are now the page's own ink and `--brand` is left for the one
 * place it means something.
 *
 * The links were `emerald-600` (#059669), which is 3.76:1 on white and fails
 * AA for body text. `--brand` is #047857 — 5.18:1 on the page, 4.96:1 on a
 * card — so a link is readable without a second green.
 */
const METRICS = [
  { value: '130+', label: 'Research publications' },
  { value: '2.4M', label: 'Hectares monitored' },
  { value: '500+', label: 'Bioacoustic sensors' },
  { value: '$10M+', label: 'DeSci grants allocated' },
];

const TABS = [
  { id: 'all', label: 'All topics' },
  { id: 'bioacoustics', label: 'Bioacoustics' },
  { id: 'ai', label: 'Ecological AI' },
  { id: 'genetics', label: 'eDNA and genetics' },
  { id: 'habitat', label: 'Habitat sensing' },
  { id: 'desci', label: 'DeSci and protocols' },
];

const LAB_WORK = [
  'Live beluga chat and audio analysis',
  'Gym TF-GRPO distributed training',
  'Satellite telemetry ingestion',
  'Open source model weights',
];

export default function Research() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPapers =
    activeCategory === 'all'
      ? PAPERS
      : PAPERS.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <Seo
        templateTitle="Research & Science - Zoo Labs Foundation"
        description="130+ open-access scientific publications, bioacoustics, ecological AI models, and field conservation research."
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section
          style={{
            borderBottom: '1px solid var(--border)',
            paddingBlock: 'clamp(3rem, 8vw, 6rem)',
          }}
        >
          <Band>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="pill">501(c)(3) open science foundation</span>
              <span className="pill">130+ publications</span>
            </div>
            <h1 className="display mb-6" style={{ maxWidth: '20ch' }}>
              Open-access conservation research
            </h1>
            <p className="lede" style={{ maxWidth: '42rem' }}>
              Combining ecological AI, marine bioacoustics, environmental genomics and
              community stewardship to safeguard biodiversity.
            </p>

            <dl
              className="mt-12 grid grid-cols-2 gap-6 pt-10 sm:grid-cols-4"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {METRICS.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="m-0">
                    <span className="block text-2xl font-semibold tracking-tight">
                      {m.value}
                    </span>
                    <span
                      className="mt-1 block text-[13px]"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {m.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Band>
        </section>

        {/* Zoo Labs */}
        <Section tone="card" edge="block">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">Applied AI and marine bioacoustics lab</p>
              <h2 className="title mt-3">Zoo Labs — where AI meets the natural world</h2>
              <p className="lede mt-4">
                Zoo Labs is the computational research arm of Zoo Labs Foundation. Explore
                the interactive beluga whale language interface, the wildlife edge models
                and the open datasets.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://zoolabs.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action"
                  data-fill=""
                >
                  Explore Zoo Labs <span aria-hidden>↗</span>
                </a>
                <a
                  href="https://zoo.fund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action"
                >
                  Zoo Fund DeSci grants <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <ul className="card space-y-3 p-6">
                {LAB_WORK.map((item) => (
                  <li key={item} className="text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Papers */}
        <Section>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Open access</p>
              <h2 className="title mt-3">Publications and whitepapers</h2>
              <p className="lede mt-2">
                Peer-reviewed papers, pre-prints and protocols.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className="pill"
                    aria-pressed={active}
                    style={
                      active
                        ? {
                            background: 'var(--brand)',
                            color: 'var(--brand-foreground)',
                            borderColor: 'transparent',
                          }
                        : undefined
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredPapers.map((paper) => (
              <div
                key={paper.title}
                className="card flex flex-col justify-between p-8"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="pill">{paper.category}</span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {paper.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-snug">{paper.title}</h3>
                  <p className="mt-2 text-xs font-medium" style={{ color: 'var(--brand)' }}>
                    {paper.authors}
                  </p>
                  <p
                    className="mt-1 text-xs italic"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {paper.venue}
                  </p>
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {paper.abstract}
                  </p>
                </div>

                <div
                  className="mt-6 flex items-center justify-between gap-3 border-t pt-4"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Link
                    href={paper.link}
                    className="more"
                    style={{ color: 'var(--brand)' }}
                  >
                    {paper.isLabs ? 'Explore at Zoo Labs' : 'Read the paper'}{' '}
                    <span aria-hidden>→</span>
                  </Link>
                  {paper.isLabs && <span className="pill">Interactive model</span>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <Footer />
    </Layout>
  );
}
