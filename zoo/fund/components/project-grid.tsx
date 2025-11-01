'use client'

import { useState, useMemo } from 'react'
import { ProjectCard, ProjectCardSkeleton, ProjectCardProps } from './project-card'

export interface ProjectGridProps {
  projects: ProjectCardProps[]
  loading?: boolean
  emptyMessage?: string
  columns?: {
    mobile?: 1 | 2
    tablet?: 2 | 3
    desktop?: 3 | 4
  }
  showFilters?: boolean
  showSort?: boolean
}

type SortOption = 'funding' | 'members' | 'recent' | 'alphabetical'
type FilterCategory = 'all' | string

export function ProjectGrid({
  projects,
  loading = false,
  emptyMessage = 'No projects found',
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  showFilters = false,
  showSort = false
}: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all')
  const [sortBy, setSortBy] = useState<SortOption>('funding')

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category))
    return ['all', ...Array.from(cats)]
  }, [projects])

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'funding':
          const aAmount = parseFloat(a.fundingAmount.replace(/[$,]/g, ''))
          const bAmount = parseFloat(b.fundingAmount.replace(/[$,]/g, ''))
          return bAmount - aAmount
        case 'members':
          return (b.members || 0) - (a.members || 0)
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        case 'recent':
        default:
          return 0
      }
    })

    return sorted
  }, [projects, selectedCategory, sortBy])

  // Grid column classes
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }

  const gridClasses = `grid ${gridCols[columns.mobile || 1]} sm:${gridCols[columns.tablet || 2]} lg:${gridCols[columns.desktop || 3]} gap-6`

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      {(showFilters || showSort) && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category Filter */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => {
                const isActive = cat === selectedCategory
                const displayName = cat === 'all' ? 'All Projects' : cat
                const count = cat === 'all'
                  ? projects.length
                  : projects.filter(p => p.category === cat).length

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#667eea] text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {displayName} ({count})
                  </button>
                )
              })}
            </div>
          )}

          {/* Sort Dropdown */}
          {showSort && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all"
              >
                <option value="funding">Funding (High to Low)</option>
                <option value="members">Members (High to Low)</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="recent">Recently Added</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      {showFilters && (
        <div className="text-sm text-white/60">
          Showing {filteredAndSortedProjects.length} of {projects.length} projects
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className={gridClasses}>
          {Array.from({ length: columns.desktop || 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredAndSortedProjects.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-white/60 mb-2">{emptyMessage}</p>
          <p className="text-sm text-white/40">
            {selectedCategory !== 'all'
              ? 'Try selecting a different category'
              : 'Check back soon for new conservation projects'}
          </p>
        </div>
      ) : (
        <div className={gridClasses}>
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </div>
  )
}

// Preset configurations
export function ProjectGridCompact(props: Omit<ProjectGridProps, 'columns'>) {
  return (
    <ProjectGrid
      {...props}
      columns={{ mobile: 2, tablet: 3, desktop: 4 }}
    />
  )
}

export function ProjectGridFeatured(props: Omit<ProjectGridProps, 'columns'>) {
  return (
    <ProjectGrid
      {...props}
      columns={{ mobile: 1, tablet: 2, desktop: 3 }}
    />
  )
}
