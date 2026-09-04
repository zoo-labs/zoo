/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  // sitemap.xml and robots.txt are published documents: an origin that is not
  // ours sends every crawler somewhere else. It is read from the one place the
  // origin is declared rather than written down a second time here.
  siteUrl: require('./site-origin'),
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
