/* eslint-disable @typescript-eslint/no-var-requires */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'http://localhost:3001/api/auth/login',
        permanent: false,
        basePath: false,
      },
      {
        source: '/invite',
        destination:
          'https://discord.com/api/oauth2/authorize?client_id=824106276404854844&permissions=8&redirect_uri=https%3A%2F%2Fwww.quanty.xyz%2F&response_type=code&scope=identify%20bot%20applications.commands%20guilds',
        permanent: true,
      },
    ]
  },
})
