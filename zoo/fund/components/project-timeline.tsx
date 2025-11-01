'use client'

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming'
  icon?: string
  image?: string
  link?: string
  metadata?: {
    funding?: string
    members?: number
    location?: string
  }
}

export interface ProjectTimelineProps {
  events: TimelineEvent[]
  title?: string
  subtitle?: string
  compact?: boolean
  showImages?: boolean
}

export function ProjectTimeline({
  events,
  title = 'Project Timeline',
  subtitle,
  compact = false,
  showImages = true,
}: ProjectTimelineProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h2>
            )}
            {subtitle && (
              <p className="text-white/60 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#667eea] via-[#764ba2] to-transparent" />

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <TimelineEventCard
                key={event.id}
                event={event}
                index={index}
                compact={compact}
                showImages={showImages}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEventCard({
  event,
  index,
  compact,
  showImages,
}: {
  event: TimelineEvent
  index: number
  compact: boolean
  showImages: boolean
}) {
  const isEven = index % 2 === 0

  // Status styling
  const statusStyles = {
    completed: {
      badge: 'bg-green-500/20 text-green-400 border-green-500/30',
      indicator: 'bg-green-500',
      icon: '✓',
    },
    'in-progress': {
      badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      indicator: 'bg-blue-500 animate-pulse',
      icon: '◉',
    },
    upcoming: {
      badge: 'bg-white/10 text-white/60 border-white/20',
      indicator: 'bg-white/30',
      icon: '○',
    },
  }

  const style = statusStyles[event.status]

  return (
    <div
      className={`
        relative flex items-center gap-8
        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
      `}
    >
      {/* Timeline Indicator (Desktop: Center, Mobile: Left) */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
        <div
          className={`
            w-12 h-12 rounded-full border-4 border-black
            flex items-center justify-center text-white font-bold
            ${style.indicator}
          `}
        >
          {event.icon || style.icon}
        </div>
      </div>

      {/* Spacer for desktop layout */}
      <div className="hidden md:block flex-1" />

      {/* Content Card */}
      <div
        className={`
          flex-1 ml-20 md:ml-0
          ${isEven ? 'md:pr-12' : 'md:pl-12'}
        `}
      >
        <div
          className="
            group bg-gradient-to-br from-white/10 to-white/5
            border border-white/10 rounded-2xl p-6
            hover:border-white/20 hover:shadow-xl hover:shadow-[#667eea]/10
            transition-all duration-300
          "
        >
          {/* Status Badge + Date */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`
                px-3 py-1 rounded-full text-xs font-semibold border
                ${style.badge}
              `}
            >
              {event.status.replace('-', ' ').toUpperCase()}
            </span>
            <span className="text-sm text-white/50">{event.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#667eea] transition-colors">
            {event.link ? (
              <a href={event.link} className="hover:underline">
                {event.title}
              </a>
            ) : (
              event.title
            )}
          </h3>

          {/* Description */}
          <p className={`text-white/70 ${compact ? 'text-sm' : 'text-base'} mb-4`}>
            {event.description}
          </p>

          {/* Image */}
          {showImages && event.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Metadata */}
          {event.metadata && (
            <div className="flex flex-wrap gap-4 text-sm text-white/60 pt-4 border-t border-white/10">
              {event.metadata.funding && (
                <div className="flex items-center gap-2">
                  <span>💰</span>
                  <span>{event.metadata.funding}</span>
                </div>
              )}
              {event.metadata.members && (
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>{event.metadata.members} members</span>
                </div>
              )}
              {event.metadata.location && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{event.metadata.location}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Preset: Compact horizontal timeline (for page headers)
export function ProjectTimelineCompact({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="overflow-x-auto py-8">
      <div className="flex gap-8 min-w-max px-4">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col items-center max-w-[200px]">
            {/* Indicator */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-3
                ${
                  event.status === 'completed'
                    ? 'bg-green-500'
                    : event.status === 'in-progress'
                    ? 'bg-blue-500 animate-pulse'
                    : 'bg-white/30'
                }
              `}
            >
              {event.icon || (event.status === 'completed' ? '✓' : event.status === 'in-progress' ? '◉' : '○')}
            </div>

            {/* Content */}
            <div className="text-center">
              <div className="text-xs text-white/50 mb-1">{event.date}</div>
              <div className="text-sm font-semibold mb-1">{event.title}</div>
              <div className="text-xs text-white/60 line-clamp-2">
                {event.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Preset: Simple vertical list (minimal styling)
export function ProjectTimelineSimple({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div key={event.id} className="flex gap-4">
          <div
            className={`
              w-2 h-2 rounded-full mt-2 flex-shrink-0
              ${
                event.status === 'completed'
                  ? 'bg-green-500'
                  : event.status === 'in-progress'
                  ? 'bg-blue-500'
                  : 'bg-white/30'
              }
            `}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{event.title}</span>
              <span className="text-xs text-white/50">{event.date}</span>
            </div>
            <p className="text-sm text-white/70">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
