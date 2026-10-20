import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Link from 'next/link';
import { useCorpus } from '@/config/corpus';

const models = [
  {
    family: 'Foundation',
    desc: 'General purpose language models for text generation, reasoning, and instruction following.',
    variants: [
      { name: 'zen4-nano', params: '0.6B', context: '32K' },
      { name: 'zen4-mini', params: '1.5B', context: '32K' },
      { name: 'zen4-flash', params: '4B', context: '64K' },
      { name: 'zen4-pro', params: '32B', context: '128K' },
      { name: 'zen4-max', params: '72B', context: '128K' },
      { name: 'zen4-ultra', params: '480B', context: '256K' },
    ],
    hf: 'https://huggingface.co/zenlm',
  },
  {
    family: 'Code',
    desc: 'Specialized for software engineering. 59.2% SWE-bench verified.',
    variants: [
      { name: 'zen4-coder-flash', params: '4B', context: '64K' },
      { name: 'zen4-coder-pro', params: '32B', context: '128K' },
    ],
    hf: 'https://huggingface.co/zenlm/zen4-coder-flash',
  },
  {
    family: 'Multimodal',
    desc: 'Vision, audio, video, and 3D generation from a single architecture.',
    variants: [
      { name: 'zen-omni', params: '72B', context: '128K' },
      { name: 'zen-vl', params: '32B', context: '128K' },
      { name: 'zen-3d', params: '8B', context: '32K' },
      { name: 'zen-director', params: '14B', context: '64K' },
    ],
    hf: 'https://huggingface.co/zenlm',
  },
  {
    family: 'Safety',
    desc: 'Content safety, alignment verification, and guardrails for production deployment.',
    variants: [
      { name: 'zen-guard', params: '1B', context: '8K' },
      { name: 'zen-guard-pro', params: '8B', context: '32K' },
      { name: 'zen-guard-vision', params: '4B', context: '16K' },
    ],
    hf: 'https://huggingface.co/zenlm',
  },
];

const trainingMethods = [
  { name: 'Training-Free GRPO', desc: '99.8% cost reduction. $18 vs $10,000+ for traditional fine-tuning.' },
  { name: 'LoRA / QLoRA', desc: 'Parameter-efficient fine-tuning for single-GPU training.' },
  { name: 'DPO', desc: 'Direct preference optimization without reward model overhead.' },
  { name: 'Full Fine-Tuning', desc: 'Multi-GPU distributed training with DeepSpeed ZeRO-3.' },
  { name: 'DSO Protocol', desc: 'Decentralized semantic optimization via experience ledger.' },
  { name: 'RLHF', desc: 'Reinforcement learning from human feedback for alignment.' },
];

export default function AI() {
  const corpus = useCorpus();
  return (
    <Layout>
      <Seo
        templateTitle="AI Research"
        description={`The Zen model family: ${corpus.models} open-source frontier models from 600M to 480B parameters. Zoo Gym training platform.`}
      />
      <Navbar />

      <main className="text-foreground">
        {/* Hero */}
        <div className="container mx-auto px-4 pb-12" style={{ paddingTop: 'var(--section-y-lg)' }}>
          <p className="text-sm text-muted-foreground tracking-wider mb-4">Zoo Labs Foundation</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Zen Model Family</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            {corpus.models} open-source frontier models from 600M to 480B parameters. Open weights,
            community-trained, formally verified. Built on Qwen3+ architecture.
          </p>
        </div>

        {/* Stats */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">{corpus.models}</p>
                <p className="text-sm text-muted-foreground mt-1">Open Models</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">1T+</p>
                <p className="text-sm text-muted-foreground mt-1">Max Parameters</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">59.2%</p>
                <p className="text-sm text-muted-foreground mt-1">SWE-bench (Code)</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">82.7%</p>
                <p className="text-sm text-muted-foreground mt-1">AIME24 Accuracy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Model Families */}
        {models.map((family) => (
          <div key={family.family} className="border-t border-border">
            <div className="container mx-auto px-4 py-16">
              <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">{family.family}</h2>
                  <p className="text-muted-foreground max-w-2xl">{family.desc}</p>
                </div>
                <a
                  href={family.hf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn transition-colors shrink-0"
                >
                  HuggingFace
                </a>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {family.variants.map((v) => (
                  <div key={v.name} className="card p-4 transition-colors">
                    <p className="text-sm font-mono text-foreground mb-1">{v.name}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{v.params} params</span>
                      <span>{v.context} context</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Zoo Gym */}
        <div id="gym" className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zoo Gym</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Open-source AI training platform. 100+ model support, multi-GPU distributed training,
              8 training methods. 2.5 years of community development.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {trainingMethods.map((method) => (
                <div key={method.name} className="card p-4 transition-colors">
                  <p className="text-sm font-bold text-foreground mb-1">{method.name}</p>
                  <p className="text-xs text-muted-foreground">{method.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="https://github.com/zooai/gym"
                target="_blank"
                rel="noopener noreferrer"
                className="btn transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Desktop App */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zoo AI Desktop</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Run Zen models locally. Free, open-source, private by default. Supports all Zen model sizes
              that fit your hardware. Automatic model download from HuggingFace.
            </p>
            <div className="grid md:grid-cols-3 gap-3 mb-8">
              <div className="card p-4">
                <p className="text-sm font-bold text-foreground mb-1">Local Inference</p>
                <p className="text-xs text-muted-foreground">Run models on your GPU. No data leaves your machine.</p>
              </div>
              <div className="card p-4">
                <p className="text-sm font-bold text-foreground mb-1">Multi-Platform</p>
                <p className="text-xs text-muted-foreground">macOS, Windows, Linux. Built with Tauri.</p>
              </div>
              <div className="card p-4">
                <p className="text-sm font-bold text-foreground mb-1">Mine $AI</p>
                <p className="text-xs text-muted-foreground">Contribute GPU compute to Zoo Network and earn $AI tokens.</p>
              </div>
            </div>
            <a
              href="https://github.com/zooai/zoo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn transition-colors"
            >
              Download
            </a>
          </div>
        </div>

        {/* API */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">API Access</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Access Zen models via the Zoo API at <code className="bg-card px-2 py-1 rounded-md text-foreground font-mono">api.zoo.network</code>
            </p>
            <div className="card p-6 mb-8 font-mono text-sm">
              <p className="text-muted-foreground mb-3"># Chat completions</p>
              <p className="text-foreground">POST /v1/chat/completions</p>
              <p className="text-muted-foreground mt-4 mb-3"># Embeddings</p>
              <p className="text-foreground">POST /v1/embeddings</p>
              <p className="text-muted-foreground mt-4 mb-3"># Models list</p>
              <p className="text-foreground">GET /v1/models</p>
            </div>
            <Link href="/docs" className="btn transition-colors">
              View Documentation
            </Link>
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
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link href="/donation" className="btn btn-primary transition-colors">
                Support Our Research
              </Link>
              <a
                href="https://huggingface.co/zenlm"
                target="_blank"
                rel="noopener noreferrer"
                className="btn transition-colors"
              >
                Browse Models on HuggingFace
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </Layout>
  );
}
