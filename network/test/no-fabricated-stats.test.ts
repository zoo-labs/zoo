// The guard. This test exists because the page shipped these figures for months:
//
//   app/page.tsx:25   blockHeight:  1234567     (real chain head: 15,008)
//   app/page.tsx:26   transactions: 5678901
//   app/page.tsx:27   accounts:     123456
//   app/page.tsx:30   price:        25.50
//   components/network-stats.tsx  tps/gasPrice/nodeCount = Math.random()
//   components/block-list.tsx     hashes, miners, tx counts = Math.random()
//
// Every one was invented, and nothing in the build objected. A reviewer had to
// notice, and for months nobody did.
//
// So the property is asserted mechanically instead: source files that render
// figures may not contain fabricated data, and the figures they DO render must
// come through the Measure type, which cannot be constructed without a source.
//
// Run: pnpm test

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SCANNED = ['app', 'components', 'lib']

function sources(): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) {
        if (name !== 'node_modules' && name !== '.next') walk(p)
      } else if (/\.tsx?$/.test(p) && !p.endsWith('.d.ts')) {
        out.push(p)
      }
    }
  }
  for (const d of SCANNED) walk(join(ROOT, d))
  return out
}

const FILES = sources().map((p) => ({ path: relative(ROOT, p), text: readFileSync(p, 'utf8') }))

/** Strip comments, so the historical record above and in the source is not itself a hit. */
const code = (text: string) =>
  text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

test('the source files exist and were scanned', () => {
  // Guards the guard: a path typo would silently make every assertion vacuous.
  assert.ok(FILES.length >= 10, `expected to scan the app, found ${FILES.length} files`)
  assert.ok(FILES.some((f) => f.path === 'app/page.tsx'), 'app/page.tsx must be scanned')
  assert.ok(FILES.some((f) => f.path === 'components/network-stats.tsx'), 'network-stats must be scanned')
})

test('no simulated data: Math.random is not used to produce a displayed value', () => {
  const hits = FILES.filter((f) => /Math\.random\s*\(/.test(code(f.text))).map((f) => f.path)
  assert.deepEqual(hits, [], `Math.random() produces fabricated data; found in: ${hits.join(', ')}`)
})

test('the exact literals that shipped are gone and cannot return', () => {
  // The figures the site actually displayed, and the market cap behind them.
  const FABRICATED: [RegExp, string][] = [
    [/\b1_?234_?567\b/, 'the fake block height 1234567'],
    [/\b5_?678_?901\b/, 'the fake transaction total 5678901'],
    [/\b123_?456\b/, 'the fake account count 123456'],
    [/\b25\.50?\b/, 'the fake ZOO price 25.50'],
    [/\b1_?000_?000_?000\b/, 'the fake market cap 1000000000'],
  ]
  const hits: string[] = []
  for (const f of FILES) {
    for (const [re, what] of FABRICATED) {
      if (re.test(code(f.text))) hits.push(`${f.path}: ${what}`)
    }
  }
  assert.deepEqual(hits, [], `fabricated literals reintroduced:\n  ${hits.join('\n  ')}`)
})

test('no invented trend copy', () => {
  // "+12.5% from last week", "+8.5% (24h)", "+1 block every ~2s" were captions
  // under the fake tiles. Nothing measured any of them; the real block interval
  // ranged 5-40s. A trend needs a time series this explorer does not keep.
  const TREND = /[+-]\s?\d+(\.\d+)?%\s*(\(24h\)|from last|this week|today)|every\s*~\s*\d+\s*s\b/i
  const hits = FILES.filter((f) => TREND.test(code(f.text))).map((f) => f.path)
  assert.deepEqual(hits, [], `invented trend copy found in: ${hits.join(', ')}`)
})

test('stat components render through Measure, never a bare value', () => {
  // <Stat> takes a Measure, and a Measure cannot be built without a `source`.
  // That is the structural property; this asserts the components still use it.
  for (const path of ['app/page.tsx', 'components/network-stats.tsx']) {
    const f = FILES.find((x) => x.path === path)!
    assert.match(f.text, /<Stat\b/, `${path} must render figures through <Stat>`)
    assert.match(
      f.text,
      /chainFigures\(/,
      `${path} must take its figures from chainFigures(), the only source of measured values`,
    )
  }
})

test('the chain client is the only thing that talks to the network', () => {
  // A component calling fetch() directly is how a second, ungraded source of
  // numbers gets in — the failure mode this whole design removes.
  const offenders = FILES.filter(
    (f) => f.path.startsWith('components/') || f.path.startsWith('app/'),
  ).filter((f) => /\bfetch\s*\(/.test(code(f.text)))
  assert.deepEqual(
    offenders.map((f) => f.path),
    [],
    'components must read the chain through lib/chain, not fetch() directly',
  )
})

test('the RPC endpoint is the real one, on the correct path', () => {
  const chain = FILES.find((f) => f.path === 'lib/chain.ts')!
  // /v1/chain/c returns HTTP 404 on this estate; the path is /v1/chain/c.
  assert.ok(!/\/ext\/bc\//.test(code(chain.text)), 'the RPC path is /v1/chain/c, never /ext/')
  assert.match(chain.text, /rpc\.zoo\.network\/v1\/bc\/C\/rpc/, 'the default C-Chain RPC must be the live endpoint')
  assert.match(chain.text, /CHAIN_ID\s*=\s*200200\b/, 'Zoo mainnet is chain 200200 (verified eth_chainId → 0x30e08)')

  const wagmi = FILES.find((f) => f.path === 'lib/wagmi.ts')!
  assert.ok(!/localhost:8545/.test(code(wagmi.text)), 'the wallet chain config must not point at localhost')
})

test('no Lux or Hanzo branding on this Zoo surface', () => {
  // Zoo is its own brand; shared infrastructure white-labels by domain, so a
  // Lux or Hanzo name must never reach a Zoo page.
  //
  // The one permitted occurrence is the analytics endpoint (insights.hanzo.ai).
  // That is a backend our own telemetry posts to — it renders nothing, shows no
  // logo, and names no brand to a visitor. Exempting it by its hostname keeps
  // the exemption narrow: any OTHER mention of either brand still fails.
  const BRAND = /\b(lux|hanzo)\b/i
  const INFRA_ENDPOINT = /insights\.hanzo\.ai/
  const hits: string[] = []
  for (const f of FILES) {
    for (const line of code(f.text).split('\n')) {
      if (BRAND.test(line) && !INFRA_ENDPOINT.test(line)) hits.push(`${f.path}: ${line.trim().slice(0, 80)}`)
    }
  }
  assert.deepEqual(hits, [], `Lux/Hanzo branding on a Zoo surface:\n  ${hits.join('\n  ')}`)
})
