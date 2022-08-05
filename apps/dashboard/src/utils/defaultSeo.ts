export default {
  titleTemplate: 'Quanty | %s',
  defaultTitle: 'Quanty | Discord Bot',
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_QUANTY_APP_URL,
    title: 'Quanty | Discord Bot',
    description:
      '🤖 Add Quanty to your discord for a makeover. Quanty is a multi-purpose bot to replace them all. Moderation | Economy | Memes | Games | Dashboard.',
    images: [
      {
        url: `/quanty-128.jpg`,
        width: 800,
        height: 420,
        alt: 'Quanty Bot Logo',
        type: 'image/jpeg',
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
}
