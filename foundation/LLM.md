# zoo.ngo — AI Assistant Context

Zoo Labs Foundation Next.js website (community login, ZIPs voting, comments).

## Auth — Hanzo IAM

Engine: `ghcr.io/hanzoai/iam` (white-label). Consumer config in `src/config/iam.ts`.

App slug follows the canonical convention `<org>-<app>` — for zoo.ngo that is
**`zoo-ngo`** in the **`zoo`** org. The OAuth authorize endpoint is the
canonical `/v1/iam/oauth/authorize` (never `/login/oauth/authorize`).

Env vars (NEXT_PUBLIC_ prefix is needed for client-side reads in Next.js;
the `CASDOOR_` brand has been retired engine-side):

| Var | Default |
|---|---|
| `NEXT_PUBLIC_IAM_URL` | `https://iam.hanzo.ai` |
| `NEXT_PUBLIC_IAM_CLIENT_ID` | _(per-env, set in deployment)_ |
| `NEXT_PUBLIC_IAM_APP_NAME` | `zoo-ngo` |
| `NEXT_PUBLIC_IAM_ORG` | `zoo` |
| `NEXT_PUBLIC_IAM_REDIRECT_PATH` | `/api/auth/callback` |

Reference: `~/work/hanzo/iam/docs/CONVENTION.md`.

## Published counts — `src/config/corpus.tsx`

Papers, proposals and models are counted from the things themselves, twice:
`scripts/counts.mjs` counts once per build and writes `src/config/counts.json`,
which every page is compiled with; and the page counts again after it mounts, so
a page served from cache still shows today's numbers.

The counting happens in a build script, not in a page's `getStaticProps`,
because this build runs nine worker processes and then exports every page a
second time — a module-level memo holds for none of it, and a per-page fetch
spent the whole 60-an-hour GitHub allowance on one build. From the script the
whole build asks three times, once per source, which is measurable: run it under
`NODE_OPTIONS="--import <a file that wraps globalThis.fetch>"` and count.

The rules still live in `corpus.tsx` (the browser runs the same ones); the
script only decides when, and imports them through esbuild so there is no second
copy. It is the first link of `dev`, `build` and `typecheck`, like
`scripts/gui-css.mjs`, and `counts.json` is gitignored for the same reason
`gui.css` is.

| Count | Source | Rule |
|---|---|---|
| `papers` | `api.github.com/repos/zoo-apps/papers/git/trees/main?recursive=1` | directories holding `<name>/<name>.tex` — the repo's own convention, so no list of directories to ignore |
| `proposals` | `api.github.com/repos/zoo-apps/ZIPs/git/trees/main:ZIPs` | files matching `zip-<number>-*.md` |
| `models` | `huggingface.co/api/models?author=zenlm` | one per model repository |
| `proofs` | none public | typed by hand in `scripts/counts.mjs`; must agree with proofs.zoo.ngo |

Rules that hold the whole thing up:

- A page reads `useCorpus()` and never learns where a number comes from. There
  is no per-page plumbing to forget: every page is compiled with the counts.
- A source that will not answer keeps the count the build wrote. A count is
  never zero, a dash or a spinner — `keep()` refuses anything that is not a
  positive integer, and a truncated GitHub tree counts as no answer rather than
  as a short count.
- `CORPUS` is what the build counted. The menu labels in `registry.ts` — a plain
  array, read once at module load — are the one surface that shows it rather
  than the count as refreshed after mount.
- The floor lives in `scripts/counts.mjs` and is only reached on a first run
  that cannot reach the network. Every later run starts from the file it wrote.
- Unauthenticated GitHub allows 60 requests/hour/IP and a page load spends two,
  so a shared address will be refused and quietly keep the compiled numbers —
  which is also true of a CI builder behind a shared address. The cure for both
  is one same-origin route that reads all three sources with a server-held token
  and caches at the edge; `SOURCE` in `corpus.tsx` is then one fetch.
- A list on a page is a SELECTION, never a count.

## Blue is one Blue, and it lives at zoolabs.io

The hero used to be a still of the beluga beside the words, and the corner
carried a second Blue: 380 lines with its own system prompt, its own transport
and its own turns, answering the same questions the room at zoolabs.io answers
and free to drift from it on every one of them. Two Blues is two Blues to be
wrong.

Now there is one. `src/components/Deep.tsx` shows zoolabs.io inside this page —
Blue swimming on the foundation's own footage, answering for itself, changing
clip with how it feels about what was just said, one of twenty-four feelings —
and none of that is reimplemented here. `src/components/Ask.tsx` is a door onto
the same room, so anything Blue learns to do it does in both places on the day
it learns it. `src/components/Blue.tsx` stays what it always was, the still, and
it is the room's poster: it paints at once, the frame fades over it, and if the
frame never arrives what is left is the beluga rather than a white rectangle.

`?embed=1` is the whole of what the room does differently in here: it drops the
header this page already draws and the appearance panel, which is not ours to
offer to someone reading their own page, and puts `Open Blue ↗` in their place —
the full room, at the top of the window, carrying the question already asked
(`?q=`, read by `lib/arrival.ts` over there). Nobody needs an account on either
side of that link.

The hero is `.hero` + `.hero-two`: the height left under the bar, less the
distance the stats climb back into it, in `svh` so a phone's toolbars cannot
push the ask off the bottom. The room is the larger half and it is tall — a
beluga in a letterbox is a stock photo, a beluga in a window you can talk into
is the foundation's whole argument. The frame is fetched when it is about to be
seen rather than when the page parses, because it is several megabytes of video,
and the corner disc hides while the room is on screen: a door to the room you
are already standing in is not a door.

The donation band still uses the still, `<Blue ratio='4 / 3' />`. It is a
picture there, and one live room per page is the right number.
