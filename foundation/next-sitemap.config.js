/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  // The canonical origin every generated URL is written against. It must be the
  // site's own origin: sitemap.xml and robots.txt are published documents, so an
  // origin that is not ours sends every crawler somewhere else.
  siteUrl: 'https://zoo.ngo',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
