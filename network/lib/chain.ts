// The ONE place this explorer talks to the Zoo chain.
//
// Everything rendered on the site comes through here, so there is exactly one
// answer to "where did that number come from". Before this file existed the
// page invented its own: `blockHeight: 1234567`, `Math.random()` for TPS, a
// `$25.50` price. Nothing read from anything.
//
// A read never returns a bare number. It returns either a value with the
// provenance and timestamp needed to grade it, or the reason it failed — so a
// caller cannot accidentally turn a failure into a plausible-looking figure.

import {
  type Measure,
  type Health,
  graded,
  idle,
  live,
  empty,
  pending,
  stamp,
  unavailable,
  UNSERVED,
  // The explicit .ts extension lets `node --test` run this module directly, with
  // no build step and no test-runner dependency. TypeScript allows it via
  // allowImportingTsExtensions; webpack resolves the literal filename.
} from './measure.ts'

/**
 * Zoo mainnet C-Chain.
 *
 * The path is `/v1/bc/C/rpc`. It is NOT `/ext/bc/C/rpc` — that returns HTTP 404
 * on this estate, which is how an explorer ends up showing nothing and blaming
 * the chain.
 */
export const RPC_URL =
  process.env.NEXT_PUBLIC_ZOO_RPC_URL || 'https://rpc.zoo.network/v1/bc/C/rpc'

/** The P-Chain serves the validator set. Different VM, different protocol. */
export const P_RPC_URL =
  process.env.NEXT_PUBLIC_ZOO_P_RPC_URL || 'https://rpc.zoo.network/v1/bc/P'

/** Zoo mainnet. Verified: eth_chainId → 0x30e08. */
export const CHAIN_ID = 200200

/** How long a head stays "fresh" before the surface must say how old it is. */
export const FRESH_BUDGET_SEC = 600

/** How many blocks the block/transaction lists read. */
export const RECENT_BLOCKS = 10

const TIMEOUT_MS = 10_000

// --- transport ---------------------------------------------------------------

type RpcCall = { method: string; params: unknown }

/**
 * One HTTP round trip, one or many JSON-RPC calls.
 *
 * Batching matters here: the block list needs ten blocks, and ten sequential
 * round trips against a public endpoint is both slow and a good way to get rate
 * limited. The endpoint accepts a JSON array and answers with one — verified.
 *
 * Every failure mode ends as a thrown Error carrying a human reason, because the
 * caller's job is to turn that reason into an `unavailable` Measure, and a reason
 * a reader cannot act on is nearly as bad as a fabricated number.
 */
async function rpcBatch(url: string, calls: RpcCall[]): Promise<unknown[]> {
  const body = calls.map((c, i) => ({ jsonrpc: '2.0', id: i, method: c.method, params: c.params }))
  let res: Response
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(calls.length === 1 ? body[0] : body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch (e) {
    // A timeout and a DNS failure are both "we could not ask", but they are not
    // the same fault, so the reason is carried through rather than flattened.
    const why = e instanceof Error && e.name === 'TimeoutError'
      ? `no answer within ${TIMEOUT_MS / 1000}s`
      : e instanceof Error ? e.message : String(e)
    throw new Error(why)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} from the RPC endpoint`)

  let json: unknown
  try {
    json = await res.json()
  } catch {
    // An HTML error page from a proxy parses as neither JSON nor a chain answer.
    throw new Error('the RPC endpoint did not return JSON')
  }

  const rows = Array.isArray(json) ? json : [json]
  const out = new Array<unknown>(calls.length)
  for (const row of rows as { id?: number; result?: unknown; error?: { message?: string } }[]) {
    const i = typeof row.id === 'number' ? row.id : 0
    // A per-call JSON-RPC error is recorded as undefined rather than throwing the
    // whole batch away: on this chain `eth_getBlockByNumber` legitimately answers
    // "cannot query unfinalized data" for a height eth_blockNumber just reported,
    // and one such gap must not blank the nine blocks that did come back.
    out[i] = row.error ? undefined : row.result
  }
  return out
}

const hexToNum = (h: unknown): number => (typeof h === 'string' ? Number(BigInt(h)) : NaN)

// --- probe -------------------------------------------------------------------

export type RawBlock = {
  number: string
  hash: string
  timestamp: string
  miner: string
  gasUsed: string
  gasLimit: string
  transactions: RawTx[]
}

export type RawTx = {
  hash: string
  from: string
  to: string | null
  value: string
  gas: string
  gasPrice?: string
  blockNumber: string
}

export type Probe =
  | {
      ok: true
      /** The head the node will actually SERVE — from the head block itself. */
      height: number
      chainId: number
      headTimestamp: number
      headTxCount: number
      gasPriceWei: number
      syncing: boolean | undefined
      /**
       * What eth_blockNumber claims, which on this chain is not always the same
       * as the head that can be read back. See `unfinalizedAhead`.
       */
      reportedHeight: number
      /**
       * Blocks built but not retrievable — `eth_blockNumber` minus the servable
       * head. Non-zero means consensus is building without finalizing, which is
       * a STALL, not a network at rest. Measured 2026-08-04: eth_blockNumber
       * answered 15025 while block 15025 returned "cannot query unfinalized
       * data" and the servable head was 15008.
       */
      unfinalizedAhead: number
      blocks: RawBlock[]
    }
  | { ok: false; reason: string }

/**
 * Read the chain's head and the recent blocks behind it, in one round trip.
 *
 * `eth_getBlockByNumber('latest')` is the anchor rather than `eth_blockNumber`,
 * because it yields the height AND the timestamp AND the head's transactions
 * together — so freshness costs no extra request and, more importantly, the
 * height can never disagree with the block it describes. `eth_blockNumber` is
 * still asked, but as a CONTROL on the head rather than as the headline figure:
 * when the two disagree the chain is building blocks it cannot finalize, and
 * that difference is real information a visitor should see.
 */
export async function probe(url = RPC_URL): Promise<Probe> {
  try {
    const [head, cid, gas, sync, reported] = await rpcBatch(url, [
      { method: 'eth_getBlockByNumber', params: ['latest', true] },
      { method: 'eth_chainId', params: [] },
      { method: 'eth_gasPrice', params: [] },
      { method: 'eth_syncing', params: [] },
      { method: 'eth_blockNumber', params: [] },
    ])

    const blk = head as RawBlock | undefined
    if (!blk || typeof blk.number !== 'string') {
      return { ok: false, reason: 'the endpoint answered without a head block' }
    }

    const height = hexToNum(blk.number)
    const reportedHeight = hexToNum(reported)

    // Walk back from the head for the list. The head is already in hand, so only
    // the tail is requested.
    const want = Array.from({ length: RECENT_BLOCKS - 1 }, (_, i) => height - 1 - i).filter((n) => n >= 0)
    const tail = want.length
      ? await rpcBatch(url, want.map((n) => ({
          method: 'eth_getBlockByNumber',
          params: ['0x' + n.toString(16), true],
        })))
      : []

    const blocks = [blk, ...(tail as (RawBlock | undefined)[])].filter(
      (b): b is RawBlock => !!b && typeof b.number === 'string',
    )

    return {
      ok: true,
      height,
      chainId: hexToNum(cid),
      headTimestamp: hexToNum(blk.timestamp),
      headTxCount: blk.transactions?.length ?? 0,
      gasPriceWei: hexToNum(gas),
      syncing: sync === undefined ? undefined : sync !== false,
      reportedHeight: Number.isFinite(reportedHeight) ? reportedHeight : height,
      unfinalizedAhead: Number.isFinite(reportedHeight) ? Math.max(0, reportedHeight - height) : 0,
      blocks,
    }
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) }
  }
}

// --- grading -----------------------------------------------------------------

export type ChainStatus = {
  health: Health
  /** One clause a visitor can act on. Always set once the probe resolves. */
  reason: string
}

/**
 * Turn a probe into a health grade.
 *
 * A green dot on a two-day-old head is unreachable by construction: `ok` is
 * returned only inside the freshness budget. The interesting case is an old
 * head, because "the chain produced nothing" and "this node is behind" look
 * identical from a height alone:
 *
 *   syncing            → this NODE is behind the chain            → degraded
 *   blocks unfinalized → consensus is building but not certifying → degraded
 *   neither            → the chain produced nothing               → idle
 *
 * The middle case is the one this chain needed. Without it a stalled chain
 * grades the same as a quiet one, and "at rest" would be a comfortable lie.
 */
export function grade(p: Probe, budgetSec = FRESH_BUDGET_SEC): ChainStatus {
  if (!p.ok) return { health: 'down', reason: p.reason }

  const age = Math.max(0, Math.floor(Date.now() / 1000) - p.headTimestamp)
  if (age <= budgetSec) return { health: 'ok', reason: 'producing blocks' }
  if (p.syncing === true) return { health: 'degraded', reason: 'this node is behind the chain (eth_syncing)' }
  if (p.unfinalizedAhead > 0) {
    return {
      health: 'degraded',
      reason: `${p.unfinalizedAhead} block${p.unfinalizedAhead === 1 ? '' : 's'} built but not finalized — the chain is not advancing`,
    }
  }
  if (p.syncing === false) return { health: 'idle', reason: 'no new block; this node is caught up with the chain' }
  return { health: 'degraded', reason: 'the head is old and the node does not report eth_syncing' }
}

// --- figures -----------------------------------------------------------------

export type ChainFigures = {
  height: Measure
  lastBlock: Measure
  headTxs: Measure
  gasPrice: Measure
  gasUsed: Measure
  validators: Measure
  blockInterval: Measure
  chainId: Measure
}

const int = (n: number) => n.toLocaleString('en-US')

/**
 * Grade a figure derived from the C-Chain head.
 *
 * On a chain at rest a flat figure is CORRECT, so it must not be painted as
 * stale. Staleness is a value we expected to have moved; idleness is a network
 * nothing asked to move. Same age, opposite meaning — the caller says which.
 */
function headFigure<T>(s: ChainStatus, p: Extract<Probe, { ok: true }>, value: T, source: string, idleNote: string): Measure<T> {
  if (s.health === 'idle') return idle(value, source, idleNote, p.headTimestamp)
  return graded(value, source, p.headTimestamp, FRESH_BUDGET_SEC)
}

/**
 * The public figures, derived from one probe and the validator set.
 *
 * `null` for either leg means "not read yet" → `pending`. The two legs degrade
 * INDEPENDENTLY: a P-Chain flap must not blank the C-Chain figures, because one
 * dead endpoint blanking a whole page is how unexplained zeros get shipped.
 */
export function chainFigures(p: Probe | null, vs: ValidatorSet | null): ChainFigures {
  if (!p) {
    // The C-Chain read is still in flight — but the P-Chain leg may already have
    // resolved, and holding a finished answer hostage to an unfinished one is
    // the coupling this function exists to avoid.
    const q = pending('reading the chain…')
    return {
      height: q, lastBlock: q, headTxs: q, gasPrice: q, gasUsed: q,
      validators: validatorMeasure(vs), blockInterval: q, chainId: q,
    }
  }

  const s = grade(p)

  if (!p.ok) {
    const u = unavailable('eth_getBlockByNumber', p.reason)
    return {
      height: u,
      lastBlock: u,
      headTxs: u,
      gasPrice: unavailable('eth_gasPrice', p.reason),
      gasUsed: u,
      validators: validatorMeasure(vs),
      blockInterval: u,
      chainId: u,
    }
  }

  // The head height, with the unfinalized gap as its CONTROL. A visitor who sees
  // 15,008 while a block explorer elsewhere says 15,025 deserves to know which
  // is servable and why they differ, rather than being left to guess.
  const height: Measure = {
    ...headFigure(s, p, int(p.height), 'eth_getBlockByNumber · latest', 'no new block has been produced'),
    control: p.unfinalizedAhead > 0
      ? `eth_blockNumber reports ${int(p.reportedHeight)}, but block ${int(p.reportedHeight)} cannot be read back ("cannot query unfinalized data"). ${int(p.height)} is the highest block this endpoint will actually serve.`
      : undefined,
  }

  // The head's age IS this tile's value, so the "as of …" stamp <Stat> renders
  // from `asOf` would just say the same thing twice. The wall-clock time goes in
  // the note instead, which is the part the age does not already tell you.
  const lastBlock: Measure = {
    ...headFigure(s, p, ago_(p.headTimestamp), 'eth_getBlockByNumber · timestamp', 'the chain is not producing blocks'),
    asOf: undefined,
    note: stamp(p.headTimestamp),
  }

  // The head block's transaction count is the best evidence that a quiet chain
  // did real work rather than being stuck. A zero here is the block's genuine
  // content, so it is `empty` with the control that proves the read worked.
  const headTxs: Measure = p.headTxCount === 0
    ? empty(
        'eth_getBlockByNumber · transactions',
        'The last block carried no transactions.',
        'The block itself was read successfully, so this zero is the block\'s real content.',
      )
    : headFigure(s, p, int(p.headTxCount), 'eth_getBlockByNumber · transactions', 'in the last block produced')

  // Gas price is a node's current quote. It does not depend on block production,
  // so it is live even while the chain is at rest.
  const gasPrice: Measure = Number.isFinite(p.gasPriceWei)
    ? live(`${(p.gasPriceWei / 1e9).toFixed(2)} Gwei`, 'eth_gasPrice')
    : unavailable('eth_gasPrice', 'The endpoint did not return a gas price.')

  // An identifier, not a quantity — so no thousands separator ("200200", never
  // "200,200"). A visitor copying it into a wallet must get the real thing.
  const chainId: Measure = Number.isFinite(p.chainId)
    ? live(String(p.chainId), 'eth_chainId')
    : unavailable('eth_chainId', 'The endpoint did not return a chain id.')

  // Head-block gas utilisation. A zero is the block's real content, not a
  // failure, so it is `empty` with the control that proves the read worked.
  const head = p.blocks[0]
  const used = head ? hexToNum(head.gasUsed) : NaN
  const limit = head ? hexToNum(head.gasLimit) : NaN
  const gasUsed: Measure = !Number.isFinite(used) || !Number.isFinite(limit) || limit === 0
    ? unavailable('eth_getBlockByNumber · gasUsed', 'The head block did not report gas usage.')
    : used === 0
      ? empty(
          'eth_getBlockByNumber · gasUsed',
          'The last block consumed no gas.',
          'The block was read successfully and reports a gas limit, so this zero is the block\'s real content.',
        )
      : headFigure(
          s, p,
          `${((used / limit) * 100).toFixed(1)}%`,
          'eth_getBlockByNumber · gasUsed ÷ gasLimit',
          'of the last block produced',
        )

  return {
    height,
    lastBlock,
    headTxs,
    gasPrice,
    gasUsed,
    validators: validatorMeasure(vs),
    blockInterval: intervalMeasure(p, s),
    chainId,
  }
}

/** Mean seconds between the recent blocks that were actually read. */
function intervalMeasure(p: Extract<Probe, { ok: true }>, s: ChainStatus): Measure {
  const ts = p.blocks.map((b) => hexToNum(b.timestamp)).filter(Number.isFinite)
  if (ts.length < 2) {
    return empty(
      'eth_getBlockByNumber · timestamps',
      'Not enough blocks have been produced to measure an interval.',
      `${ts.length} block${ts.length === 1 ? '' : 's'} were read back from the head.`,
    )
  }
  const span = ts[0] - ts[ts.length - 1]
  const mean = span / (ts.length - 1)
  return headFigure(
    s,
    p,
    `${mean.toFixed(1)}s`,
    `eth_getBlockByNumber · mean over ${ts.length} blocks`,
    'measured over the last blocks produced',
  )
}

// --- validators --------------------------------------------------------------

export type ValidatorSet = { ok: true; count: number } | { ok: false; reason: string }

/**
 * The validator registry does not depend on block production, so it is `live`
 * even while the C-Chain is at rest. Grading it idle would imply the SET is
 * somehow at rest, which is not what is being measured.
 */
function validatorMeasure(vs: ValidatorSet | null): Measure {
  if (!vs) return pending('platform.getCurrentValidators')
  if (!vs.ok) return unavailable('platform.getCurrentValidators', vs.reason)
  if (vs.count === 0) {
    return empty(
      'platform.getCurrentValidators',
      'The P-Chain reports no current validators.',
      'The call itself succeeded and returned a validator list, so this zero is the list\'s real length.',
    )
  }
  return live(int(vs.count), 'platform.getCurrentValidators')
}

export async function readValidators(url = P_RPC_URL): Promise<ValidatorSet> {
  try {
    const [res] = await rpcBatch(url, [{ method: 'platform.getCurrentValidators', params: {} }])
    const list = (res as { validators?: unknown[] } | undefined)?.validators
    if (!Array.isArray(list)) throw new Error('the P-Chain answered without a validator list')
    return { ok: true, count: list.length }
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) }
  }
}

// --- decoded views for the block and transaction lists -----------------------

export type BlockRow = {
  number: number
  hash: string
  timestamp: number
  miner: string
  txCount: number
  gasUsed: number
  gasLimit: number
}

export type TxRow = {
  hash: string
  from: string
  to: string | null
  valueWei: bigint
  gas: number
  timestamp: number
  blockNumber: number
}

export function blockRows(p: Probe | null): BlockRow[] {
  if (!p || !p.ok) return []
  return p.blocks.map((b) => ({
    number: hexToNum(b.number),
    hash: b.hash,
    timestamp: hexToNum(b.timestamp),
    miner: b.miner,
    txCount: b.transactions?.length ?? 0,
    gasUsed: hexToNum(b.gasUsed),
    gasLimit: hexToNum(b.gasLimit),
  }))
}

/** Transactions from the blocks already read — no extra round trip. */
export function txRows(p: Probe | null, limit = 10): TxRow[] {
  if (!p || !p.ok) return []
  const out: TxRow[] = []
  for (const b of p.blocks) {
    const ts = hexToNum(b.timestamp)
    for (const t of b.transactions ?? []) {
      if (out.length >= limit) return out
      out.push({
        hash: t.hash,
        from: t.from,
        to: t.to,
        valueWei: BigInt(t.value ?? '0x0'),
        gas: hexToNum(t.gas),
        timestamp: ts,
        blockNumber: hexToNum(t.blockNumber ?? b.number),
      })
    }
  }
  return out
}

/** ZOO from wei, to 4dp, without going through a lossy Number for the whole value. */
export function formatZoo(wei: bigint): string {
  const whole = wei / 10n ** 18n
  const frac = (wei % 10n ** 18n) / 10n ** 14n // 4 decimal places
  return `${whole.toLocaleString('en-US')}.${frac.toString().padStart(4, '0')}`
}

// Re-exported so components import their vocabulary from one module.
export { UNSERVED }

// Local copy of `ago` to keep this module free of a UI import cycle.
function ago_(unix: number): string {
  const sec = Math.max(0, Math.floor(Date.now() / 1000) - unix)
  const d = Math.floor(sec / 86400)
  const h = Math.floor((sec % 86400) / 3600)
  const m = Math.floor((sec % 3600) / 60)
  if (d > 0) return `${d}d ${h}h ago`
  if (h > 0) return `${h}h ${m}m ago`
  if (m > 0) return `${m}m ago`
  return `${sec}s ago`
}
