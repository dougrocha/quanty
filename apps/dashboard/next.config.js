/** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ['cdn.discordapp.com'],
//   },
// };

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
