// @ts-check
import nextra from 'nextra'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
})

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ['cdn.discordapp.com'],
  },
  async redirects() {
    return [
      {
        source: '/invite',
        destination: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
        permanent: true,
      },
      {
        source: '/discord',
        destination: process.env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL,
        permanent: true,
      },
    ]
  },
  env: {
    NEXT_PUBLIC_DISCORD_INVITE_URL: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
    NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL:
      process.env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL,
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    '@quanty/api',
    '@quanty/auth',
    '@quanty/db',
    '@quanty/ui',
    '@quanty/lib',
    '@quanty/config',
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
}

export default withNextra(config)
