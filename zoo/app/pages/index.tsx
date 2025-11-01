import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Github, FileText, Cpu, Shield, Zap, ExternalLink, ChevronRight, Brain, Server } from 'lucide-react'

export default function Home() {
  const [downloadOS, setDownloadOS] = useState<'windows' | 'mac' | 'linux'>('mac')

  useEffect(() => {
    // Detect OS for download button
    const platform = navigator.platform.toLowerCase()
    if (platform.includes('win')) {
      setDownloadOS('windows')
    } else if (platform.includes('linux')) {
      setDownloadOS('linux')
    } else {
      setDownloadOS('mac')
    }
  }, [])

  const getDownloadLink = () => {
    const baseUrl = 'https://github.com/zooai/app/releases/latest/download/'
    switch (downloadOS) {
      case 'windows':
        return `${baseUrl}zoo-desktop-win.exe`
      case 'linux':
        return `${baseUrl}zoo-desktop-linux.AppImage`
      default:
        return `${baseUrl}zoo-desktop-mac.dmg`
    }
  }

  const getOSLabel = () => {
    switch (downloadOS) {
      case 'windows':
        return 'Download for Windows'
      case 'linux':
        return 'Download for Linux'
      default:
        return 'Download for macOS'
    }
  }

  return (
    <>
      <Head>
        <title>Zoo AI - Local Private AI Research Platform</title>
        <meta name="description" content="Zoo AI - Local private AI research platform with desktop app, NVIDIA DGX Sparks integration, and cutting-edge language models" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Brain className="w-8 h-8" />
                <span className="text-xl font-bold">Zoo AI</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link href="https://github.com/zooai/app" className="hover:text-primary transition-colors">
                  Desktop App
                </Link>
                <Link href="https://zenlm.org" className="hover:text-primary transition-colors">
                  ZenLM
                </Link>
                <Link href="https://papers.zoo.ngo" className="hover:text-primary transition-colors">
                  Research
                </Link>
                <Link href="#dgx" className="hover:text-primary transition-colors">
                  DGX Sparks
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="https://github.com/zooai"
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Local Private AI
                <span className="block text-primary/70">Research Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Run state-of-the-art AI models locally with complete privacy.
                Powered by ZenLM models and NVIDIA DGX infrastructure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <a
                  href={getDownloadLink()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  {getOSLabel()}
                </a>
                <Link
                  href="https://github.com/zooai/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-input rounded-lg hover:bg-secondary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </Link>
              </div>

              <div className="flex gap-2 justify-center text-sm text-muted-foreground">
                <button
                  onClick={() => setDownloadOS('windows')}
                  className={`px-3 py-1 rounded ${downloadOS === 'windows' ? 'bg-secondary' : 'hover:bg-secondary/50'} transition-colors`}
                >
                  Windows
                </button>
                <button
                  onClick={() => setDownloadOS('mac')}
                  className={`px-3 py-1 rounded ${downloadOS === 'mac' ? 'bg-secondary' : 'hover:bg-secondary/50'} transition-colors`}
                >
                  macOS
                </button>
                <button
                  onClick={() => setDownloadOS('linux')}
                  className={`px-3 py-1 rounded ${downloadOS === 'linux' ? 'bg-secondary' : 'hover:bg-secondary/50'} transition-colors`}
                >
                  Linux
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-6 rounded-lg border">
                  <Shield className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">100% Private</h3>
                  <p className="text-muted-foreground">
                    Your data never leaves your device. All AI processing happens locally with no cloud dependencies.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Zap className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Optimized Performance</h3>
                  <p className="text-muted-foreground">
                    Hardware-accelerated inference with support for NVIDIA GPUs and Apple Silicon.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Brain className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">State-of-the-Art Models</h3>
                  <p className="text-muted-foreground">
                    Access to ZenLM family models including Zen-0.6B to Zen-32B variants.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ZenLM Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl border p-8 md:p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-10 h-10 text-primary" />
                <h2 className="text-3xl font-bold">ZenLM Models</h2>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                Our family of language models built on Qwen3 architecture, optimized for local deployment
                with superior performance-to-size ratios.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Model Variants</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span>Zen-0.6B Nano - Edge devices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span>Zen-7B Base - Desktop performance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span>Zen-32B Pro - Research grade</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Capabilities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span>Multi-lingual support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span>Code generation & analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span>Mathematical reasoning</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="https://zenlm.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Learn more at zenlm.org
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* NVIDIA DGX Section */}
        <section id="dgx" className="py-16 px-6 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Server className="w-10 h-10 text-primary" />
                  <h2 className="text-3xl font-bold">NVIDIA DGX Sparks</h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  As an NVIDIA Inception partner, we offer enterprise-grade AI infrastructure
                  powered by DGX Sparks for organizations requiring dedicated compute.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card p-8 rounded-lg border">
                  <Cpu className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-2xl font-semibold mb-4">Enterprise Solutions</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <span>8x NVIDIA H100 GPUs per unit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <span>640GB HBM3 GPU memory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <span>On-premises deployment options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <span>Full software stack included</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-8 rounded-lg border">
                  <Zap className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-2xl font-semibold mb-4">Use Cases</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <span>Large language model training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <span>Multi-modal AI research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <span>Private cloud AI deployment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <span>High-performance inference</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-muted-foreground mb-4">
                  Contact us for enterprise pricing and deployment options
                </p>
                <a
                  href="mailto:enterprise@zoo.ai"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Sales
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Research Papers Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Research & Publications</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Advancing the state of the art in local AI and privacy-preserving machine learning
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2">
                    Training-Free GRPO: Semantic Advantages in Language Models
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Novel approach to improving LLM performance without gradient updates through context optimization.
                  </p>
                  <Link
                    href="https://papers.zoo.ngo/grpo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Read Paper
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2">
                    Hamiltonian Large Language Models
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Physics-inspired approach to balancing model capacity and computational efficiency.
                  </p>
                  <Link
                    href="https://papers.zoo.ngo/hllm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Read Paper
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2">
                    Edge-First AI Architecture
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Design principles for deploying large language models on resource-constrained devices.
                  </p>
                  <Link
                    href="https://papers.zoo.ngo/edge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Read Paper
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2">
                    Private Inference Networks
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Zero-knowledge proofs and homomorphic encryption for privacy-preserving AI inference.
                  </p>
                  <Link
                    href="https://papers.zoo.ngo/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Read Paper
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="https://papers.zoo.ngo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-input rounded-lg hover:bg-secondary transition-colors"
                >
                  View All Research
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6" />
                  <span className="font-bold">Zoo AI</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Local private AI research platform
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="https://github.com/zooai/app" className="text-muted-foreground hover:text-primary transition-colors">
                      Desktop App
                    </Link>
                  </li>
                  <li>
                    <Link href="https://zenlm.org" className="text-muted-foreground hover:text-primary transition-colors">
                      ZenLM Models
                    </Link>
                  </li>
                  <li>
                    <Link href="#dgx" className="text-muted-foreground hover:text-primary transition-colors">
                      DGX Sparks
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Research</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="https://papers.zoo.ngo" className="text-muted-foreground hover:text-primary transition-colors">
                      Papers
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/zooai" className="text-muted-foreground hover:text-primary transition-colors">
                      Open Source
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="https://hanzo.ai" className="text-muted-foreground hover:text-primary transition-colors">
                      Hanzo AI
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:enterprise@zoo.ai" className="text-muted-foreground hover:text-primary transition-colors">
                      Contact Sales
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>© 2025 Zoo AI. All rights reserved. | NVIDIA Inception Partner | Techstars '17</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}