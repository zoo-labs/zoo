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

~13 pages still wrap themselves in `bg-black text-white` (`/about`, `/ai`,
`/blog`, `/coin`, `/docs`, `/experiences`, `/impact`, `/markets`, `/news`,
`/partners`, `/programs`, `/transparency`, `/experiences/[id]`) and carry ~1000
dark utility classes. They render as dark pages between a light header and a
light footer. A blind find-and-replace is NOT safe: `text-white` on
`bg-emerald-600` must stay white, while `text-white` on `bg-amber-500/20` (which
was composited over black) must flip. Convert per page, with eyes on it.

## Commands

```
pnpm dev            # next dev
pnpm build          # next build (static export) + next-sitemap
pnpm typecheck      # tsc --noEmit  (two test files fail: no @types/jest)
pnpm test           # jest
```
