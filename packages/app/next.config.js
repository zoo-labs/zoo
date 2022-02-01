const withPWA = require("next-pwa");
const { withSentryConfig } = require("@sentry/nextjs");

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
const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
module.exports = withPWA(withBundleAnalyzer(nextConfig));

// withSentryConfig(
//   withPWA(withBundleAnalyzer(nextConfig)),
//   SentryWebpackPluginOptions
// );
