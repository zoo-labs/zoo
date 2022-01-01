const withPWA = require("next-pwa");

const linguiConfig = require("./lingui.config.js");

const { locales, sourceLocale } = linguiConfig;
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  env: {},
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/mint",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
  i18n: {
    localeDetection: true,
    locales,
    defaultLocale: sourceLocale,
  },
};
module.exports = withPWA(withBundleAnalyzer(nextConfig));
