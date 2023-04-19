/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ['@zoolabs/ui', '@zoolabs/sdk'],
  redirects: async () => {
    return [
      {
        source: '/zoo',
        destination: 'http://localhost:3006/',
        permanent: true,
      },
    ];
  },
}
