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
  experimental: { images: { allowFutureImage: true } },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  },
}

module.exports = () => {
  const plugins = [withTM, withBundleAnalyzer, withMDX]

  const config = plugins.reduce((acc, next) => next(acc), { ...nextConfig })

  return config
}
