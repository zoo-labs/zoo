import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { daos } from '@/lib/daos'
import { FeaturedProjectsSection } from '@/components/featured-projects'
import { ProjectCardProps } from '@/components/project-card'

export default function Home() {
  // Calculate total statistics
  const totalRaised = daos.reduce((sum, dao) => {
    const amount = parseFloat(dao.raised.replace(/[$,]/g, ''))
    return sum + amount
  }, 0)

  const stats = [
    { value: `$${(totalRaised / 1000).toFixed(1)}M+`, label: 'Total Funding Raised' },
    { value: '8', label: 'Conservation DAOs' },
    { value: '2,500+', label: 'Community Members' },
    { value: '15+', label: 'Active Projects' },
  ]

  // Transform DAOs into ProjectCardProps for featured section
  const calculateProgress = (raised: string, goal?: string) => {
    if (!goal) return undefined
    const raisedNum = parseFloat(raised.replace(/[$,]/g, ''))
    const goalNum = parseFloat(goal.replace(/[$,]/g, ''))
    return Math.round((raisedNum / goalNum) * 100)
  }

  const getCategoryFromDAO = (daoId: string): string => {
    const categoryMap: Record<string, string> = {
      'ocean': 'Marine Conservation',
      'shark': 'Marine Conservation',
      'polar': 'Arctic Conservation',
      'coral': 'Marine Conservation',
      'tiger': 'Wildlife Conservation',
      'ai': 'AI Technology',
      'metacrisis': 'Global Research',
      'zen': 'AI Technology'
    }
    return categoryMap[daoId] || 'Conservation'
  }

  const featuredProjects: ProjectCardProps[] = daos.slice(0, 6).map(dao => ({
    id: dao.id,
    title: dao.name,
    emoji: dao.emoji,
    category: getCategoryFromDAO(dao.id),
    categoryColor: '#667eea',
    tagline: dao.tagline,
    description: dao.description,
    fundingAmount: dao.raised,
    fundingGoal: dao.goal,
    progressPercentage: calculateProgress(dao.raised, dao.goal),
    status: 'active' as const,
    members: dao.members,
    proposals: dao.proposals,
    featured: true,
  }))

  const featuredNews = [
    {
      title: 'ZenLM AI Powers New Conservation Tools',
      description: 'ZenDAO announces breakthrough in edge AI for wildlife monitoring',
      date: '2025-01-15',
      link: 'https://zenlm.org/blog/conservation-ai',
      dao: '🧘 ZenDAO',
    },
    {
      title: 'OceanDAO Publishes Groundbreaking DNA Study',
      description: 'New research reveals 300+ undiscovered marine species',
      date: '2025-01-10',
      link: 'https://papers.zoo.ngo/ocean-dna-2025',
      dao: '🧬 OceanDAO',
    },
    {
      title: 'Tiger Conservation Milestone Reached',
      description: 'TigerDAO reports 15% increase in wild tiger populations',
      date: '2025-01-05',
      link: 'https://papers.zoo.ngo/tiger-conservation',
      dao: '🐅 TigerDAO',
    },
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding-lg border-b border-white/10">
          <div className="container">
            <h1 className="text-responsive-h1 font-black mb-4 sm:mb-6 text-center tracking-tight animate-fadeIn">
              Zoo Fund
            </h1>
            <p className="text-responsive-body text-white/80 text-center max-w-3xl mx-auto mb-8 sm:mb-12 animate-fadeIn delay-100">
              Decentralized funding for wildlife conservation through specialized DAOs
            </p>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fadeIn delay-200">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl font-black text-[#667eea] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>


          </div>
        </section>

        {/* Featured Conservation Projects */}
        <FeaturedProjectsSection projects={featuredProjects} />

        {/* Latest Research & News */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-responsive-h2 font-bold mb-2">Latest Research & News</h2>
                <p className="text-white/60 text-sm sm:text-base">
                  Breakthrough discoveries and updates from our conservation DAOs
                </p>
              </div>
              <Link
                href="https://papers.zoo.ngo"
                target="_blank"
                className="px-6 py-3 bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg text-[#667eea] hover:bg-[#667eea]/20 transition-all"
              >
                View All Research →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredNews.map((news, index) => (
                <a
                  key={index}
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 hover:border-[#667eea]/50 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-[#667eea]/20 text-[#667eea] rounded-full">
                      {news.dao}
                    </span>
                    <span className="text-xs text-white/40">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#667eea] transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-white/70 mb-4">{news.description}</p>
                  <div className="flex items-center gap-2 text-sm text-[#667eea]">
                    <span>Read more</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="section-padding border-b border-white/10">
          <div className="container">
            <h2 className="text-responsive-h2 font-bold text-center mb-4">Our Partners</h2>
            <p className="text-white/60 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              Working together with leading conservation organizations, research institutions, and technology partners
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Shark Stewards', url: 'https://sharkstewards.org' },
                { name: 'Frontiers North', url: 'https://frontiersnorth.com' },
                { name: 'NSF', url: 'https://nsf.gov' },
                { name: 'Hanzo AI', url: 'https://hanzo.ai' },
                { name: 'Lux Network', url: 'https://lux.network' },
                { name: 'NVIDIA Inception', url: 'https://www.nvidia.com/en-us/startups/', logo: 'https://www.logo.wine/a/logo/Nvidia/Nvidia-Light-Horizontal-Dark-Background-Logo.wine.svg' },
              ].map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center hover:bg-white/10 hover:border-[#667eea]/50 transition-all duration-300 group"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {partner.name}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 border border-[#667eea]/20 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center">
              <h2 className="text-responsive-h3 font-bold mb-4">Never Miss an Update</h2>
              <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base">
                Get exclusive updates about conservation initiatives, research breakthroughs, and DAO progress
              </p>
              <form className="flex gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-white/40 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
