import { NextSeoProps } from 'next-seo'

const nextSeoConfig: NextSeoProps = {
  title: 'My App',
  titleTemplate: '%s | My App',
  description: 'My App description',

  themeColor: '#1C1A25',

  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png',
    },
  ],
}

export default nextSeoConfig

