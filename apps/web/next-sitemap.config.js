/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_WEBAPP_URL ?? `https://${process.env.VERCEL_URL}`,
  generateRobotsTxt: true,
  sitemapSize: 7000,
}
