import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';

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

export default function Research() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPapers = activeCategory === 'all'
    ? PAPERS
    : PAPERS.filter(p => p.category === activeCategory);

  return (
    <Layout>
      <Seo
        templateTitle="Research & Science - Zoo Labs Foundation"
        description="130+ open-access scientific publications, bioacoustics, ecological AI models, and field conservation research."
      />
      <Navbar />

      <main className="bg-white text-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-50/50 via-white to-white py-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  🌿 501(c)(3) Open Science Foundation
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                  130+ Publications
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-gray-950 tracking-tight leading-tight mb-6">
                Open-Access Conservation <span className="text-emerald-600">Research</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                Combining benevolent ecological AI, marine bioacoustics, environmental genomics, and community stewardship to safeguard biodiversity.
              </p>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-gray-200">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-3xl lg:text-4xl font-black text-emerald-600">130+</p>
                <p className="text-xs font-semibold text-gray-600 mt-1">Research Publications</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-3xl lg:text-4xl font-black text-sky-600">2.4M</p>
                <p className="text-xs font-semibold text-gray-600 mt-1">Hectares Monitored</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-3xl lg:text-4xl font-black text-teal-600">500+</p>
                <p className="text-xs font-semibold text-gray-600 mt-1">Bioacoustic Sensors</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-3xl lg:text-4xl font-black text-amber-600">$10M+</p>
                <p className="text-xs font-semibold text-gray-600 mt-1">DeSci Grants Allocated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Zoo Labs Hero Banner */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 text-white p-8 md:p-12 shadow-xl">
              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md mb-3">
                    🔬 Applied AI & Marine Bioacoustics Lab
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                    Zoo Labs — Where AI Meets the Natural World
                  </h2>
                  <p className="text-base sm:text-lg text-emerald-100 leading-relaxed mb-6 max-w-2xl">
                    Zoo Labs is the computational research arm of Zoo Labs Foundation. Explore our interactive Beluga whale language interface, wildlife edge models, and open datasets.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="https://zoolabs.io"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-base shadow-md transition-all"
                    >
                      <span>Explore Zoo Labs (zoolabs.io)</span>
                      <span className="text-emerald-700">↗</span>
                    </Link>
                    <Link
                      href="https://zoo.fund"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white border border-white/20 font-bold text-base transition-colors"
                    >
                      <span>Zoo Fund DeSci Grants ↗</span>
                    </Link>
                  </div>
                </div>
                <div className="md:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🐬</span>
                    <span className="font-semibold">Live Beluga Chat & Audio Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <span className="font-semibold">Gym TF-GRPO Distributed Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📡</span>
                    <span className="font-semibold">Satellite Telemetry Ingestion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📖</span>
                    <span className="font-semibold">Open Source Model Weights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs & Papers Grid */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-950">Scientific Publications & Whitepapers</h2>
                <p className="text-gray-600 text-base mt-1">Peer-reviewed papers, pre-prints, and protocols.</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Topics' },
                  { id: 'bioacoustics', label: '🐬 Bioacoustics' },
                  { id: 'ai', label: '⚡ Ecological AI' },
                  { id: 'genetics', label: '🧬 eDNA & Genetics' },
                  { id: 'habitat', label: '🌿 Habitat Sensing' },
                  { id: 'desci', label: '🌐 DeSci & Protocols' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === tab.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Papers List */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPapers.map((paper, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                        {paper.category}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">{paper.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                      {paper.title}
                    </h3>
                    <p className="text-xs font-medium text-emerald-700 mb-1">{paper.authors}</p>
                    <p className="text-xs text-gray-500 italic mb-4">{paper.venue}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {paper.abstract}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={paper.link}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 group"
                    >
                      <span>{paper.isLabs ? 'Explore at Zoo Labs' : 'Read Paper'}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                    {paper.isLabs && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                        🔬 Interactive Lab Model
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  );
}