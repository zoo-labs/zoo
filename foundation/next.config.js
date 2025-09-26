/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Required for GitHub Pages to serve dynamic routes correctly
  trailingSlash: true,

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
