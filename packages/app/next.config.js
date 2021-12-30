/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false };

    return config;
  },
};
