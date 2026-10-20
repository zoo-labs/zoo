import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { GuiProvider } from '@hanzo/gui';
import { TelemetryProvider } from '@hanzogui/telemetry';
import Ask from '@/components/Ask';
import Look from '@/components/Look';
import { Corpus } from '@/config/corpus';
import config from '@/lib/gui';

import '@/styles/globals.css';
import '@/styles/gui.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * `disableInjectCSS`, because `gui.css` above IS the sheet — generated from the
 * same config by `scripts/gui-css.mjs`. Left to inject, the runtime writes the
 * whole accumulated sheet on every flush and the page ships several copies; on
 * a static export it writes nothing at all before first paint.
 *
 * The site has one appearance, so the theme is stated here and there is nothing
 * to resolve at run time. It used to mount next-themes with `defaultTheme="dark"`
 * against a stylesheet that declares `color-scheme: light` and carries no `.dark`
 * rules, so the class landed on <html> and no rule anywhere answered it.
 *
 * `Corpus` sits above everything so that the page and Blue quote the same
 * counts, and so a page loaded from cache refreshes them once rather than once
 * per component that shows a number.
 *
 * `TelemetryProvider` takes no key. The key is a property of the DOMAIN — this
 * is zoo.ngo, zoo.ngo belongs to Zoo, and Zoo has exactly one publishable key —
 * so @hanzo/event derives it from the hostname and there is nothing here to
 * configure, nothing to leave unset, and nothing to paste into the wrong site.
 * A build-time key would be the alternative, and it is the reason this site
 * reported nothing until now: a static export is built once and the variable
 * was never set.
 *
 * `path` comes from the router, because pageviews on a static export are route
 * changes rather than page loads and the History API alone cannot see a
 * shallow one.
 */
function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <GuiProvider config={config} defaultTheme="light" disableInjectCSS>
      <TelemetryProvider path={asPath}>
        <Corpus>
          <Component {...pageProps} />
          <Ask />
          <Look />
        </Corpus>
      </TelemetryProvider>
    </GuiProvider>
  );
}

export default MyApp;
