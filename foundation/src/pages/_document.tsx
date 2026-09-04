import { Head, Html, Main, NextScript } from 'next/document';

/**
 * No font preload here. `@hanzo/font` wraps `next/font/local` (see _app.tsx),
 * which emits both the `@font-face` and the preload with the face's content
 * hash. A hand-written `<link rel="preload">` cannot know that hash, which is
 * how this file came to preload a filename that had not existed for months —
 * a 404 on every page load, and no preload where one was wanted.
 */
export default function Document() {
  return (
    <Html lang='en' style={{ scrollBehavior: 'smooth' }}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
