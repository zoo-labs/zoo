import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Where this page is actually being served from.
 *
 * In a browser the live location is the truth — a preview build, a branch host
 * or localhost then describes itself rather than claiming to be production. Only
 * the static render, which has no location to read, falls back to the one
 * declared origin (site-origin.js, projected by next.config.js).
 */
function origin(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  return (process.env.NEXT_PUBLIC_SITE_ORIGIN || '').replace(/\/$/, '');
}

const defaultMeta = {
  title: 'Zoo Foundation',
  siteName: 'Zoo Foundation',
  description:
    "Zoo Labs Foundation's mission is to protect our planet's precious wildlife biodiversity through research, education, and collaboration with aligned charities.",
  type: 'website',
  robots: 'follow, index',
  /** The card every share renders. 1200x630, served from whatever origin serves the page. */
  image: '/images/large-og.png',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  // asPath always begins with '/', so the origin must not end with one.
  const here = `${origin()}${router.asPath}`;
  const card = meta.image.startsWith('http')
    ? meta.image
    : `${origin()}${meta.image}`;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={here} />
      <link rel='canonical' href={here} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={card} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={card} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta
            name='author'
            property='article:author'
            content={meta.siteName}
          />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}

const favicons: Array<React.ComponentPropsWithoutRef<'link'>> = [
  { rel: 'shortcut icon', href: '/favicon/logo.png' },
];
