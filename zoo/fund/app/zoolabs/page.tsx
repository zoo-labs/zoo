import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export const metadata = {
  title: 'ZooLabs | Zoo Fund',
  description: 'ZooLabs is Zoo Fund\'s interdisciplinary research network pioneering conservation science through AI, immersive experiences, and on-chain funding mechanisms.',
}

export default function ZooLabsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding-lg border-b border-white/10">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-responsive-h1 font-black mb-6 tracking-tight bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                ZooLabs
              </h1>
              <p className="text-2xl text-white/80 mb-4 leading-relaxed">
                We're building a community where scientists, conservationists, and technology innovators can collaborate to accelerate progress in wildlife and ocean conservation
              </p>
              <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                ZooLabs is Zoo Fund's in-house network of interdisciplinary scientists dedicated to pioneering cutting-edge conservation science. Our mission is to radically extend ecosystem healthspan and biodiversity by developing breakthrough research while empowering democratic ownership of intellectual property through Intellectual Property NFTs (IP-NFTs).
              </p>
              <div className="mt-10 flex gap-4 justify-center">
                <Link
                  href="/launch"
                  className="px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  Apply for Funding
                </Link>
                <a
                  href="https://papers.zoo.ngo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Research Papers
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Fellowship Program */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 border border-[#667eea]/20 rounded-2xl p-8 mb-8">
                <h2 className="text-responsive-h2 font-bold mb-4">ZooLabs Fellowship Program</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  In order to attract top talent into ZooLabs, Zoo Fund runs a Fellowship program targeting creative and independent thinkers passionate about conservation to collaborate, ideate, and develop groundbreaking ideas. Fellows receive funding, access to AI infrastructure (ZenLM), immersive experience development tools, and on-chain IP ownership mechanisms.
                </p>
              </div>
              <div className="text-center">
                <Link
                  href="/launch"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg text-[#667eea] hover:bg-[#667eea]/20 transition-all"
                >
                  <span>Apply for Fellowship</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-responsive-h2 font-bold mb-4 text-center">Our Approach</h2>
              <p className="text-white/70 text-center mb-12 max-w-3xl mx-auto">
                Traditional conservation often constraints disruptive innovation by favouring incremental advancements. Despite increased funding and research in the field, transformative breakthroughs have declined. ZooLabs addresses this by:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-2xl font-bold mb-3">Bold Ideas</h3>
                  <p className="text-white/70 leading-relaxed">
                    We embrace high-risk, high-reward research often overlooked by traditional conservation labs. From AI-powered species identification to blockchain-based carbon credits, we tackle the hardest problems.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8">
                  <div className="text-4xl mb-4">⏱️</div>
                  <h3 className="text-2xl font-bold mb-3">Focused Seasons</h3>
                  <p className="text-white/70 leading-relaxed">
                    4-month deep dives into specific conservation areas drive rapid progress. Each season targets urgent challenges—ocean acidification, poaching prevention, habitat restoration.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-2xl font-bold mb-3">Diverse Expertise</h3>
                  <p className="text-white/70 leading-relaxed">
                    Cross-disciplinary collaboration sparks unexpected breakthroughs. Biologists, AI researchers, blockchain developers, and field conservationists work together on shared goals.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-3">IP Ownership</h3>
                  <p className="text-white/70 leading-relaxed">
                    Contributors own a portion of the intellectual property they help create through IP-NFTs. This ensures fair compensation and incentivizes breakthrough research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How ZooLabs Works */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-responsive-h2 font-bold mb-8 sm:mb-12 text-center">How ZooLabs Works</h2>
              <p className="text-white/70 text-center mb-12 max-w-3xl mx-auto">
                Our research model operates in focused seasons, each lasting four months. Here's how we drive innovation:
              </p>

              <div className="space-y-6">
                {[
                  {
                    number: '01',
                    title: 'Team Formation',
                    description: 'We build interdisciplinary teams of conservation scientists, AI researchers, and domain experts for each season. Teams are assembled based on complementary skills and shared passion for the challenge.'
                  },
                  {
                    number: '02',
                    title: 'Ideation',
                    description: 'Teams identify novel opportunities and develop transformative project ideas. We prioritize high-impact, technically feasible approaches that could scale globally if successful.'
                  },
                  {
                    number: '03',
                    title: 'Initial Experiments',
                    description: 'Projects begin with computational work, AI model prototypes, or small-scale field experiments. Early validation reduces risk before committing to full-scale deployment.'
                  },
                  {
                    number: '04',
                    title: 'Community Engagement',
                    description: 'Regular updates and data sharing keep our community informed. All research artifacts (models, datasets, findings) are published on zips.zoo.ngo and papers.zoo.ngo for transparency.'
                  },
                  {
                    number: '05',
                    title: 'Development & Spin-Outs',
                    description: 'Successful projects advance to in-depth research and potential spin-out creation. IP-NFTs are minted, enabling community ownership and future revenue sharing from conservation tech licensing.'
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-6 items-start bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
                    <div className="text-5xl font-black text-[#667eea]/30 shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-white/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Focus */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-responsive-h2 font-bold mb-4 text-center">Technology-Driven Conservation</h2>
              <p className="text-white/70 text-center mb-12 max-w-3xl mx-auto">
                ZooLabs leverages cutting-edge technology to multiply conservation impact:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold mb-3">ZenLM AI</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Edge AI models for species identification, habitat monitoring, and ranger assistance. Works offline in remote field locations.
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-5xl mb-4">🌐</div>
                  <h3 className="text-xl font-bold mb-3">Immersive Experiences</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Virtual reality expeditions and interactive simulations that bring conservation challenges to global audiences, driving awareness and funding.
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-5xl mb-4">⛓️</div>
                  <h3 className="text-xl font-bold mb-3">On-Chain Funding</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Transparent, verifiable funding mechanisms through blockchain. Every donation tracked, impact measured, IP ownership democratized through NFTs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-responsive-h2 font-bold mb-8 sm:mb-12 text-center">Research Partners</h2>
              <p className="text-white/60 text-center mb-12">
                Collaborating with leading institutions at the cutting edge of conservation science
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  'Hanzo AI Research',
                  'Wildlife Conservation Network',
                  'Ocean Conservancy',
                  'Shark Stewards',
                  'Conservation International',
                  'World Wildlife Fund'
                ].map((partner, index) => (
                  <div key={index} className="bg-white/3 border border-white/10 rounded-xl p-6 text-center hover:border-[#667eea]/50 transition-all">
                    <p className="font-semibold text-white/80">{partner}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding-lg">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-responsive-h2 font-bold mb-6">
                Are you working on the next conservation breakthrough?
              </h2>
              <p className="text-xl text-white/70 mb-10">
                Get funding for your work through ZooLabs. We support bold ideas in AI-powered conservation, ocean science, wildlife protection, and ecosystem restoration.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/launch"
                  className="px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  Apply for Funding
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Explore DAOs
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
