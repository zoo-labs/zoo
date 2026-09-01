'use client'

import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ABSENCE, QUALITY_CLASS, ago, stamp, type Measure, type Quality } from '@/lib/measure'

// The ONE way this explorer renders a figure.
//
// <Stat> takes a Measure, never a string or a number. That single constraint is
// what makes the old defect unreachable: a fabricated literal cannot be handed to
// this component without first inventing a `source` for it, and an absence has no
// `value` field to fall back to. The value slot shows either the measurement or
// the ONE word for its quality; the hint line always says where it came from and,
// when the figure is time-sensitive, how old it is.

/** A 2px rule carrying the quality, so a row of figures can be scanned at a glance. */
const RULE: Record<Quality, string> = {
  pending: 'border-l-muted',
  live: 'border-l-green-500',
  idle: 'border-l-blue-500',
  stale: 'border-l-amber-500',
  empty: 'border-l-border',
  unknown: 'border-l-border',
  unavailable: 'border-l-red-500',
}

export function Stat({
  label,
  m,
  icon,
}: {
  label: string
  m: Measure<ReactNode>
  icon?: ReactNode
}) {
  const absent = m.value === undefined
  return (
    <Card className={`border-l-2 ${RULE[m.quality]}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {label}
          {(m.quality === 'stale' || m.quality === 'idle' || m.quality === 'unavailable') && (
            <QualityTag q={m.quality} />
          )}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {/* An absence renders the WORD, smaller and lighter than a real figure,
            so it can never be mistaken for one at a glance. */}
        <div
          className={
            absent
              ? `text-base font-normal ${QUALITY_CLASS[m.quality]}`
              : `text-2xl font-bold ${QUALITY_CLASS[m.quality]} tabular-nums`
          }
        >
          {absent ? ABSENCE[m.quality] : m.value}
        </div>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {m.note && <span>{m.note} · </span>}
          <span title={m.source} className="opacity-70">{m.source}</span>
          {m.asOf ? (
            <span title={stamp(m.asOf)}> · as of {ago(m.asOf)} ago</span>
          ) : null}
        </p>
        {m.control && (
          <p className="mt-2 pl-2 border-l text-[11px] leading-relaxed text-muted-foreground/70">
            Control · {m.control}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

/** The qualifying word beside a label. Colour is never the only cue. */
export function QualityTag({ q }: { q: Quality }) {
  const tone =
    q === 'stale' ? 'text-amber-500 border-amber-500/40'
    : q === 'idle' ? 'text-blue-500 border-blue-500/40'
    : 'text-red-500 border-red-500/40'
  return (
    <span className={`text-[10px] uppercase tracking-wider px-1.5 py-px border rounded-sm ${tone}`}>
      {q}
    </span>
  )
}

/**
 * The vocabulary, stated once, above the figures.
 *
 * Without it the first `unknown` a reader meets is just another blank, and they
 * reverse-engineer the convention or assume the worst. With it, every absence on
 * the page is already explained.
 */
export function Legend() {
  const items: { q: Quality; what: string }[] = [
    { q: 'live', what: 'measured, and inside its freshness budget' },
    { q: 'idle', what: 'a real value; the chain is at rest — correct, not a fault' },
    { q: 'stale', what: 'a real value, but older than it should be' },
    { q: 'empty', what: 'the query worked and the answer is genuinely none' },
    { q: 'unknown', what: 'the source does not report it — we do not invent a number' },
    { q: 'unavailable', what: 'we asked, and the source failed' },
  ]
  const dot: Record<string, string> = {
    live: 'bg-green-500',
    idle: 'bg-blue-500',
    stale: 'bg-amber-500',
    empty: 'bg-muted-foreground/40',
    unknown: 'bg-muted-foreground/40',
    unavailable: 'bg-red-500',
  }
  return (
    <div
      role="note"
      aria-label="How to read the figures on this page"
      className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground"
    >
      <span className="font-medium text-foreground">How to read these figures</span>
      {items.map(({ q, what }) => (
        <span key={q} className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${dot[q]}`} aria-hidden="true" />
          <strong className="font-medium text-foreground/80">{q}</strong> {what}
        </span>
      ))}
    </div>
  )
}

/** A banner stating, in one sentence, why the figures below look the way they do. */
export function Notice({ tone, children }: { tone: 'info' | 'warn' | 'bad'; children: ReactNode }) {
  const cls =
    tone === 'bad' ? 'border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400'
    : tone === 'warn' ? 'border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400'
    : 'border-border bg-muted/30 text-muted-foreground'
  return (
    <div role="status" className={`rounded-lg border px-4 py-3 text-sm ${cls}`}>
      {children}
    </div>
  )
}

/**
 * What this network does not serve, said out loud.
 *
 * A visitor who expects a price and finds no tile assumes the page is broken. A
 * visitor who reads "no price oracle is deployed" has learned the truth. Each
 * entry carries the control that proves it is unserved rather than zero.
 */
export function UnservedNote({ items }: { items: Measure[] }) {
  return (
    <div className="rounded-lg border border-dashed px-4 py-3 text-xs text-muted-foreground">
      <span className="font-medium text-foreground/80">Not shown, and why</span>
      <ul className="mt-2 space-y-1.5">
        {items.map((m) => (
          <li key={m.source + m.note}>
            <span className="text-foreground/70">{m.note}</span>{' '}
            <span className="opacity-60">({m.source})</span>
            {m.control && <div className="opacity-60 mt-0.5">Control · {m.control}</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}
