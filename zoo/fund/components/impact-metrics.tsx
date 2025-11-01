'use client'

import { useState, useEffect } from 'react'

export interface ImpactMetric {
  id: string
  label: string
  value: string | number
  change?: number // Percentage change (e.g., +15 for 15% increase)
  icon: string
  color?: string
  description?: string
  unit?: string
}

export interface ImpactMetricsProps {
  metrics: ImpactMetric[]
  title?: string
  subtitle?: string
  layout?: 'grid' | 'horizontal' | 'vertical'
  animated?: boolean
  showTrend?: boolean
}

export function ImpactMetrics({
  metrics,
  title = 'Conservation Impact',
  subtitle,
  layout = 'grid',
  animated = true,
  showTrend = true,
}: ImpactMetricsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(true)
    }
  }, [animated])

  const gridClasses = {
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
    horizontal: 'flex flex-wrap gap-6',
    vertical: 'flex flex-col gap-4',
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h2>
            )}
            {subtitle && (
              <p className="text-white/60 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Metrics Grid */}
        <div className={gridClasses[layout]}>
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              isVisible={isVisible}
              delay={index * 100}
              showTrend={showTrend}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricCard({
  metric,
  isVisible,
  delay,
  showTrend,
}: {
  metric: ImpactMetric
  isVisible: boolean
  delay: number
  showTrend: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const numValue = typeof metric.value === 'number' ? metric.value : 0
    if (numValue === 0) {
      setCount(0)
      return
    }

    const duration = 2000 // Animation duration in ms
    const steps = 60
    const increment = numValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setCount(numValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, metric.value])

  const displayValue = typeof metric.value === 'number' 
    ? `${count}${metric.unit || ''}`
    : metric.value

  const trendColor = metric.change && metric.change > 0 ? 'text-green-400' : 'text-red-400'
  const trendIcon = metric.change && metric.change > 0 ? '↑' : '↓'

  return (
    <div
      className={`
        group relative bg-gradient-to-br from-white/10 to-white/5
        border border-white/10 rounded-2xl p-6
        hover:border-white/20 hover:shadow-xl hover:shadow-[#667eea]/10
        transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{
        transitionDelay: `${delay}ms`,
        borderColor: metric.color ? `${metric.color}20` : undefined,
      }}
    >
      {/* Icon */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="text-4xl sm:text-5xl"
          style={{ color: metric.color }}
        >
          {metric.icon}
        </div>
        
        {/* Trend Indicator */}
        {showTrend && metric.change !== undefined && (
          <div
            className={`
              flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
              ${metric.change > 0 ? 'bg-green-500/10' : 'bg-red-500/10'}
            `}
          >
            <span className={trendColor}>{trendIcon}</span>
            <span className={trendColor}>
              {Math.abs(metric.change)}%
            </span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <div
          className="text-3xl sm:text-4xl font-black"
          style={{ color: metric.color || '#667eea' }}
        >
          {displayValue}
        </div>
      </div>

      {/* Label */}
      <div className="text-sm sm:text-base text-white/70 mb-1">
        {metric.label}
      </div>

      {/* Description */}
      {metric.description && (
        <div className="text-xs text-white/50 mt-2">
          {metric.description}
        </div>
      )}

      {/* Hover Effect Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(135deg, ${metric.color || '#667eea'}, transparent)`,
        }}
      />
    </div>
  )
}

// Preset: Compact metrics bar (for headers or summaries)
export function ImpactMetricsCompact({ metrics }: { metrics: ImpactMetric[] }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {metrics.map((metric) => (
        <div key={metric.id} className="text-center">
          <div
            className="text-2xl font-black mb-1"
            style={{ color: metric.color || '#667eea' }}
          >
            {metric.icon} {metric.value}{metric.unit || ''}
          </div>
          <div className="text-xs text-white/60">{metric.label}</div>
        </div>
      ))}
    </div>
  )
}

// Preset: Large hero metrics (for landing pages)
export function ImpactMetricsHero({ metrics }: { metrics: ImpactMetric[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16">
      {metrics.map((metric) => (
        <div key={metric.id} className="text-center">
          <div className="text-5xl mb-3">{metric.icon}</div>
          <div
            className="text-4xl md:text-5xl font-black mb-2"
            style={{ color: metric.color || '#667eea' }}
          >
            {metric.value}{metric.unit || ''}
          </div>
          <div className="text-sm md:text-base text-white/70">{metric.label}</div>
          {metric.change !== undefined && (
            <div
              className={`text-xs mt-2 ${
                metric.change > 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}% this year
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
