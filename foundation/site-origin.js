/**
 * The site's own origin, declared once.
 *
 * A static export cannot discover its host at build time, so the canonical URL,
 * the Open Graph card and every sitemap entry need an origin written down
 * somewhere. This is that one place: the Next config projects it to the client
 * as NEXT_PUBLIC_SITE_ORIGIN, and next-sitemap reads the same value, so a
 * preview deployment sets SITE_ORIGIN and every published URL follows.
 *
 * In the browser the live location always wins over the build-time value — see
 * `origin()` in src/components/Seo.tsx — so a page served from anywhere
 * describes the place it is actually being served from.
 */
module.exports = process.env.SITE_ORIGIN || 'https://zoo.ngo';
