/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @type {import('next').NextConfig}
 **/

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['ui'])

module.exports = withPlugins([withBundleAnalyzer, withTM], {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  pageExtensions: ['ts', 'tsx'],
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  },
})
