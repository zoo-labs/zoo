// @hanzo/ui ships the Next wrapper and it is the one way to configure this: it
// discovers every installed `@hanzogui/*`, aliases `react-native` to the web
// implementation, puts `.web.*` ahead of the default extensions, and supplies
// the SVGR rule. Hand-rolling any of those is how `next dev` and `next build`
// come to disagree about compiling.
const withGui = require('@hanzo/ui/next');

/** @type {import('next').NextConfig} */
module.exports = withGui(
  {
    // Cloudflare Pages serves these as static files, so the build has to emit them.
    output: 'export',
    trailingSlash: true,
    poweredByHeader: false,
    reactStrictMode: true,

    eslint: {
      ignoreDuringBuilds: true,
    },

    images: {
      unoptimized: true,
    },
  },
  __dirname
);
