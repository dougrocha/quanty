// @ts-check

import NextBundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/client.mjs'))

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
})

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
    ]
  },

  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,

  transpilePackages: ['@quanty/ui', '@quanty/lib', '@quanty/config'],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: process.env.NODE_ENV === 'production' },
  typescript: { ignoreBuildErrors: process.env.NODE_ENV === 'production' },
}

export default withBundleAnalyzer(withNextra(config))
