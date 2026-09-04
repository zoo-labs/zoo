// What the explorer does when the chain misbehaves.
//
// The guard test proves no fabricated literal is in the source. This one proves
// the replacement degrades honestly: every failure mode must produce a Measure
// with NO value, so the UI has nothing plausible to render even if it wanted to.
//
// The fixtures are real responses captured from https://rpc.zoo.network on
// 2026-08-04, including the split-brain: eth_blockNumber answered 15025 while
// block 15025 returned "cannot query unfinalized data" and the servable head
// was 15008, two days old.
//
// Run: pnpm test

import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { chainFigures, grade, probe, blockRows, txRows, formatZoo, readValidators } from '../lib/chain.ts'
import type { Measure } from '../lib/measure.ts'

const HEAD_TS = 1785622958 // real timestamp of block 15008
const NOW_STALLED = (HEAD_TS + 239_989) * 1000 // the age actually observed: ~2d 18h

const block = (n: number, ts: number, txs = 2) => ({
  number: '0x' + n.toString(16),
  hash: '0x4b93e7e9c2db1462851f5b7e8670752120ad782dfff61c92bf4dba508b1e3eed',
  timestamp: '0x' + ts.toString(16),
  miner: '0x0100000000000000000000000000000000000000',
  gasUsed: '0x' + (21000 * txs).toString(16),
  gasLimit: '0xb71b00', // 12,000,000
  transactions: Array.from({ length: txs }, (_, i) => ({
    hash: '0x8943c32aac4f13d0c843' + i.toString().padStart(44, '0'),
    from: '0x1b475a4c98d0b0e37c0f3e0c0a0b0c0d0e0f0102',
    to: '0x1b475a4c98d0b0e37c0f3e0c0a0b0c0d0e0f0102',
    value: '0x0',
    gas: '0x5208',
    blockNumber: '0x' + n.toString(16),
  })),
})

/** Answer a JSON-RPC batch the way the live endpoint does. */
function stubChain(opts: { reportedHeight?: number; headTs?: number; head?: number } = {}) {
  const head = opts.head ?? 15008
  const headTs = opts.headTs ?? HEAD_TS
  globalThis.fetch = (async (_url: string, init: { body: string }) => {
    const req = JSON.parse(init.body)
    const calls = Array.isArray(req) ? req : [req]
    const answer = (c: { id: number; method: string; params: unknown[] }) => {
      switch (c.method) {
        case 'eth_getBlockByNumber': {
          const tag = c.params[0] as string
          const n = tag === 'latest' ? head : Number(BigInt(tag))
          // Above the servable head the node refuses, exactly as observed.
          if (n > head) return { id: c.id, error: { code: -32000, message: 'cannot query unfinalized data' } }
          return { id: c.id, result: block(n, headTs - (head - n) * 15) }
        }
        case 'eth_chainId': return { id: c.id, result: '0x30e08' }
        case 'eth_gasPrice': return { id: c.id, result: '0x5d21dba01' }
        case 'eth_syncing': return { id: c.id, result: false }
        case 'eth_blockNumber':
          return { id: c.id, result: '0x' + (opts.reportedHeight ?? head).toString(16) }
        default: return { id: c.id, error: { message: 'method not found' } }
      }
    }
    const body = calls.map(answer)
    return new Response(JSON.stringify(Array.isArray(req) ? body : body[0]), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }) as unknown as typeof fetch
}

const realFetch = globalThis.fetch
afterEach(() => { globalThis.fetch = realFetch })

/** Every figure in a set, so a new one cannot skip the invariant. */
const all = (f: Record<string, Measure>) => Object.entries(f)

// --- the invariant ----------------------------------------------------------

test('an unread chain yields pending figures, never zeros', () => {
  for (const [name, m] of all(chainFigures(null, null) as unknown as Record<string, Measure>)) {
    assert.equal(m.quality, 'pending', `${name} must be pending before the first read`)
    assert.equal(m.value, undefined, `${name} must not carry a value before anything was read`)
  }
})

test('an unreachable endpoint yields no values at all', () => {
  const figures = chainFigures({ ok: false, reason: 'HTTP 503 from the RPC endpoint' }, { ok: false, reason: 'no answer' })
  for (const [name, m] of all(figures as unknown as Record<string, Measure>)) {
    assert.equal(m.value, undefined, `${name} must have no value when the endpoint is down`)
    assert.equal(m.quality, 'unavailable', `${name} must be marked unavailable`)
    assert.ok(m.source, `${name} must still say which call failed`)
    assert.ok(m.note, `${name} must carry the reason`)
  }
})

test('every constructed figure carries provenance', () => {
  // `source` is required by the type; this proves no path produces a blank one,
  // which is what makes "where did this number come from" always answerable.
  const cases = [
    chainFigures(null, null),
    chainFigures({ ok: false, reason: 'x' }, { ok: false, reason: 'y' }),
  ]
  for (const f of cases) {
    for (const [name, m] of all(f as unknown as Record<string, Measure>)) {
      assert.ok(m.source.length > 0, `${name} must name its source`)
    }
  }
})

// --- degraded shapes --------------------------------------------------------

test('HTTP 503 becomes an unavailable measure, not an exception', async () => {
  globalThis.fetch = (async () => new Response('upstream unavailable', { status: 503 })) as unknown as typeof fetch
  const p = await probe('https://example.invalid/rpc')
  assert.equal(p.ok, false)
  assert.match(p.ok === false ? p.reason : '', /HTTP 503/)
  assert.equal(grade(p).health, 'down')
})

test('a 404 on the wrong RPC path is reported as such', async () => {
  // The /v1/chain/c path returns 404 on this estate. A silent empty state here
  // is how a misconfigured path looks identical to a dead chain.
  globalThis.fetch = (async () => new Response('404 page not found', { status: 404 })) as unknown as typeof fetch
  const p = await probe('https://rpc.zoo.network/v1/chain/zoo')
  assert.equal(p.ok, false)
  assert.match(p.ok === false ? p.reason : '', /HTTP 404/)
})

test('an HTML error page is not mistaken for chain data', async () => {
  globalThis.fetch = (async () =>
    new Response('<html>gateway</html>', { status: 200, headers: { 'content-type': 'text/html' } })) as unknown as typeof fetch
  const p = await probe('https://example.invalid/rpc')
  assert.equal(p.ok, false)
  assert.match(p.ok === false ? p.reason : '', /did not return JSON/)
})

test('a network failure is reported with its reason', async () => {
  globalThis.fetch = (async () => { throw new Error('getaddrinfo ENOTFOUND') }) as unknown as typeof fetch
  const p = await probe('https://example.invalid/rpc')
  assert.equal(p.ok, false)
  assert.match(p.ok === false ? p.reason : '', /ENOTFOUND/)
})

// --- the real chain, as it actually is --------------------------------------

test('a real head block is decoded correctly', async () => {
  stubChain()
  const p = await probe('https://rpc.zoo.network/v1/chain/zoo')
  assert.equal(p.ok, true)
  if (!p.ok) return
  assert.equal(p.height, 15008)
  assert.equal(p.chainId, 200200)
  assert.equal(p.headTimestamp, HEAD_TS)
  assert.equal(p.headTxCount, 2)
  assert.equal(p.blocks.length, 10)
  assert.deepEqual(blockRows(p)[0].number, 15008)
  assert.equal(txRows(p).length, 10)
})

test('a stalled chain still shows the true height, graded stale — never green', () => {
  stubChain()
  const orig = Date.now
  Date.now = () => NOW_STALLED
  try {
    const p = {
      ok: true as const, height: 15008, chainId: 200200, headTimestamp: HEAD_TS, headTxCount: 2,
      gasPriceWei: 25e9, syncing: false, reportedHeight: 15008, unfinalizedAhead: 0,
      blocks: [block(15008, HEAD_TS)],
    }
    const s = grade(p)
    // eth_syncing false + old head = the chain produced nothing.
    assert.equal(s.health, 'idle')
    const f = chainFigures(p, { ok: true, count: 5 })
    // The height is TRUE, so it is shown — but it is not shown as live.
    assert.equal(f.height.value, '15,008')
    assert.equal(f.height.quality, 'idle')
    assert.equal(f.height.asOf, HEAD_TS)
    assert.notEqual(f.height.quality, 'live', 'a two-day-old head must never grade live')
  } finally {
    Date.now = orig
  }
})

test('blocks built but not finalized grade degraded, and the gap is disclosed', async () => {
  // The observed split-brain: eth_blockNumber says 15025, block 15025 is not
  // servable, the head is 15008. That is a stall, not a chain at rest.
  stubChain({ reportedHeight: 15025 })
  const orig = Date.now
  Date.now = () => NOW_STALLED
  try {
    const p = await probe('https://rpc.zoo.network/v1/chain/zoo')
    assert.equal(p.ok, true)
    if (!p.ok) return
    assert.equal(p.height, 15008, 'the servable head, not the reported one, is the height')
    assert.equal(p.reportedHeight, 15025)
    assert.equal(p.unfinalizedAhead, 17)

    const s = grade(p)
    assert.equal(s.health, 'degraded', 'a chain building without finalizing is degraded, not idle')
    assert.match(s.reason, /not finalized/)

    const f = chainFigures(p, { ok: true, count: 5 })
    assert.equal(f.height.value, '15,008')
    assert.match(f.height.control!, /15,025/, 'the gap must be disclosed as a control')
    assert.match(f.height.control!, /cannot query unfinalized data/)
  } finally {
    Date.now = orig
  }
})

test('a fresh chain grades live', () => {
  const now = Math.floor(Date.now() / 1000)
  const p = {
    ok: true as const, height: 20000, chainId: 200200, headTimestamp: now - 5, headTxCount: 3,
    gasPriceWei: 25e9, syncing: false, reportedHeight: 20000, unfinalizedAhead: 0,
    blocks: [block(20000, now - 5), block(19999, now - 20)],
  }
  assert.equal(grade(p).health, 'ok')
  const f = chainFigures(p, { ok: true, count: 5 })
  assert.equal(f.height.quality, 'live')
  assert.equal(f.height.value, '20,000')
  assert.equal(f.height.control, undefined, 'no gap, so no control to disclose')
})

test('a node that is behind is degraded, not idle', () => {
  const p = {
    ok: true as const, height: 100, chainId: 200200, headTimestamp: 1, headTxCount: 0,
    gasPriceWei: 25e9, syncing: true, reportedHeight: 100, unfinalizedAhead: 0, blocks: [block(100, 1, 0)],
  }
  const s = grade(p)
  assert.equal(s.health, 'degraded')
  assert.match(s.reason, /behind the chain/)
})

// --- genuine zeros are distinguishable from failures ------------------------

test('a genuinely empty block is empty, with a control — not unavailable', () => {
  const now = Math.floor(Date.now() / 1000)
  const p = {
    ok: true as const, height: 7, chainId: 200200, headTimestamp: now, headTxCount: 0,
    gasPriceWei: 25e9, syncing: false, reportedHeight: 7, unfinalizedAhead: 0, blocks: [block(7, now, 0)],
  }
  const f = chainFigures(p, { ok: true, count: 5 })
  assert.equal(f.headTxs.quality, 'empty')
  assert.equal(f.headTxs.value, undefined, 'an absence carries no value to render')
  assert.ok(f.headTxs.control, 'a genuine zero must prove the read worked')
})

test('a P-Chain failure does not blank the C-Chain figures', () => {
  const now = Math.floor(Date.now() / 1000)
  const p = {
    ok: true as const, height: 42, chainId: 200200, headTimestamp: now, headTxCount: 1,
    gasPriceWei: 25e9, syncing: false, reportedHeight: 42, unfinalizedAhead: 0, blocks: [block(42, now, 1)],
  }
  const f = chainFigures(p, { ok: false, reason: 'P-Chain did not answer' })
  assert.equal(f.validators.quality, 'unavailable')
  assert.equal(f.validators.value, undefined)
  assert.equal(f.height.value, '42', 'the C-Chain leg must survive a P-Chain flap')
})

test('validators are read from the P-Chain validator list', async () => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ jsonrpc: '2.0', id: 0, result: { validators: new Array(5).fill({}) } }), {
      status: 200, headers: { 'content-type': 'application/json' },
    })) as unknown as typeof fetch
  const vs = await readValidators('https://rpc.zoo.network/v1/chain/P')
  assert.deepEqual(vs, { ok: true, count: 5 })
})

test('a malformed validator answer is unavailable, not zero validators', async () => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ jsonrpc: '2.0', id: 0, result: {} }), {
      status: 200, headers: { 'content-type': 'application/json' },
    })) as unknown as typeof fetch
  const vs = await readValidators('https://rpc.zoo.network/v1/chain/P')
  assert.equal(vs.ok, false)
  const f = chainFigures(null, vs)
  assert.equal(f.validators.quality, 'unavailable')
  assert.equal(f.validators.value, undefined, 'a broken read must never render as 0 validators')
})

// --- formatting -------------------------------------------------------------

test('ZOO amounts survive values a float would round away', () => {
  assert.equal(formatZoo(0n), '0.0000')
  assert.equal(formatZoo(10n ** 18n), '1.0000')
  assert.equal(formatZoo(1234n * 10n ** 14n), '0.1234')
  // 1,000,000 ZOO + 0.5 — exact through bigint, lossy through Number.
  assert.equal(formatZoo(10n ** 24n + 5n * 10n ** 17n), '1,000,000.5000')
})

test('the chain id is an identifier, not a quantity', () => {
  // "200,200" is not a chain id. A visitor copying it into a wallet must get
  // the real value, so this field is never thousands-separated.
  const now = Math.floor(Date.now() / 1000)
  const p = {
    ok: true as const, height: 1, chainId: 200200, headTimestamp: now, headTxCount: 1,
    gasPriceWei: 25e9, syncing: false, reportedHeight: 1, unfinalizedAhead: 0, blocks: [block(1, now, 1)],
  }
  assert.equal(chainFigures(p, { ok: true, count: 5 }).chainId.value, '200200')
})
