import Link from 'next/link'
import Image from 'next/image'

export interface ProjectCardProps {
  id: string
  title: string
  emoji?: string
  image?: string
  category: string
  categoryColor?: string
  tagline: string
  description?: string
  fundingAmount: string
  fundingGoal?: string
  progressPercentage?: number
  status?: 'active' | 'funded' | 'upcoming'
  members?: number
  proposals?: number
  href?: string
  featured?: boolean
  compact?: boolean
}

export function ProjectCard({
  id,
  title,
  emoji,
  image,
  category,
  categoryColor = '#667eea',
  tagline,
  description,
  fundingAmount,
  fundingGoal,
  progressPercentage,
  status = 'active',
  members,
  proposals,
  href,
  featured = false,
  compact = false
}: ProjectCardProps) {
  const linkHref = href || `/${id}`

  const statusStyles = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    funded: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    upcoming: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }

  const statusLabels = {
    active: 'Active',
    funded: 'Fully Funded',
    upcoming: 'Coming Soon'
  }

  const cardClasses = featured
    ? 'group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl overflow-hidden hover:scale-[1.02] hover:border-white/30 hover:shadow-2xl hover:shadow-[#667eea]/20 transition-all duration-300'
    : 'group relative bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-xl overflow-hidden hover:scale-105 hover:border-[#667eea]/50 hover:shadow-xl hover:shadow-[#667eea]/10 transition-all duration-300'

  const contentPadding = featured ? 'p-8' : compact ? 'p-4' : 'p-6'

  return (
    <Link href={linkHref} className={cardClasses}>
      {/* Image/Visual Header (optional) */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={contentPadding}>
        {/* Header: Category + Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border"
            style={{
              backgroundColor: `${categoryColor}20`,
              color: categoryColor,
              borderColor: `${categoryColor}30`
            }}
          >
            {category}
          </span>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusStyles[status]}`}>
            {statusLabels[status]}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold mb-2 group-hover:text-[#667eea] transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h3>

        {/* Tagline */}
        <p className={`text-white/70 mb-4 ${featured ? 'text-base' : 'text-sm'} line-clamp-2`}>
          {tagline}
        </p>

        {/* Extended Description (featured only) */}
        {featured && description && (
          <p className="text-white/60 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Progress Bar (if goals exist) */}
        {fundingGoal && progressPercentage !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-white/60 mb-2">
              <span>Funding Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Funding Amount */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-black text-[#667eea]">
            {fundingAmount}
          </span>
          {fundingGoal && (
            <span className="text-sm text-white/40">
              / {fundingGoal}
            </span>
          )}
          <span className="text-xs text-white/40 ml-auto">Raised</span>
        </div>

        {/* Metadata: Members + Proposals */}
        {(members !== undefined || proposals !== undefined) && !compact && (
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            {members !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/40">👥</span>
                <span className="text-white/70">{members.toLocaleString()}</span>
                <span className="text-white/40 text-xs">members</span>
              </div>
            )}
            {proposals !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/40">🗳️</span>
                <span className="text-white/70">{proposals}</span>
                <span className="text-white/40 text-xs">proposals</span>
              </div>
            )}
          </div>
        )}

        {/* View Project Arrow */}
        <div className="flex items-center gap-2 mt-4 text-sm text-[#667eea] group-hover:gap-3 transition-all">
          <span className="font-semibold">View Project</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* Featured Badge (top-right corner) */}
      {featured && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-xs font-bold px-3 py-1.5 rounded-full">
          ⭐ Featured
        </div>
      )}
    </Link>
  )
}

// Compact variant for grids
export function ProjectCardCompact(props: ProjectCardProps) {
  return <ProjectCard {...props} compact={true} />
}

// Skeleton loader for loading states
export function ProjectCardSkeleton({ featured = false }: { featured?: boolean }) {
  const height = featured ? 'h-96' : 'h-80'

  return (
    <div className={`${height} bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-6 animate-pulse`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-6 w-20 bg-white/10 rounded-full" />
        <div className="h-6 w-16 bg-white/10 rounded-full ml-auto" />
      </div>
      <div className="h-8 bg-white/10 rounded mb-3 w-3/4" />
      <div className="h-4 bg-white/10 rounded mb-2 w-full" />
      <div className="h-4 bg-white/10 rounded mb-4 w-2/3" />
      <div className="h-2 bg-white/10 rounded-full mb-4" />
      <div className="h-10 bg-white/10 rounded mb-4 w-1/2" />
      <div className="flex gap-4 pt-4 border-t border-white/10">
        <div className="h-6 bg-white/10 rounded w-20" />
        <div className="h-6 bg-white/10 rounded w-20" />
      </div>
    </div>
  )
}
