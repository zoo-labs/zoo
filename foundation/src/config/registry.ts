import { CORPUS } from '@/config/corpus';

/**
 * Where the site points.
 *
 * The header and the footer both read this file, so a destination is added,
 * renamed or retired in exactly one place and the two can never disagree about
 * what the site contains. Nothing here decides how a link is DRAWN — that is
 * the header's and the footer's business.
 *
 * The one structural rule: a section with `items` has a menu, and the header
 * draws a chevron because it has one. A section without items is a plain link.
 * There is no separate "show a chevron" flag to get out of step with reality.
 *
 * The two counts below are the only ones on the site that do not refresh after
 * the page loads: this is a plain array of strings, read once when the module
 * loads, so the menu states what the build counted while a page states what the
 * sources say now. They differ only when a source has moved since the build.
 */

export type Dest = {
  label: string;
  href: string;
  /** Off site: opened in a new tab and drawn with the outward arrow. */
  away?: boolean;
  /** One line under the label, in a header menu. */
  note?: string;
};

export type Section = Dest & { items?: Dest[] };

export const SECTIONS: Section[] = [
  {
    label: 'Research',
    href: '/research',
    items: [
      {
        label: `Papers (${CORPUS.papers})`,
        href: 'https://papers.zoo.ngo',
        away: true,
        note: 'Conservation, learning and model architecture',
      },
      {
        label: `Proposals (${CORPUS.proposals})`,
        href: 'https://zips.zoo.ngo',
        away: true,
        note: 'How a change is argued, and recorded',
      },
      {
        label: 'Documentation',
        href: 'https://docs.zoo.ngo',
        away: true,
        note: 'Running what we publish',
      },
      {
        label: 'Every paper as source',
        href: 'https://github.com/zooai/papers',
        away: true,
        note: 'LaTeX, one directory per paper',
      },
    ],
  },
  {
    label: 'Models',
    href: '/ai',
    items: [
      {
        label: 'Zen, on Hugging Face',
        href: 'https://huggingface.co/zenlm',
        away: true,
        note: 'Open weights, ready to run',
      },
      { label: 'Benchmarks', href: '/ai', note: 'What the models score, and against what' },
      {
        label: 'Zoo Gym',
        href: 'https://github.com/zooai/gym',
        away: true,
        note: 'The training framework, in the open',
      },
    ],
  },
  {
    label: 'Products',
    href: '/#products',
    items: [
      {
        label: 'Zoo Labs',
        href: 'https://zoolabs.io',
        away: true,
        note: 'Ask Blue, and the rest of the studio',
      },
      {
        label: 'Zoo Network',
        href: 'https://zoo.network',
        away: true,
        note: 'The network the work runs on',
      },
      { label: 'Research notes', href: '/blog', note: 'What we are working through' },
    ],
  },
  /* The site the header is on. Nothing under it, so no chevron. */
  { label: 'Foundation', href: '/about' },
];

/** The lab. A wordmark, so it keeps its own capitals wherever it is drawn. */
export const LABS: Dest = { label: 'LABS', href: 'https://zoolabs.io', away: true };

/**
 * A charity that takes money has to keep these reachable from every page, so
 * they sit beside the copyright rather than in the link row.
 */
export const LEGAL: Dest[] = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/terms' },
];

/** Named here, drawn by the footer — which mark stands for which is its call. */
export const SOCIAL: Dest[] = [
  { label: 'GitHub', href: 'https://github.com/zooai', away: true },
  { label: 'X', href: 'https://twitter.com/zoo_labs', away: true },
  { label: 'Email', href: 'mailto:hello@zoo.ngo' },
];
