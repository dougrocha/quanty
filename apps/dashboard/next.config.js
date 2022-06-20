/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @type {import('next').NextConfig}
 **/

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  webp: {
    preset: 'default',
    quality: 100,
  },
  pageExtensions: ['ts', 'tsx'],
  env: {
    APP_URL: process.env.APP_URL,
  },
})
