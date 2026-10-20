import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Away from '@/components/Away';
import Link from 'next/link';
import { useCorpus } from '@/config/corpus';

/**
 * What we have published.
 *
 * The numbers come from src/config/corpus.tsx. This page used to state 7 papers
 * and 102 proposals while the home page stated 86 and 149 — the same two facts,
 * four different numbers, because the 7 was really the length of the list below
 * it and the 102 was a literal that stopped being true.
 *
 * The lists here are selections: seven papers and eight proposals, chosen
 * because that many fit. A list is never a count.
 */

const papers = [
  {
    title: 'HLLM with Training-Free GRPO',
    desc: '99.8% cost reduction in AI training ($18 vs $10,000+). 82.7% AIME24 accuracy via Hamiltonian invariant optimization.',
    file: 'hllm-training-free-grpo.pdf',
    year: '2025',
  },
  {
    title: 'Experience Ledger & Decentralized Semantic Optimization',
    desc: 'Byzantine-robust curation protocol. IPFS/Arweave storage, 7680-dim embeddings. $3,726 annual cost vs $50K+ for fine-tuning.',
    file: 'experience-ledger-dso.pdf',
    year: '2025',
  },
  {
    title: 'Zoo Network Architecture',
    desc: 'L2 AI specialization layer with HLLM integration, federated learning, and experience ledger on the Hanzo-Zoo stack.',
    file: 'zoo-network-architecture.pdf',
    year: '2025',
  },
  {
    title: 'Gym Training Platform',
    desc: '100+ model support, 8 training methods, educational democratization. 2.5 years of open-source evolution.',
    file: 'gym-training-platform.pdf',
    year: '2025',
  },
  {
    title: 'Zoo Tokenomics',
    desc: '100% airdrop model, validator requirements, contribute-to-access economics, DAO governance. 2T total supply.',
    file: 'zoo-tokenomics.pdf',
    year: '2025',
  },
  {
    title: 'Zoo Foundation Mission',
    desc: 'Conservation AI, educational AI, frontier AI research. 87K users, 420K models trained, 142 countries.',
    file: 'zoo-foundation-mission.pdf',
    year: '2024',
  },
  {
    title: 'ZIP-002: Zen-Reranker',
    desc: 'Native 7680-dimensional embeddings, BitDelta compression (31.87x), Byzantine aggregation. 94.7% Recall@5.',
    file: 'zip-002-zen-reranker.pdf',
    year: '2025',
  },
]

const proofs = [
  { name: 'DSO.lean', desc: 'Decentralized Semantic Optimization convergence and safety' },
  { name: 'ExperienceLedger.lean', desc: 'Experience ledger Byzantine fault tolerance' },
  { name: 'Personalization.lean', desc: 'Personalization mechanism privacy guarantees' },
  { name: 'Embedding.lean', desc: 'Embedding space metric properties' },
  { name: 'Gym.lean', desc: 'Gym training platform verification' },
  { name: 'ZIP.lean', desc: 'ZIP proposal mechanism correctness' },
  { name: 'AgentNFT.lean', desc: 'Agent NFT ownership and transfer proofs' },
  { name: 'Contribution.lean', desc: 'Contribution tracking integrity' },
  { name: 'Compensation.lean', desc: 'Reward distribution fairness' },
  { name: 'Treasury.lean', desc: 'Treasury management invariants' },
  { name: 'AMM.lean', desc: 'Automated Market Maker solvency' },
  { name: 'Staking.lean', desc: 'Staking mechanism security' },
  { name: 'Bridge.lean', desc: 'Cross-chain bridge safety' },
  { name: 'Token.lean', desc: 'Token contract properties' },
  { name: 'Wave.tla', desc: 'TLA+ protocol wave specification' },
]

export default function Research() {
  const corpus = useCorpus();
  return (
    <Layout>
      <Seo
        templateTitle="Research"
        description={`Open AI research: ${corpus.papers} papers, ${corpus.proposals} proposals, ${corpus.proofs} formal proofs, and the Zen family of frontier models.`}
      />
      <Navbar />

      <div className="bg-background text-foreground">
        {/* Hero */}
        <div className="container mx-auto px-4 py-24">
          <span className="pill eyebrow">Zoo Labs Foundation</span>
          <h1 className="mt-6 mb-8">Research</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Open AI research advancing frontier models, decentralized training, and formal verification.
            Everything we publish is open access.
          </p>
        </div>

        {/* Stats */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: String(corpus.papers), label: 'Papers' },
                { value: String(corpus.proposals), label: 'Proposals' },
                { value: String(corpus.proofs), label: 'Formal proofs' },
                { value: String(corpus.models), label: 'Open models' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl md:text-4xl font-bold text-foreground">{s.value}</p>
                  <p className="eyebrow mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Papers */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected papers</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Seven of {corpus.papers}. Every one of them, as LaTeX source, is at{' '}
              <a
                href="https://github.com/zooai/papers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
              >
                github.com/zooai/papers
              </a>
              .
            </p>
            <div className="space-y-4">
              {papers.map((paper) => (
                <div key={paper.title} className="card p-6 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{paper.title}</h3>
                      <p className="text-sm text-muted-foreground">{paper.desc}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-muted-foreground">{paper.year}</span>
                      <span className="badge">PDF</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Formal Proofs */}
        <div id="proofs" className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Formal Proofs</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Every critical system is formally verified in Lean 4 and TLA+. No hand-waving — machine-checked proofs of correctness.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {proofs.map((proof) => (
                <div key={proof.name} className="card p-4 transition-colors">
                  <p className="text-sm font-mono text-foreground mb-1">{proof.name}</p>
                  <p className="text-xs text-muted-foreground">{proof.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ZIPs */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zoo Improvement Proposals</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {corpus.proposals} specifications governing everything from model architecture to
              tokenomics to governance. Community-driven, publicly reviewed, formally specified.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { id: 'ZIP-0000', title: 'Zoo Ecosystem Architecture & Framework' },
                { id: 'ZIP-0001', title: 'Hamiltonian Large Language Models (HLLMs)' },
                { id: 'ZIP-0003', title: 'Eco-1: z-JEPA Hyper-Modal MoE Architecture' },
                { id: 'ZIP-0005', title: 'Post-Quantum Security for DeFi & NFTs' },
                { id: 'ZIP-0006', title: 'User-Owned AI Models (NFT-Based Ownership)' },
                { id: 'ZIP-0007', title: 'BitDelta + DeltaSoup Personalized AI' },
                { id: 'ZIP-0009', title: 'Unified BitDelta Architecture' },
                { id: 'ZIP-0010', title: 'Zoo Launch Models (Eco-1, Coder-1, Nano-1)' },
              ].map((zip) => (
                <div key={zip.id} className="card p-4 transition-colors flex items-start gap-3">
                  <span className="text-xs font-mono text-muted-foreground shrink-0 mt-1">{zip.id}</span>
                  <p className="text-sm text-foreground">{zip.title}</p>
                </div>
              ))}
            </div>
            <a
              href="https://zips.zoo.ngo"
              target="_blank"
              rel="noopener noreferrer"
              className="action"
            >
              View all {corpus.proposals} proposals
              <Away />
            </a>
          </div>
        </div>

        {/* ResearchDAO */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <div className="card p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">ResearchDAO</h2>
              {/* This block used to read "$8.4M Total Funded · 342 Projects ·
                  14 days Avg. Funding Time", as though a grants programme were
                  running. The $8.4M comes from zoo-fund-impact-thesis, which
                  says funding "would reach $8.4M" AT TEN TIMES current network
                  usage — a projection, printed as money already given. The
                  other two were lifted from unrelated papers: 342 from a
                  conservation-AI deployment section, 14 days from a
                  satellite-ecology evaluation. And "Apply for Funding" pointed
                  at the donation page, which is the wrong direction entirely. */}
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                A design for funding research without gatekeepers: grants governed by
                contract, decisions and disbursements readable on-chain by anyone. It is
                specified and not yet operating — no grant has been made, so there is no
                total to report.
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                The mechanism, and the projection that a mature network could route several
                million a year to conservation from transaction fees alone, are set out in
                the fund impact thesis.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/zooai/papers/tree/main/zoo-fund-impact-thesis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action"
                >
                  Read the thesis
                  <Away />
                </a>
                <a
                  href="https://github.com/zooai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action"
                >
                  View on GitHub
                  <Away />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-border py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Support Open AI Research</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every donation funds open-source models, research papers, and formally verified systems.
              501(c)(3) tax-deductible.
            </p>
            <Link
              href="/donation"
              className="action"
              data-fill
              style={{ ['--fill']: 'var(--blue)' } as React.CSSProperties}
            >
              Support our research
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}
