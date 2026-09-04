/**
 * The one place a Zoo destination is spelled.
 *
 * Mirrors the shape of Hanzo's shell registry (`@hanzogui/shell`'s
 * `hanzo-registry.ts`): a flat URL table that every link resolves through, then
 * the header nav and the footer columns projected off it. Header and footer,
 * desktop and mobile, all read from here — so a link cannot exist in one menu
 * and be missing from the other, which is how the site ended up with five
 * disagreeing copies of "the nav".
 */

export interface Link {
  id: string;
  label: string;
  href: string;
  /** Set on links that leave zoo.ngo. Renders the ↗ and the new-tab rel. */
  external?: boolean;
}

export interface Column {
  id: string;
  title: string;
  items: Link[];
}

/* ── Canonical URL table — every link in this file resolves through `U` ────── */

export const U = {
  home: '/',

  // Research — what the foundation publishes
  research: '/research',
  ai: '/ai',
  animals: '/animals',
  experiences: '/experiences',
  papers: 'https://github.com/zooai/papers',
  models: 'https://huggingface.co/zenlm',

  // Foundation — who we are and how we are funded
  about: '/about',
  impact: '/impact',
  transparency: '/transparency',
  programs: '/programs',
  partners: '/partners',
  careers: '/careers',
  getinvolved: '/getinvolved',
  volunteer: '/volunteer',
  donation: '/donation',
  healingFarm: '/healing-farm',

  // Species
  redWolf: '/animals/red_wolf',
  nubianGiraffe: '/animals/nubian_giraffe',
  amurLeopard: '/animals/amur_leopard',
  sumatranElephant: '/animals/sumatran_elephant',
  javanRhino: '/animals/javan_rhino',
  pygmyHippo: '/animals/pygmy_hippo',
  siberianTiger: '/animals/siberian_tiger',

  // Ecosystem
  labs: 'https://zoolabs.io',
  fund: 'https://zoo.fund',
  hanzo: 'https://hanzo.ai',

  // Legal / contact
  terms: '/terms',
  refund: '/terms-refund',
  faq: '/faq',
  contact: 'mailto:hello@zoo.ngo',

  // Social
  x: 'https://twitter.com/zoo_labs',
  telegram: 'https://t.me/zooofficial',
  instagram: 'https://instagram.com/zoolabs.io',
  discord: 'https://discord.gg/AqrYhChx5b',
  medium: 'https://zoolabsofficial.medium.com',
  youtube: 'https://youtu.be/6yYuYtMWgOU',
} as const;

/* ── The foundation, in numbers. One source, so two tiles cannot disagree ──── */

export const STATS: { value: string; label: string }[] = [
  { value: '130+', label: 'Research papers' },
  { value: '2.4M+', label: 'Hectares protected' },
  { value: '7', label: 'Species programs' },
  { value: '501(c)(3)', label: 'Non-profit, EIN 88-3538992' },
];

/* ── Header ───────────────────────────────────────────────────────────────────
 * Desktop and mobile render THIS array. `CTA` is the filled action; `LABS` is
 * the standing link out to Zoo Labs, which the foundation keeps prominent
 * because the lab is where the research it funds actually runs.
 */

export const NAV: Link[] = [
  { id: 'research', label: 'Research', href: U.research },
  { id: 'ai', label: 'Models', href: U.ai },
  { id: 'animals', label: 'Species', href: U.animals },
  { id: 'experiences', label: 'Expeditions', href: U.experiences },
  { id: 'about', label: 'Foundation', href: U.about },
];

export const LABS: Link = { id: 'labs', label: 'Zoo Labs', href: U.labs, external: true };

export const CTA: Link = { id: 'donation', label: 'Donate', href: U.donation };

/* ── Footer ───────────────────────────────────────────────────────────────── */

export const FOOTER_COLUMNS: Column[] = [
  {
    id: 'research',
    title: 'Research',
    items: [
      { id: 'research', label: 'Research and science', href: U.research },
      { id: 'ai', label: 'ZenLM ecological AI', href: U.ai },
      { id: 'papers', label: 'Papers', href: U.papers, external: true },
      { id: 'models', label: 'Open weights', href: U.models, external: true },
      { id: 'animals', label: 'Species in 3D', href: U.animals },
    ],
  },
  {
    id: 'species',
    title: 'Species',
    items: [
      { id: 'redWolf', label: 'Red wolf', href: U.redWolf },
      { id: 'nubianGiraffe', label: 'Nubian giraffe', href: U.nubianGiraffe },
      { id: 'amurLeopard', label: 'Amur leopard', href: U.amurLeopard },
      { id: 'sumatranElephant', label: 'Sumatran elephant', href: U.sumatranElephant },
      { id: 'javanRhino', label: 'Javan rhino', href: U.javanRhino },
      { id: 'siberianTiger', label: 'Siberian tiger', href: U.siberianTiger },
    ],
  },
  {
    id: 'involved',
    title: 'Get involved',
    items: [
      { id: 'donation', label: 'Donate', href: U.donation },
      { id: 'volunteer', label: 'Volunteer', href: U.volunteer },
      { id: 'experiences', label: 'Expeditions', href: U.experiences },
      { id: 'healingFarm', label: 'Healing farm', href: U.healingFarm },
      { id: 'careers', label: 'Careers', href: U.careers },
    ],
  },
  {
    id: 'foundation',
    title: 'Foundation',
    items: [
      { id: 'about', label: 'About us', href: U.about },
      { id: 'impact', label: 'Impact', href: U.impact },
      { id: 'transparency', label: 'Financial transparency', href: U.transparency },
      { id: 'partners', label: 'Partners', href: U.partners },
      { id: 'faq', label: 'FAQ', href: U.faq },
    ],
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem',
    items: [
      { id: 'labs', label: 'Zoo Labs', href: U.labs, external: true },
      { id: 'fund', label: 'Zoo Fund', href: U.fund, external: true },
      { id: 'hanzo', label: 'Hanzo AI', href: U.hanzo, external: true },
    ],
  },
];

export const FOOTER_BOTTOM = {
  copyright: '© 2026 Zoo Labs Foundation Inc.',
  /** Donations are tax-deductible to the extent allowed by law. */
  notice: 'A 501(c)(3) non-profit. EIN 88-3538992.',
  links: [
    { id: 'terms', label: 'Terms', href: U.terms },
    { id: 'refund', label: 'Refunds', href: U.refund },
    { id: 'contact', label: 'Contact', href: U.contact },
  ] as Link[],
};

export const SOCIAL: Link[] = [
  { id: 'x', label: 'X', href: U.x, external: true },
  { id: 'telegram', label: 'Telegram', href: U.telegram, external: true },
  { id: 'instagram', label: 'Instagram', href: U.instagram, external: true },
  { id: 'discord', label: 'Discord', href: U.discord, external: true },
  { id: 'medium', label: 'Medium', href: U.medium, external: true },
  { id: 'youtube', label: 'YouTube', href: U.youtube, external: true },
];
