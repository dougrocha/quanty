// @ts-check

import NextBundleAnalyzer from '@next/bundle-analyzer'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ['cdn.discordapp.com'],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },

  async redirects() {
    return [
      {
        source: '/invite',
        destination: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? '',
        permanent: true,
      },
      {
        source: '/discord',
        destination: process.env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL ?? '',
        permanent: true,
      },
      {
        source: '/github',
        destination: process.env.NEXT_PUBLIC_GITHUB_URL ?? '',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: 'https://docs.quanty.xyz/:path*',
        permanent: true,
      },
    ]
  },

  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,

  transpilePackages: [
    '@quanty/api',
    '@quanty/auth',
    '@quanty/db',
    '@quanty/ui',
    '@quanty/lib',
    '@quanty/config',
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: process.env.NODE_ENV === 'production' },
  typescript: { ignoreBuildErrors: process.env.NODE_ENV === 'production' },
}

export default withBundleAnalyzer(config)
