import { withSentryConfig } from '@sentry/nextjs'

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: 'javascript-nextjs',
  silent: true,
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  sentry: {
    hideSourceMaps: false,
  },
  transpilePackages: ['@reservoir0x/reservoir-kit-ui', "@zoolabs/ui", "@zoolabs/sdk"],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions)
