# zoo.ngo — Zoo Labs Foundation site

Next.js **pages router**, **Tailwind v3**, static export. Deployed by
`.github/workflows/deploy-ngo.yml` (at the MONOREPO root, one level up): it
builds `./foundation` and syncs `foundation/out/` to `s3://hanzo-sites/zoo/ngo/`,
which the Hanzo ingress `staticFiles` middleware serves. Not GitHub Pages — the
root `CNAME` and the `_github-pages-challenge` file are leftovers.

## Stack, actually

- `next ^15.1` (`output: 'export'`, `trailingSlash: true`, `images.unoptimized`)
- `tailwindcss ^3.4` with the classic `tailwindcss` PostCSS plugin
- `@hanzo/font` — the Zen type family
- `@hanzo/event` — analytics; the ingest key is resolved from the HOST, never
  stated here, so zoo.ngo attributes to Zoo without this repo naming a key

An earlier version of this file described a Tailwind **v4** migration
(`@tailwindcss/postcss`, `@import "tailwindcss"`, `@utility`). That migration was
reverted; none of it is true. Check `postcss.config.js` before believing a claim
about the CSS pipeline.

## Design system — Hanzo's, inverted to light

zoo.ngo renders on the same token set as hanzo.ai, taking `@hanzo/design`'s
already-derived `.light` values. `src/styles/globals.css` declares them at
`:root`; `tailwind.config.ts` maps its semantic colors to `var(--token)` (NOT
`hsl(var(--token))` — the tokens are full color values, and borders are alpha so
one value composites on both the page and a lifted card).

Three light values are deliberately **pushed, not mirrored**, because black on
white reads fainter than white on black at equal alpha: `--border-focus`
.22→.32, `--border-selected` .30→.42, chrome ink .45→.56.

**Role classes** carry the shared shapes, the way hanzo.ai's do — `.display`,
`.title`, `.lede`, `.eyebrow`, `.action` (+ `[data-fill]`), `.pill`, `.more`,
`.card`. They are declared **unlayered**, so they beat Tailwind's `@layer
utilities`; do not try to override a role's font-size with a utility, it will
lose. Layout still comes from Tailwind.

Zoo's one departure from Hanzo's strict monochrome: `--brand` is emerald, spent
only on the primary action and the live/active state. A wildlife foundation that
spends no colour at all reads as Hanzo rather than as itself.

### House rules

- **No ALL CAPS, no underlines.** `a { color: inherit; text-decoration: none }`
  globally; underline appears only inside running prose, on hover. There is no
  `uppercase` and no `text-decoration: underline` in the export — keep it that
  way.
- **One typeface.** Zen, from `@hanzo/font`. The token names the ROLE
  (`font-sans` → `var(--font-zen-sans)`); nothing spells a family.
- **No emoji in chrome.** Header, footer and buttons carry none.

## Type

Zen is bound **once**, in `src/pages/_app.tsx`:

```tsx
import { Zen } from '@hanzo/font/sans'
import { ZenMono } from '@hanzo/font/mono'
// …
<div className={`${Zen.variable} ${ZenMono.variable} font-sans`}>
```

`next.config.js` must keep `transpilePackages: ['@hanzo/font']` — the package
ships ESM that imports `next/font/local`, and without webpack processing it the
page-data pass resolves the bare directory in plain Node and dies on
`ERR_UNSUPPORTED_DIR_IMPORT`.

next/font emits the `@font-face` **and** the preload, with the content hash.
Never hand-write a font preload here: this file used to preload
`/fonts/inter-var-latin.woff2`, which had not existed for months — a 404 on
every page load. Never hand-copy a woff2 into `public/` either; that loses the
OFL notice the licence requires to ship beside the binaries.

## Navigation — one source

`src/config/registry.ts` is the only place a destination is spelled: `U` (the
URL table), `NAV`, `LABS`, `CTA`, `FOOTER_COLUMNS`, `FOOTER_BOTTOM`, `SOCIAL`,
`STATS`. It mirrors the shape of `@hanzogui/shell`'s `hanzo-registry.ts`.

`Navbar` and `Footer` both project off it, and each renders ONE tree for desktop
and phone. Before this, the nav existed in five hand-written copies (desktop
menu, mobile menu, desktop footer, mobile footer, a dead starter `Header.tsx`)
which disagreed on both wording and destinations.

`Navbar`/`Footer` are still imported per page rather than mounted in
`Layout.tsx` (which is a pass-through). That is the next thing to collapse.

## Traps that have already cost a day

- **A dynamic route with no `getStaticPaths` exports as the LITERAL path.**
  `/animals/[animal]` wrote `out/animals/[animal]/` and every species link 404'd
  while the build stayed green. `getStaticPaths` now derives the routes from
  `animals.json`, the same file the page renders from.
- **`public/videos/` and `public/models/` do not exist** — not on disk, not in
  git. Every animal card video (`animals.json` `card_front`/`card_back`, ~28
  files) and every `.glb`/`.usdz` (~51) is a 404 on the live host, and the
  deploy syncs with `--delete` so it stays that way. The still images under
  `public/images/` do exist; the cards fall back to nothing.
- **The live site can be built from source that was never committed.** In Sept
  2026 zoo.ngo was serving a build with `--ink` tokens, a next-themes dark
  script and an `inter-var-latin` preload — none of which exist in this repo, on
  any branch. Read the remote and diff the live HTML before assuming the tree
  you have is the tree that ships.

## Known-stale, not yet fixed

Ten routes have been converted to the light system — `/healing-farm`, `/about`,
`/ai`, `/experiences`, `/donation`, `/animals`, `/animals/[animal]` (all seven
species), `/volunteer`, plus `/research`'s palette. Each is verified with
Playwright at 1440 and 390: body stays `rgb(247,247,247)`, no full-height dark
wrapper, `scrollWidth === innerWidth`, no `text-transform: uppercase`, no
underlined anchor, nothing under 4.5:1.

Still wrapped in `bg-black text-white`, unconverted: `/blog`, `/coin`, `/docs`,
`/impact`, `/markets`, `/news`, `/partners`, `/programs`, `/transparency`,
`/careers`, `/faq`, `/getinvolved`, `/signin`, `/signup`, `/forgot_password`,
`/terms`, `/terms-refund`, `/campaign`, `/donation/crypto`, `/donation/farm`,
`/experiences/[id]`. A blind find-and-replace is still NOT safe: `text-white` on
`bg-emerald-600`, or on a scrim over a photograph, must STAY white.

## Layout — two primitives, so a page cannot invent its own

- **`components/Section.tsx`** — `Section` (vertical rhythm + optional `tone`
  tint and `edge` hairline) wrapping `Band` (the shared measure: 1280 and
  `--page-gutter`, the same numbers the header and footer use). Pages used to
  spell `container mx-auto px-4`, whose padding is 16px and whose max width is
  1400, which is why /about and /ai started their text ~100px left of the
  wordmark. Every converted route now has its H1 at the same x as the logo
  (138 at a 1440 viewport) — that is the check worth re-running after any
  layout edit.
- **`components/Photo.tsx`** — a framed `<img>` that leaves an empty plate when
  the file 404s. The `ref` callback is load-bearing: an image in the
  server-rendered HTML finishes failing BEFORE React attaches listeners, so an
  `onError` handler alone never fires and the broken-image glyph stays.
  `plate` gives the frame the `--plate` ground for species renders.

## Media that is still absent

No `public/videos/` and no `public/models/` directory exists, so every card
video (~28) and every `.glb`/`.usdz` (~51) is a 404. Components no longer hold
a frame open for them: the species hero shows the still from `animals.json`
`image` (all seven exist), the species grid drops a tile with no render, the
3D band links to app.zoolabs.io instead of mounting empty viewers, and the
donation hero uses `/images/donation_header.png`. Also missing:
`/images/newsletter.png`, `/images/involved6.png`, the seven
`/images/*_card.png`, `/images/volunteer-experiences/create wildlife
experience.jpg`, and `healing-farm/{lionsmane.png,photo-3-elba-farm.jpeg}`.

## Verifying a conversion — the check must be able to fail

An unstyled page has no dark background, no uppercase, no underline and no
contrast failure: it passes every check while being completely broken. Running
`next build` against a live `next dev` wipes `.next` and produces exactly that,
and the audit reported all-green across sixteen routes before the guard caught
it. Any audit run here must first assert the system is actually applied —
`body` is `rgb(247,247,247)` AND a `.display` probe computes to 64px/700.

## Commands

```
pnpm dev            # next dev
pnpm build          # next build (static export) + next-sitemap
pnpm typecheck      # tsc --noEmit  (two test files fail: no @types/jest)
pnpm test           # jest
```
