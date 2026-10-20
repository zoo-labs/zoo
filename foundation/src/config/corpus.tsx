import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import counted from './counts.json';

/**
 * How much Zoo Labs has published, counted from the things themselves.
 *
 * These numbers used to be typed here by hand, and before that in eight
 * separate places, where two pages said 7 papers while two said 86 — the same
 * fact, four answers. A number a person has to remember to edit is a number
 * that will be wrong again, so nobody edits these: `scripts/counts.mjs` counts
 * the sources once per build and every page is compiled with the answer, and
 * the page counts them again after it loads in case the build was a while ago.
 *
 * A page states a count by reading `useCorpus()`. It never learns where the
 * count came from, and a list on a page is still a SELECTION, never a count.
 */

export type Counts = {
  papers: number;
  proposals: number;
  models: number;
  /**
   * The one count with no public source to read, so it is the one that has to
   * be typed — in `scripts/counts.mjs`, with the rest of the floor.
   * proofs.zoo.ngo is what it has to agree with.
   */
  proofs: number;
};

/**
 * What the build counted.
 *
 * Every page is compiled with these, so they are what a reader sees on first
 * paint, what a reader with JavaScript off sees, and what stands whenever a
 * source cannot be reached — an unreachable source shows the last count we
 * had, never a zero, a dash or a spinner where a number belongs.
 */
export const CORPUS: Counts = counted;

type Entry = { path: string; type: string };

async function read(url: string) {
  const answer = await fetch(url, { headers: { accept: 'application/json' } });
  if (!answer.ok) throw new Error(`${answer.status} ${url}`);
  return answer.json();
}

/**
 * A tree from GitHub, addressed the way GitHub addresses one: `main` for a
 * repository's root, `main:ZIPs` for a directory in it, `?recursive=1` for
 * everything under it. One request either way, and no clone.
 *
 * A truncated tree is a short count, which would read as a real one, so it is
 * an error here and the caller keeps the number it had.
 */
const tree = async (repo: string, at: string): Promise<Entry[]> => {
  const whole = await read(`https://api.github.com/repos/${repo}/git/trees/${at}`);
  if (whole.truncated) throw new Error(`truncated tree ${repo} ${at}`);
  return whole.tree;
};

/** Where each count comes from. */
const SOURCE = {
  /**
   * One paper per directory in zoo-apps/papers, which the repo itself says by
   * holding each paper's LaTeX at `<name>/<name>.tex`. Asking the repo spares
   * the site a list of directories to ignore: `figures`, `pdfs`, `site` and
   * `shared` fall out on their own, and so does whatever is added next.
   */
  papers: async () =>
    (await tree('zoo-apps/papers', 'main?recursive=1')).filter((e) => {
      const [dir, file] = e.path.split('/');
      return e.type === 'blob' && file === `${dir}.tex`;
    }).length,

  /** One file per proposal in zoo-apps/ZIPs, each named for the number it carries. */
  proposals: async () =>
    (await tree('zoo-apps/ZIPs', 'main:ZIPs')).filter((e) => /^zip-\d+.*\.md$/.test(e.path)).length,

  /**
   * One repository per open-weight release under the zenlm org, which is the
   * same thing huggingface.co/zenlm counts on the page the site links to.
   */
  models: async () =>
    (await read('https://huggingface.co/api/models?author=zenlm&limit=1000')).length,
};

/** A source that will not answer, or answers with nonsense, keeps the count we had. */
async function keep(had: number, ask: () => Promise<number>) {
  try {
    const n = await ask();
    return Number.isInteger(n) && n > 0 ? n : had;
  } catch {
    return had;
  }
}

/** Counts every source that can be counted, in parallel. */
export async function count(had: Counts = CORPUS): Promise<Counts> {
  const [papers, proposals, models] = await Promise.all([
    keep(had.papers, SOURCE.papers),
    keep(had.proposals, SOURCE.proposals),
    keep(had.models, SOURCE.models),
  ]);
  return { papers, proposals, models, proofs: had.proofs };
}

const Live = createContext<Counts>(CORPUS);

/** The counts, as of the last source that answered. */
export const useCorpus = () => useContext(Live);

/** How long a browser trusts what it last counted. */
const FRESH = 60 * 60 * 1000;
const REMEMBERED = 'corpus';

/**
 * What this browser counted last, if it is still fresh.
 *
 * Storage can throw outright — a private window, blocked site data — so every
 * read and write is guarded and a failure simply means we count again.
 */
function remembered(): Counts | undefined {
  try {
    const raw = localStorage.getItem(REMEMBERED);
    if (!raw) return;
    const { at, counts } = JSON.parse(raw) as { at: number; counts: Counts };
    return Date.now() - at < FRESH ? counts : undefined;
  } catch {
    return;
  }
}

function remember(counts: Counts) {
  try {
    localStorage.setItem(REMEMBERED, JSON.stringify({ at: Date.now(), counts }));
  } catch {
    /* nothing to do: the next page counts again */
  }
}

/**
 * Holds the counts for the whole app: the ones the build compiled in, then the
 * ones this browser last counted, then the ones the sources report.
 *
 * A browser counts at most once an hour. Without that a visitor spends two of
 * their sixty hourly GitHub requests on every page they open, which is thirty
 * pages before the sources start refusing — and the refusal is invisible, since
 * the page simply keeps the number it already had. Remembering turns a per-page
 * cost into a per-hour one, and a reader moving through the site pays it once.
 *
 * The remembered value is shown immediately and is itself replaced when the
 * hour is up, so a page served from a month-old cache still corrects itself and
 * a page whose sources are unreachable keeps the last number that answered.
 */
export function Corpus({ children }: { children: ReactNode }) {
  const [live, set] = useState(CORPUS);
  useEffect(() => {
    const had = remembered();
    if (had) {
      set(had);
      return;
    }
    count().then((counts) => {
      set(counts);
      remember(counts);
    });
  }, []);
  return <Live.Provider value={live}>{children}</Live.Provider>;
}
