import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function AIPage() {
  const aiProjects = [
    {
      title: "ZenLM",
      description: "Edge AI models for wildlife monitoring and conservation",
      emoji: "🧘",
      link: "https://zenlm.org",
      category: "Foundation Models",
      status: "Active"
    },
    {
      title: "HLLM",
      description: "Hamiltonian Large Language Models with training-free optimization",
      emoji: "⚛️",
      link: "https://papers.zoo.ngo/hllm",
      category: "Research",
      status: "Research"
    },
    {
      title: "Conservation AI",
      description: "Computer vision models for species identification and tracking",
      emoji: "👁️",
      link: "https://papers.zoo.ngo/conservation-ai",
      category: "Applied AI",
      status: "Active"
    },
    {
      title: "Marine DNA Analysis",
      description: "AI-powered genetic sequencing for marine biodiversity",
      emoji: "🧬",
      link: "https://papers.zoo.ngo/marine-dna",
      category: "Bioinformatics",
      status: "Active"
    }
  ]

  const researchPapers = [
    {
      title: "Training-Free GRPO for Wildlife Conservation Models",
      authors: "Zoo Labs Research Team",
      year: 2025,
      link: "https://papers.zoo.ngo/grpo-wildlife"
    },
    {
      title: "Edge AI for Real-Time Species Detection",
      authors: "ZenDAO Contributors",
      year: 2025,
      link: "https://papers.zoo.ngo/edge-species"
    },
    {
      title: "Decentralized Model Governance in Conservation DAOs",
      authors: "Zoo Labs Foundation",
      year: 2024,
      link: "https://papers.zoo.ngo/dao-governance"
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="section-padding-lg border-b border-white/10">
          <div className="container">
            <div className="text-center">
              <h1 className="text-responsive-h1 font-black mb-4 sm:mb-6 tracking-tight">
                AI for Conservation
              </h1>
              <p className="text-responsive-body text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12">
                Advancing wildlife conservation through cutting-edge AI research,
                decentralized model governance, and open-source foundation models.
              </p>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://papers.zoo.ngo"
                  target="_blank"
                  className="px-8 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Browse Research Papers →
                </Link>
                <Link
                  href="https://github.com/zoo-labs"
                  target="_blank"
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  View Code on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AI Projects */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <h2 className="text-responsive-h2 font-bold mb-8 text-center">
              AI/ML Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {aiProjects.map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 hover:border-[#667eea]/50 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{project.emoji}</div>
                    <span className="text-xs px-3 py-1 bg-[#667eea]/20 text-[#667eea] rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#667eea] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-3">{project.category}</p>
                  <p className="text-white/80">{project.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#667eea]">
                    <span>Learn more</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Research */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <h2 className="text-responsive-h2 font-bold mb-8 text-center">
              Latest Research
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {researchPapers.map((paper, index) => (
                <a
                  key={index}
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/3 border border-white/10 rounded-lg p-6 hover:bg-white/5 hover:border-[#667eea]/30 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 hover:text-[#667eea] transition-colors">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-white/60">
                        {paper.authors} • {paper.year}
                      </p>
                    </div>
                    <span className="text-[#667eea] ml-4">→</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="https://papers.zoo.ngo"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg text-[#667eea] hover:bg-[#667eea]/20 transition-all"
              >
                View All Papers at papers.zoo.ngo →
              </Link>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <h2 className="text-responsive-h2 font-bold mb-8 text-center">
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { name: "Qwen3", desc: "Foundation Models" },
                { name: "Rust", desc: "Performance Core" },
                { name: "IPFS", desc: "Decentralized Storage" },
                { name: "Zoo Chain", desc: "AI Blockchain" },
                { name: "GRPO", desc: "Training-Free Optimization" },
                { name: "MCP", desc: "Model Context Protocol" },
                { name: "Candle", desc: "Rust ML Framework" },
                { name: "Hanzo Network", desc: "Compute Infrastructure" }
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/3 border border-white/10 rounded-lg p-4 text-center hover:bg-white/5 hover:border-[#667eea]/30 transition-all"
                >
                  <div className="font-semibold mb-1">{tech.name}</div>
                  <div className="text-xs text-white/60">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 border border-[#667eea]/20 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center">
              <h2 className="text-responsive-h3 font-bold mb-4">
                Join Our AI Research Community
              </h2>
              <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base">
                Contribute to open-source AI models for conservation,
                participate in decentralized governance, and help protect wildlife through technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://discord.gg/AqrYhChx5b"
                  target="_blank"
                  className="px-8 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Join Discord
                </Link>
                <Link
                  href="https://github.com/zoo-labs"
                  target="_blank"
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Contribute on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}