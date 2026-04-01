'use client'

import { useState } from 'react'

export interface CategoryNavProps {
  categories: {
    id: string
    name: string
    emoji: string
    count: number
    color?: string
  }[]
  selectedCategory?: string
  onCategoryChange?: (categoryId: string) => void
  showCounts?: boolean
  layout?: 'horizontal' | 'vertical'
  sticky?: boolean
}

export function CategoryNav({
  categories,
  selectedCategory = 'all',
  onCategoryChange,
  showCounts = true,
  layout = 'horizontal',
  sticky = false,
}: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory)

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    onCategoryChange?.(categoryId)
  }

  const containerClasses = layout === 'horizontal'
    ? 'flex flex-wrap gap-3 items-center'
    : 'flex flex-col gap-2'

  const stickyClasses = sticky
    ? 'sticky top-20 z-40 bg-black/90 backdrop-blur-lg py-4 border-b border-white/10'
    : ''

  return (
    <nav className={stickyClasses}>
      <div className={`container ${stickyClasses && 'py-0'}`}>
        <div className={containerClasses}>
          {categories.map((category) => {
            const isActive = category.id === activeCategory
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  group relative px-4 py-2.5 rounded-lg font-medium text-sm
                  transition-all duration-300 min-h-[44px]
                  ${isActive
                    ? 'bg-[#667eea] text-white shadow-lg shadow-[#667eea]/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }
                  ${layout === 'vertical' ? 'w-full justify-start' : ''}
                `}
                style={
                  isActive && category.color
                    ? {
                        backgroundColor: category.color,
                        boxShadow: `0 10px 30px -10px ${category.color}50`,
                      }
                    : undefined
                }
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{category.emoji}</span>
                  <span>{category.name}</span>
                  {showCounts && (
                    <span
                      className={`
                        px-2 py-0.5 rounded-full text-xs font-semibold
                        ${isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white/10 text-white/50 group-hover:text-white/70'
                        }
                      `}
                    >
                      {category.count}
                    </span>
                  )}
                </span>

                {/* Active indicator (bottom border for horizontal, left border for vertical) */}
                {isActive && (
                  <span
                    className={`
                      absolute bg-white
                      ${layout === 'horizontal'
                        ? 'bottom-0 left-0 right-0 h-0.5'
                        : 'top-0 bottom-0 left-0 w-0.5'
                      }
                    `}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

// Preset: Compact horizontal nav (smaller, for secondary navigation)
export function CategoryNavCompact(props: Omit<CategoryNavProps, 'layout'>) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
      {props.categories.map((category) => {
        const isActive = category.id === props.selectedCategory
        
        return (
          <button
            key={category.id}
            onClick={() => props.onCategoryChange?.(category.id)}
            className={`
              flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium
              transition-all duration-200
              ${isActive
                ? 'bg-[#667eea] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {category.emoji} {category.name}
            {props.showCounts && (
              <span className="ml-1.5 opacity-70">({category.count})</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// Preset: Sidebar vertical nav (for page layouts with sidebar)
export function CategoryNavSidebar(props: Omit<CategoryNavProps, 'layout'>) {
  return (
    <CategoryNav {...props} layout="vertical" />
  )
}

// Preset: Sticky horizontal nav that follows scroll
export function CategoryNavSticky(props: CategoryNavProps) {
  return (
    <CategoryNav {...props} sticky={true} />
  )
}
