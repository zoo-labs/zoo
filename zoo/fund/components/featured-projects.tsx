'use client'

import { useState, useEffect } from 'react'
import { ProjectCard, ProjectCardProps } from './project-card'

export interface FeaturedProjectsProps {
  projects: ProjectCardProps[]
  autoRotate?: boolean
  rotateInterval?: number
  showDots?: boolean
}

export function FeaturedProjects({
  projects,
  autoRotate = true,
  rotateInterval = 5000,
  showDots = true
}: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoRotate || isHovering || projects.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, rotateInterval)

    return () => clearInterval(interval)
  }, [autoRotate, isHovering, projects.length, rotateInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  if (projects.length === 0) return null

  // Get visible projects (current + next 2 on desktop)
  const visibleProjects = [
    projects[currentIndex],
    projects[(currentIndex + 1) % projects.length],
    projects[(currentIndex + 2) % projects.length]
  ]

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Desktop: 3 cards side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="transition-opacity duration-500"
              style={{ opacity: idx === 0 ? 1 : 0.6 }}
            >
              <ProjectCard {...project} featured={idx === 0} />
            </div>
          ))}
        </div>

        {/* Tablet: 2 cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
          {visibleProjects.slice(0, 2).map((project, idx) => (
            <div
              key={`${project.id}-tablet-${idx}`}
              className="transition-opacity duration-500"
              style={{ opacity: idx === 0 ? 1 : 0.6 }}
            >
              <ProjectCard {...project} featured={idx === 0} />
            </div>
          ))}
        </div>

        {/* Mobile: 1 card */}
        <div className="md:hidden">
          <ProjectCard {...projects[currentIndex]} featured />
        </div>

        {/* Navigation Arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:scale-110 transition-all z-10"
              aria-label="Previous project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:scale-110 transition-all z-10"
              aria-label="Next project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {showDots && projects.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-[#667eea]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-rotate indicator */}
      {autoRotate && !isHovering && projects.length > 1 && (
        <div className="text-center mt-2">
          <span className="text-xs text-white/40">Auto-rotating every {rotateInterval / 1000}s</span>
        </div>
      )}
    </div>
  )
}

// Simple featured section with title
export function FeaturedProjectsSection({ projects }: { projects: ProjectCardProps[] }) {
  return (
    <section className="py-8 sm:py-12 lg:py-15 border-b border-white/10">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Projects</h2>
            <p className="text-white/60">Highlighted conservation initiatives making real impact</p>
          </div>
        </div>
        <FeaturedProjects projects={projects} />
      </div>
    </section>
  )
}
