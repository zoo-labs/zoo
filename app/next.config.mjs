/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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

export default nextConfig
