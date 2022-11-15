/* eslint-disable @typescript-eslint/no-var-requires */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})
const withTM = require('next-transpile-modules')(['ui'])

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['cdn.discordapp.com'],
  },
  env: {
    NEXT_PUBLIC_QUANTY_APP_URL: process.env.NEXT_PUBLIC_QUANTY_APP_URL,
    NEXT_PUBLIC_QUANTY_API_URL: process.env.NEXT_PUBLIC_QUANTY_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_QUANTY_CHANGELOGS_URL:
      process.env.NEXT_PUBLIC_QUANTY_CHANGELOGS_URL,
    NEXT_PUBLIC_QUANTY_DOCS_URL: process.env.NEXT_PUBLIC_QUANTY_DOCS_URL,
    NEXT_PUBLIC_QUANTY_DISCORD_BOT_INVITE:
      process.env.NEXT_PUBLIC_QUANTY_DISCORD_BOT_INVITE,
    NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE:
      process.env.NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE,
    NEXT_PUBLIC_DISCORD_CDN: process.env.NEXT_PUBLIC_DISCORD_CDN,
    NEXT_PUBLIC_GIT_URL: process.env.NEXT_PUBLIC_GIT_URL,
    NEXT_PUBLIC_QUANTY_GIT: process.env.NEXT_PUBLIC_QUANTY_GIT,
    NEXT_PUBLIC_DISCORD_CDN: process.env.NEXT_PUBLIC_DISCORD_CDN,
  },
}

module.exports = () => {
  const plugins = [withTM, withBundleAnalyzer, withMDX]

  const config = plugins.reduce((acc, next) => next(acc), { ...nextConfig })

  return config
}

