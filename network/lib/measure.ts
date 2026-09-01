// A Measure is a number this explorer is willing to show the public.
//
// The defect this exists to kill: every tile on this page carried a literal.
// Block height was 1234567, transactions 5678901, accounts 123456, price
// $25.50 — none of them read from anything, and the real chain was at 15,008.
// A hardcoded number and a measured one rendered identically, so a visitor had
// no way to tell a fact from a decoration.
//
// So a value and what we know ABOUT that value are braided together in ONE type,
// and rendering a bare number becomes impossible: <Stat> takes a Measure, never a
// string. A figure that was never measured has no `value` field to render, so the
// fabrication is unreachable by construction rather than by discipline.
//
// Seven qualities, mutually exclusive, each with a different treatment:
//
//   pending      the read is in flight. Not a value yet.
//   live         we have it and it is inside its freshness budget.
//   stale        we have it and it is OLDER than its budget. The value is true,
//                just old — never render it as green.
//   idle         we have it; it is unchanged because the network is at rest and
//                nothing asked it to move. Expected, not a fault.
//   empty        the query succeeded and the answer is genuinely "none".
//   unknown      the source does not report this field AT ALL. Never coerce this
//                into a value (`Number(undefined) || 0` is a fabrication).
//   unavailable  we asked, and the source failed or is defective.
//
// `stale` vs `idle` is the distinction this chain forces: a C-Chain that has
// produced no block in two days is reporting a TRUE height — the number is not
// wrong, it is old. Rendering 15,008 in the same green as a moving tip is the
// same lie in a quieter voice.
//
// Every Measure carries `source` — the RPC method it came from. That field is
// required, so a number without provenance cannot be constructed.

export type Quality = 'pending' | 'live' | 'stale' | 'idle' | 'empty' | 'unknown' | 'unavailable'

export type Measure<T = string> = {
  quality: Quality
  /** Present for live / stale / idle. Absent for pending / empty / unknown / unavailable. */
  value?: T
  /** Where it came from: an RPC method or endpoint. Required. */
  source: string
  /** Unix seconds the value was true as of. Drives the "as of" stamp. */
  asOf?: number
  /** One clause explaining an absence, or qualifying a value. */
  note?: string
  /**
   * The CONTROL: a second, independent observation that makes the quality claim
   * falsifiable.
   *
   * `note` says what we believe; `control` says why you should believe it. It
   * matters most for `unknown` and `empty`, the two qualities a sceptical reader
   * will assume we invented to excuse a bug. "There is no indexer" is an
   * assertion; "the indexer endpoint returns HTTP 404" is a measurement that
   * would have disproved the assertion had it come out the other way.
   *
   * Never write a control that was not actually run.
   */
  control?: string
}

export const pending = (source: string): Measure => ({ quality: 'pending', source })

export const live = <T>(value: T, source: string, asOf?: number, note?: string): Measure<T> =>
  ({ quality: 'live', value, source, asOf, note })

export const stale = <T>(value: T, source: string, asOf: number, note?: string): Measure<T> =>
  ({ quality: 'stale', value, source, asOf, note })

export const idle = <T>(value: T, source: string, note: string, asOf?: number): Measure<T> =>
  ({ quality: 'idle', value, source, asOf, note })

export const empty = (source: string, note: string, control?: string): Measure =>
  ({ quality: 'empty', source, note, control })

export const unknown = (source: string, note: string, control?: string): Measure =>
  ({ quality: 'unknown', source, note, control })

export const unavailable = (source: string, note: string, control?: string): Measure =>
  ({ quality: 'unavailable', source, note, control })

// --- the unserved register --------------------------------------------------
//
// Figures this explorer is asked for and cannot honestly produce, each with the
// control that proves it is unserved rather than zero. Measured 2026-08-04
// against the public endpoint; every control is one curl and reproducible.
//
// These are stated OUT LOUD on the page rather than quietly omitted. A visitor
// who expects a price and finds no tile assumes the page is broken; a visitor
// who reads "no price oracle is deployed on this network" has learned the truth.
// One register, so no screen can decide any of this differently.
export const UNSERVED = {
  totalTransactions: unknown(
    'chain indexer',
    'Counting every transaction ever requires an indexer, and none is deployed for this network.',
    'https://explore.zoo.network/api/v2/stats returns HTTP 404. A JSON-RPC node can serve a block on request but cannot sum 15,000 of them per page load.',
  ),
  accounts: unknown(
    'chain indexer',
    'The JSON-RPC interface has no method that enumerates accounts, so an account total cannot be measured.',
    'eth_* exposes balances only for an address you already hold; there is no eth_getAccounts on a public node, and the indexer that would keep the set returns HTTP 404.',
  ),
  price: unknown(
    'price oracle',
    'No price oracle or market feed is deployed for ZOO on this network.',
    'The C-Chain serves no oracle contract for ZOO and no external feed is configured. The figure previously shown here was a literal in the page source, not a quote.',
  ),
  peers: unknown(
    'net_peerCount',
    'The public RPC does not expose peer counts.',
    'net_peerCount returns 0x0 while the same endpoint serves blocks and a 5-validator P-Chain set — a serving node cannot have zero peers.',
  ),
} as const

/**
 * The one place a value's age becomes a quality. `budgetSec` is how long this
 * particular figure stays trustworthy.
 */
export function graded<T>(value: T, source: string, asOf: number, budgetSec: number, note?: string): Measure<T> {
  const age = Math.max(0, Math.floor(Date.now() / 1000) - asOf)
  return age > budgetSec ? stale(value, source, asOf, note) : live(value, source, asOf, note)
}

/** True when the measure carries a real value the caller can read. */
export const has = <T>(m: Measure<T>): m is Measure<T> & { value: T } => m.value !== undefined

/** The word shown in place of a value. One vocabulary, used everywhere. */
export const ABSENCE: Record<Quality, string> = {
  pending: '···',
  live: '',
  stale: '',
  idle: '',
  empty: 'none',
  unknown: 'unknown',
  unavailable: 'unavailable',
}

/** Tailwind text colour per quality. `live` is the ONLY green in the system. */
export const QUALITY_CLASS: Record<Quality, string> = {
  pending: 'text-muted-foreground',
  live: 'text-foreground',
  stale: 'text-amber-500',
  idle: 'text-foreground',
  empty: 'text-muted-foreground',
  unknown: 'text-muted-foreground',
  unavailable: 'text-red-500',
}

// Human age from unix seconds: "3d 4h", "12m", "45s". Shared by every freshness
// stamp so two parts of the page can never disagree about how old a block is.
export function ago(unix: number, now = Date.now()): string {
  const sec = Math.max(0, Math.floor(now / 1000) - unix)
  const d = Math.floor(sec / 86400)
  const h = Math.floor((sec % 86400) / 3600)
  const m = Math.floor((sec % 3600) / 60)
  if (d > 0) return `${d}d ${h}h`
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return `${sec}s`
}

export function stamp(unix: number): string {
  if (!unix) return '—'
  return new Date(unix * 1000).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  })
}

// --- graded network health -------------------------------------------------
//
// Binary up/down is the second lie: a chain two days idle and a chain producing
// blocks every second both rendered as "live". Health has grades, and a green
// dot on an old head is banned by construction — health() cannot return 'ok'
// for a head outside its freshness budget.

export type Health = 'ok' | 'idle' | 'degraded' | 'down' | 'checking'

export const HEALTH_LABEL: Record<Health, string> = {
  ok: 'producing blocks',
  idle: 'at rest',
  degraded: 'degraded',
  down: 'unreachable',
  checking: 'checking',
}

export const HEALTH_CLASS: Record<Health, string> = {
  ok: 'bg-green-500/10 text-green-600 border-green-500/20',
  idle: 'bg-muted text-muted-foreground border-border',
  degraded: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  down: 'bg-red-500/10 text-red-600 border-red-500/20',
  checking: 'bg-muted text-muted-foreground border-border',
}
