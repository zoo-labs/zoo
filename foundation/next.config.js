/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Required for GitHub Pages to serve dynamic routes correctly
  trailingSlash: true,

  // `@hanzo/font` ships ESM that imports `next/font/local`, and that import is
  // only meaningful once Next's font loader has rewritten it. Without this the
  // page-data pass resolves the bare directory in plain Node and dies on
  // ERR_UNSUPPORTED_DIR_IMPORT.
  transpilePackages: ['@hanzo/font'],

  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
