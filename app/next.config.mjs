/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ['@zoolabs/ui', '@zoolabs/sdk'],
  redirects: async () => {
    return [
      {
        source: '/zoo',
        destination: process.env.coreURL + '/',
        permanent: true,
      },
    ];
  },
}
