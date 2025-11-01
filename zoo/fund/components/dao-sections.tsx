import { ResearchArea, TeamMember, Milestone, Resource, NewsItem, ResearchArtifact } from '@/lib/daos'

export function MarketHypothesisSection({ content }: { content: string }) {
  return (
    <section className="section-padding border-b border-white/10">
      <div className="container">
        <h2 className="text-responsive-h2 font-bold mb-6">Market Hypothesis</h2>
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-white/80 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </section>
  )
}

export function ResearchAreasSection({ areas }: { areas: ResearchArea[] }) {
  return (
    <section className="section-padding border-b border-white/10">
      <div className="container">
        <h2 className="text-responsive-h2 font-bold mb-6 animate-fadeIn">Research Focus Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 hover:border-[#667eea]/50 hover:scale-105 hover:shadow-lg hover:shadow-[#667eea]/10 transition-all duration-300 animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">{area.icon}</div>
              <h3 className="text-xl font-bold mb-3">{area.title}</h3>
              <p className="text-white/70 leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TokenomicsSection({
  distribution,
  utility,
}: {
  distribution: { label: string; percentage: number; color: string }[]
  utility: string[]
}) {
  return (
    <section className="section-padding border-b border-white/10">
      <div className="container">
        <h2 className="text-responsive-h2 font-bold mb-6">Tokenomics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
          {/* Token Distribution Chart */}
          <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">Token Distribution</h3>
            <div className="space-y-4">
              {distribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-bold">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Token Utility */}
          <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">Token Utility</h3>
            <ul className="space-y-4">
              {utility.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#667eea] mt-1">✓</span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TeamSection({ members }: { members: TeamMember[] }) {
  return (
    <section className="section-padding border-b border-white/10">
      <div className="container">
        <h2 className="text-responsive-h2 font-bold mb-6 animate-fadeIn">Team & Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 hover:border-[#667eea]/50 hover:scale-105 hover:shadow-lg hover:shadow-[#667eea]/10 transition-all duration-300 animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {member.avatar && (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] mb-4 transition-transform duration-300 hover:scale-110" />
              )}
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
              <p className="text-sm text-[#667eea] mb-3">{member.role}</p>
              <p className="text-sm text-white/70 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RoadmapSection({ milestones }: { milestones: Milestone[] }) {
  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-[#667eea]'
      case 'upcoming':
        return 'bg-white/20'
    }
  }

  const getStatusLabel = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'upcoming':
        return 'Upcoming'
    }
  }

  return (
    <section className="section-padding border-b border-white/10">
      <div className="container">
        <h2 className="text-responsive-h2 font-bold mb-6">Project Roadmap</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[31px] top-0 bottom-0 w-0.5 bg-white/10" />

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative pl-16">
                {/* Status dot */}
                <div className="absolute left-0 top-1">
                  <div className={`w-16 h-16 rounded-full ${getStatusColor(milestone.status)} flex items-center justify-center border-4 border-black`}>
                    <span className="text-xs font-bold text-white">
                      {milestone.date.split(' ')[1]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-sm text-white/60 mb-1">{milestone.date}</p>
                      <h3 className="text-xl font-bold">{milestone.title}</h3>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(milestone.status)} text-white`}>
                      {getStatusLabel(milestone.status)}
                    </span>
                  </div>
                  <p className="text-white/70 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ValueCaptureSection({ content }: { content: string }) {
  return (
    <section className="section-padding border-b border-white/10">
      <div className="container">
        <h2 className="text-responsive-h2 font-bold mb-6">Value Capture Model</h2>
        <div className="bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 border border-[#667eea]/20 rounded-2xl p-8">
          <p className="text-white/80 text-lg leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </section>
  )
}

export function ResourcesSection({ resources }: { resources: Resource[] }) {
  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return '📄'
      case 'paper':
        return '📚'
      case 'video':
        return '🎥'
      case 'report':
        return '📊'
    }
  }

  const getTypeLabel = (type: Resource['type']) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="text-responsive-h2 font-bold mb-6 animate-fadeIn">Recommended Reads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-6 hover:border-[#667eea]/50 hover:scale-105 hover:shadow-lg hover:shadow-[#667eea]/10 transition-all duration-300 animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{getTypeIcon(resource.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-white/60 uppercase">
                      {getTypeLabel(resource.type)}
                    </span>
                    <span className="text-xs text-white/40 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-[#667eea] transition-colors duration-200">
                    {resource.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NewsSection({ news }: { news: NewsItem[] }) {
  const getNewsTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      research: 'Research',
      news: 'News',
      update: 'Update',
      milestone: 'Milestone'
    }
    return labels[type] || type
  }

  const getNewsTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      research: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      news: 'bg-green-500/20 text-green-400 border-green-500/30',
      update: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      milestone: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
    return colors[type] || 'bg-white/10 text-white/70 border-white/20'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <section className="section-padding border-b border-white/10">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-responsive-h2 font-bold mb-2 animate-fadeIn">Latest Research & News</h2>
            <p className="text-white/60">Breakthrough discoveries and updates from this DAO</p>
          </div>
          <a
            href="https://papers.zoo.ngo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg text-[#667eea] hover:bg-[#667eea]/20 transition-all hidden sm:flex items-center gap-2"
          >
            <span>View All Research</span>
            <span className="text-sm">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 hover:border-[#667eea]/50 hover:scale-[1.02] transition-all duration-300 animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Type Badge & Date */}
                <div className="flex items-center gap-3 md:w-48 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getNewsTypeColor(item.type)}`}>
                    {getNewsTypeLabel(item.type)}
                  </span>
                  <span className="text-xs text-white/40 whitespace-nowrap">{formatDate(item.date)}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#667eea] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-end md:justify-center">
                  <span className="text-[#667eea] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Link to papers.zoo.ngo (mobile) */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href="https://papers.zoo.ngo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg text-[#667eea] hover:bg-[#667eea]/20 transition-all"
          >
            <span>View All Research</span>
            <span className="text-sm">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export function ResearchArtifactsSection({ artifacts }: { artifacts: ResearchArtifact[] }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getFileTypeIcon = (format: string) => {
    if (format.toLowerCase().includes('dna') || format.toLowerCase().includes('fasta')) return '🧬'
    if (format.toLowerCase().includes('image')) return '📸'
    if (format.toLowerCase().includes('model') || format.toLowerCase().includes('pytorch')) return '🤖'
    if (format.toLowerCase().includes('audio')) return '🎵'
    if (format.toLowerCase().includes('csv') || format.toLowerCase().includes('data')) return '📊'
    return '📦'
  }

  return (
    <section className="section-padding border-b border-white/10">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-responsive-h2 font-bold mb-2 animate-fadeIn">Research Artifacts & Datasets</h2>
            <p className="text-white/60">Downloadable research data, models, and analysis tools</p>
          </div>
          <a
            href="https://zips.zoo.ngo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#764ba2]/10 border border-[#764ba2]/30 rounded-lg text-[#764ba2] hover:bg-[#764ba2]/20 transition-all hidden sm:flex items-center gap-2"
          >
            <span>Browse All Artifacts</span>
            <span className="text-sm">→</span>
          </a>
        </div>

        <div className="grid gap-6">
          {artifacts.map((artifact, index) => (
            <a
              key={index}
              href={artifact.zipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 hover:border-[#764ba2]/50 hover:from-[#764ba2]/5 hover:to-[#667eea]/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {getFileTypeIcon(artifact.format)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold group-hover:text-[#764ba2] transition-colors">
                      {artifact.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-white/60 shrink-0">
                      <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        {artifact.size}
                      </span>
                      <span className="text-[#764ba2] group-hover:translate-x-1 transition-transform text-2xl">
                        ↓
                      </span>
                    </div>
                  </div>

                  <p className="text-white/70 mb-3 leading-relaxed">
                    {artifact.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-2">
                      <span className="text-white/40">📅</span>
                      {formatDate(artifact.date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-white/40">📁</span>
                      {artifact.format}
                    </span>
                    {artifact.doi && (
                      <span className="flex items-center gap-2">
                        <span className="text-white/40">🔗</span>
                        DOI: {artifact.doi}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Link to zips.zoo.ngo (mobile) */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href="https://zips.zoo.ngo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#764ba2]/10 border border-[#764ba2]/30 rounded-lg text-[#764ba2] hover:bg-[#764ba2]/20 transition-all"
          >
            <span>Browse All Artifacts</span>
            <span className="text-sm">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
