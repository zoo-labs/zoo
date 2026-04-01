import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FundingCard } from '@/components/funding-card'
import { OnChainMetrics } from '@/components/on-chain-metrics'
import { getDAO, daos } from '@/lib/daos'
import {
  MarketHypothesisSection,
  ResearchAreasSection,
  TokenomicsSection,
  TeamSection,
  RoadmapSection,
  ValueCaptureSection,
  ResourcesSection,
  NewsSection,
  ResearchArtifactsSection,
} from '@/components/dao-sections'
import { DAOTabs } from '@/components/dao-tabs'
import { ProposalsList } from '@/components/proposals-list'
import { TreasuryView } from '@/components/treasury-view'
import { daoProposals, daoAssets, daoTransactions } from '@/lib/dao-governance-data'

export function generateStaticParams() {
  return daos.map((dao) => ({
    dao: dao.id,
  }))
}

export default async function DAOPage({ params }: { params: Promise<{ dao: string }> }) {
  const { dao: daoId } = await params
  const dao = getDAO(daoId)

  if (!dao) {
    notFound()
  }

  // Get governance data for this DAO
  const proposals = daoProposals[dao.id] || []
  const assets = daoAssets[dao.id] || []
  const transactions = daoTransactions[dao.id] || []

  // Calculate active proposals count
  const activeProposalsCount = proposals.filter(p => p.status === 'active').length

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding-lg border-b border-white/10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-12 items-start">
              <div>
                <h1 className="text-responsive-h1 font-black mb-4 tracking-tight">
                  {dao.emoji} {dao.name}
                </h1>
                <p className="text-xl text-white/70 mb-8">
                  {dao.tagline}
                </p>
                <div className="text-white/80 space-y-4 mb-8">
                  <p>{dao.description}</p>
                  {dao.partners && (
                    <p>
                      <strong>Partner Organizations:</strong> {dao.partners}
                    </p>
                  )}
                </div>
              </div>
              <FundingCard dao={dao} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <h2 className="text-responsive-h2 font-bold mb-6">About {dao.name}</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 text-lg leading-relaxed">
                {dao.mission}
              </p>
            </div>

            {/* DAO Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/3 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">💰 Treasury</h4>
                <p className="text-2xl font-bold text-[#667eea]">{dao.treasury}</p>
                <p className="text-xs text-white/60 mt-2">
                  Multisig: {dao.multisig}
                </p>
              </div>

              <div className="bg-white/3 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">👥 Members</h4>
                <p className="text-2xl font-bold text-[#667eea]">{dao.members}</p>
                <p className="text-xs text-white/60 mt-2">
                  Token Holders
                </p>
              </div>

              <div className="bg-white/3 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">🗳️ Proposals</h4>
                <p className="text-2xl font-bold text-[#667eea]">{dao.proposals}</p>
                <p className="text-xs text-white/60 mt-2">
                  {activeProposalsCount} Active
                </p>
              </div>

              <div className="bg-white/3 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">🎯 Goal</h4>
                <p className="text-2xl font-bold text-[#667eea]">{dao.goal}</p>
                <p className="text-xs text-white/60 mt-2">
                  Funding Target
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Governance Tabs Section */}
        <section className="section-padding-lg border-b border-white/10">
          <DAOTabs
            tabs={[
              {
                id: 'overview',
                label: 'Overview',
                content: (
                  <div className="space-y-12">
                    {/* On-Chain Metrics */}
                    <OnChainMetrics dao={dao} />

                    {/* Market Hypothesis */}
                    {dao.marketHypothesis && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Market Hypothesis</h3>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-white/80 text-lg leading-relaxed">
                            {dao.marketHypothesis}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Latest Research & News */}
                    {dao.news && dao.news.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Latest Research & News</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {dao.news.map((item, index) => (
                            <a
                              key={index}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group bg-white/3 border border-white/10 rounded-xl p-6 hover:border-[#667eea]/50 hover:bg-white/5 transition-all"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs px-2 py-1 bg-[#667eea]/20 text-[#667eea] rounded-full">
                                  {item.date}
                                </span>
                              </div>
                              <h4 className="text-xl font-bold mb-3 group-hover:text-[#667eea] transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-sm text-white/70">{item.description}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                id: 'proposals',
                label: `Proposals (${proposals.length})`,
                content: (
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Governance Proposals</h3>
                        <p className="text-white/60">
                          Vote on proposals and help shape the future of {dao.name}
                        </p>
                      </div>
                      <button className="px-6 py-3 bg-[#667eea] hover:bg-[#764ba2] rounded-lg font-semibold transition-all">
                        Create Proposal
                      </button>
                    </div>
                    <ProposalsList daoId={dao.id} proposals={proposals} />
                  </div>
                ),
              },
              {
                id: 'treasury',
                label: 'Treasury',
                content: (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2">DAO Treasury</h3>
                      <p className="text-white/60">
                        View assets, transactions, and financial activity
                      </p>
                    </div>
                    <TreasuryView
                      daoId={dao.id}
                      assets={assets}
                      transactions={transactions}
                      multisigAddress={dao.multisig}
                    />
                  </div>
                ),
              },
              {
                id: 'research',
                label: 'Research',
                content: (
                  <div className="space-y-12">
                    {/* Research Artifacts & Datasets */}
                    {dao.researchArtifacts && dao.researchArtifacts.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Research Artifacts & Datasets</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {dao.researchArtifacts.map((artifact, index) => (
                            <a
                              key={index}
                              href={artifact.zipUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group bg-white/3 border border-white/10 rounded-xl p-6 hover:border-[#667eea]/50 hover:bg-white/5 transition-all"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">📊</span>
                                <div>
                                  <h4 className="font-bold group-hover:text-[#667eea] transition-colors">
                                    {artifact.title}
                                  </h4>
                                  <p className="text-xs text-white/60">{artifact.format}</p>
                                </div>
                              </div>
                              <p className="text-sm text-white/70 mb-3">{artifact.description}</p>
                              {artifact.size && (
                                <p className="text-xs text-white/60">Size: {artifact.size}</p>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Research Focus Areas */}
                    {dao.researchAreas && dao.researchAreas.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Research Focus Areas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {dao.researchAreas.map((area, index) => (
                            <div
                              key={index}
                              className="bg-white/3 border border-white/10 rounded-xl p-6"
                            >
                              <div className="text-4xl mb-4">{area.icon}</div>
                              <h4 className="text-xl font-bold mb-2">{area.title}</h4>
                              <p className="text-sm text-white/70">{area.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                id: 'about',
                label: 'About',
                content: (
                  <div className="space-y-12">
                    {/* Tokenomics */}
                    {dao.tokenomics && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Tokenomics</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Distribution */}
                          <div className="bg-white/3 border border-white/10 rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-4">Token Distribution</h4>
                            <div className="space-y-3">
                              {dao.tokenomics.distribution.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <span className="text-white/80">{item.label}</span>
                                  <span className="font-bold text-[#667eea]">{item.percentage}%</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Utility */}
                          <div className="bg-white/3 border border-white/10 rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-4">Token Utility</h4>
                            <ul className="space-y-2">
                              {dao.tokenomics.utility.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-[#667eea] mt-1">•</span>
                                  <span className="text-white/80">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Team & Community */}
                    {dao.team && dao.team.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Team & Community</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {dao.team.map((member, index) => (
                            <div
                              key={index}
                              className="bg-white/3 border border-white/10 rounded-xl p-6"
                            >
                              <div className="text-4xl mb-3">{member.avatar}</div>
                              <h4 className="text-lg font-bold mb-1">{member.name}</h4>
                              <p className="text-sm text-[#667eea] mb-3">{member.role}</p>
                              <p className="text-sm text-white/70">{member.bio}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Project Roadmap */}
                    {dao.roadmap && dao.roadmap.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Project Roadmap</h3>
                        <div className="space-y-6">
                          {dao.roadmap.map((milestone, index) => (
                            <div
                              key={index}
                              className="bg-white/3 border border-white/10 rounded-xl p-6"
                            >
                              <div className="flex items-start gap-4">
                                <div className="text-3xl">📅</div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-xl font-bold">{milestone.title}</h4>
                                    <span
                                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                        milestone.status === 'completed'
                                          ? 'bg-green-500/20 text-green-300'
                                          : milestone.status === 'in-progress'
                                            ? 'bg-blue-500/20 text-blue-300'
                                            : 'bg-white/10 text-white/60'
                                      }`}
                                    >
                                      {milestone.status}
                                    </span>
                                  </div>
                                  <p className="text-white/60 text-sm mb-2">{milestone.date}</p>
                                  <p className="text-white/80">{milestone.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Value Capture Model */}
                    {dao.valueCaptureModel && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Value Capture Model</h3>
                        <div className="bg-white/3 border border-white/10 rounded-xl p-8">
                          <p className="text-white/80 text-lg leading-relaxed">
                            {dao.valueCaptureModel}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Recommended Reads */}
                    {dao.resources && dao.resources.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Recommended Reads</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dao.resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group bg-white/3 border border-white/10 rounded-xl p-6 hover:border-[#667eea]/50 hover:bg-white/5 transition-all"
                            >
                              <h4 className="font-bold mb-2 group-hover:text-[#667eea] transition-colors">
                                {resource.title}
                              </h4>
                              <p className="text-sm text-white/60 capitalize">{resource.type}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
