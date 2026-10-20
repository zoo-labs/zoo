import { Head, Html, Main, NextScript } from 'next/document';
import { bootScript } from '@hanzo/appearance/state';
import { LOOK } from '@/config/look';

/**
 * <Head> held one thing: a preload of `/fonts/inter-var-latin.woff2`. There is
 * no `public/fonts/`, and the site sets Zen — so the tag 404'd on every page
 * load and then warned that the font it could not fetch went unused. `@hanzo/font`
 * emits its own preload with the content hash, which is the one that works.
 *
 * `scroll-behavior` is not stated here either: @hanzo/design's base layer already
 * sets it on <html>, and an inline style would outrank anyone who ever wanted to
 * turn it off.
 *
 * The appearance script runs BEFORE the stylesheet paints, which is the only
 * moment it can: a reader who set larger type has to get larger type on the
 * first frame, not after the bundle arrives. `LOOK` is the site's own register,
 * which is what it paints for everybody who has never asked for anything else.
 */
export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: bootScript({ base: LOOK }) }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
