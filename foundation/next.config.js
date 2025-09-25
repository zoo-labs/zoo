/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,

  // Exclude problematic pages from static export
  async exportPathMap(defaultPathMap) {
    const pathMap = { ...defaultPathMap };
    // Remove pages that require authentication or cause build issues
    Object.keys(pathMap).forEach(path => {
      if (path.startsWith('/sanctuary/') || path.startsWith('/api/')) {
        delete pathMap[path];
      }
    });
    return pathMap;
  },
  
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
