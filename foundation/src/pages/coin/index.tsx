import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';
import { Radio, Cpu, Globe, Activity, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useCorpus } from '@/config/corpus';

export default function SensorMeshPage() {
  const corpus = useCorpus();
  return (
    <Layout>
      <Seo
        templateTitle="Decentralized Compute & Mining Network"
        description="Global decentralized GPU compute network powering Proof-of-Useful-Work AI mining, Zoo Gym RL alignment, and sovereign open intelligence."
      />
      <Navbar />

      <div className="bg-background text-foreground min-h-screen">
        {/* Hero Section */}
        <div className="container py-20">
          <div className="badge badge-accent mb-6">
            <Radio size={14} />
            <span>Distributed GPU Mesh &middot; Proof-of-Useful-Work</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Decentralized Compute & AI Mining Network
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
            A worldwide sovereign compute network connecting independent GPU clusters, edge nodes, and
            open-source researchers. Running Zoo Gym (Training-Free GRPO) to train and align frontier reasoning models.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://github.com/zooai/gym"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Cpu className="w-4 h-4" />
              <span>Explore Zoo Gym (GRPO) ↗</span>
            </a>
            <a
              href="https://papers.zoo.ngo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <span>Read PoUW Whitepapers ↗</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mesh Capabilities Grid */}
        <div className="container py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 flex flex-col gap-4">
              <div className="disc" style={{ '--hue': 'var(--berry)' } as React.CSSProperties}>
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Proof-of-Useful-Work (PoUW)</h3>
              <p className="text-sm text-muted-foreground">
                Deterministic gradient verification and Hamilton graph reductions allowing GPU miners to produce verifiable AI training steps.
              </p>
            </div>

            <div className="card p-6 flex flex-col gap-4">
              <div className="disc" style={{ '--hue': 'var(--blue)' } as React.CSSProperties}>
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Zoo Gym Reinforcement Learning</h3>
              <p className="text-sm text-muted-foreground">
                Distributed training framework for Training-Free GRPO and Active Semantic Optimization (ASO) achieving 99.8% cost reductions.
              </p>
            </div>

            <div className="card p-6 flex flex-col gap-4">
              <div className="disc" style={{ '--hue': 'var(--green)' } as React.CSSProperties}>
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">100% Open Weights & Code</h3>
              <p className="text-sm text-muted-foreground">
                All foundation model checkpoints, training recipes, and RFC standards are published freely under open MIT/Apache 2.0 licenses.
              </p>
            </div>
          </div>
        </div>

        {/* Live Network Telemetry Status */}
        <div className="container py-12">
          <div className="card p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold">Open Compute Network Status</h2>
              </div>
              <span className="badge badge-online font-mono">
                100% OPEN SOURCE
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{corpus.papers}</div>
                <div className="text-xs text-muted-foreground mt-1">Published Research Papers</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--berry)' }}>{corpus.models}</div>
                <div className="text-xs text-muted-foreground mt-1">Zen Foundation Models</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-emerald-400">99.8%</div>
                <div className="text-xs text-muted-foreground mt-1">Training Compute Savings</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-orange-400">501(c)(3)</div>
                <div className="text-xs text-muted-foreground mt-1">Tax-Exempt Public Charity</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}