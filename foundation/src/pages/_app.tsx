import { AnalyticsProvider, usePageview } from '@hanzo/event/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

/** Do Not Track and Global Privacy Control are opt-out signals the SDK does not
 * read, so each surface answers for itself.
 *
 * Test `window`, never `navigator`: Node defines a global navigator, so a
 * navigator check passes during the static export's prerender and then reaches
 * for a window that isn't there. */
const telemetryEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  const n = navigator as unknown as {
    doNotTrack?: string;
    msDoNotTrack?: string;
    globalPrivacyControl?: boolean;
  };
  const dnt =
    n.doNotTrack ??
    (window as unknown as { doNotTrack?: string }).doNotTrack ??
    n.msDoNotTrack;
  if (dnt === '1' || dnt === 'yes') return false;
  return !n.globalPrivacyControl;
};

/** Counts route changes only — the provider's autoPageview covers the first
 * load, so a page is counted exactly once. */
function Pageview() {
  usePageview(useRouter().asPath);
  return null;
}

/**
 * No ingest key here, and that is the point.
 *
 * A domain belongs to exactly one brand, so `@hanzo/event` resolves the key from
 * the host this page is served from: zoo.ngo attributes to Zoo without this file
 * saying so. Stating a key per site puts one copy per surface of a value with a
 * single source in the tree, and that is how a brand's traffic ends up in
 * another brand's project.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnalyticsProvider config={{ product: 'site', enabled: telemetryEnabled() }}>
      <Pageview />
      <Component {...pageProps} />
    </AnalyticsProvider>
  );
}

export default MyApp;
