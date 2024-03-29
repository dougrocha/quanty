import { DefaultSeoProps } from 'next-seo'
import { WEBAPP_URL } from '@quanty/lib'

const nextSeoConfig: DefaultSeoProps = {
  defaultTitle: 'Quanty | Discord Bot',
  titleTemplate: '%s | Discord Bot',
  description:
    'The next-generation Discord bot. Quanty is the perfect choice for communities looking to take their Discord experience to the next level. Stay tuned for future updates.',

  themeColor: '#17151E',

  additionalLinkTags: [
    {
      rel: 'canonical',
      href: `${WEBAPP_URL}`,
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
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

  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'quanty, discord, bot, slash, commands, slash commands, dashboard, documentation, computer, admin, moderation, fun',
    },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=3.0',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
    {
      name: 'charSet',
      content: 'UTF-8',
    },
  ],

  openGraph: {
    url: `${WEBAPP_URL}`,
    title: 'Quanty | Discord Bot',
    siteName: 'Quanty',
    description:
      'The next-generation Discord bot. Quanty is the perfect choice for communities looking to take their Discord experience to the next level. Stay tuned for future updates.',
    locale: 'en_US',
    images: [
      {
        url: `${WEBAPP_URL}/images/quanty_lg.jpg`,
      },
    ],
  },
}

export default nextSeoConfig
