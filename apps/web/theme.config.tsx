import Image from 'next/image'
import { useRouter } from 'next/router'
import { useConfig, type DocsThemeConfig } from 'nextra-theme-docs'
import { WEBAPP_URL } from '@quanty/lib'

import { clientEnv } from './src/env/schema.mjs'

const config: DocsThemeConfig = {
  docsRepositoryBase:
    'https://github.com/dougrocha/quanty/tree/master/apps/web',
  project: {
    link: 'https://github.com/dougrocha/quanty',
  },
  chat: {
    link: clientEnv.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL,
  },
  editLink: {
    text: '✏️ Edit this page on GitHub',
  },
  feedback: {
    content: '❓ Question? Give us feedback →',
    labels: 'feedback',
  },
  primaryHue: 315,
  logo: (
    <>
      <Image
        src={'/images/quanty_sm.jpg'}
        alt="Quanty Logo"
        height={32}
        width={32}
        className="mr-2 h-8 w-8 rounded-full"
      />
      <span className="font-bold">Quanty Docs</span>
    </>
  ),

  navigation: { next: true, prev: true },

  useNextSeoProps: () => {
    const { asPath } = useRouter()
    const meta = useConfig().frontMatter as Record<string, string>

    const titleTemplate = asPath !== '/docs' ? '%s – Docs' : 'Quanty Docs'

    return {
      titleTemplate,
      description:
        meta.description ??
        'The next generation Discord bot. Quanty is the perfect choice for communities looking to take their Discord experience to the next level',

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

      openGraph: {
        url: `${WEBAPP_URL}${asPath}`,
        siteName: 'Quanty',
        locale: 'en_US',
        type: 'website',
        images: [
          ...(meta.image
            ? [
                {
                  url: `${meta.image}`,
                  width: 32,
                  height: 32,
                  alt:
                    meta.description ??
                    'The next generation Discord bot. Quanty is the perfect choice for communities looking to take their Discord experience to the next level',
                },
              ]
            : [
                {
                  url: `/images/quanty_lg.jpg`,
                  width: 32,
                  height: 32,
                  alt: 'Quanty Logo',
                },
              ]),
        ],
      },

      twitter: {
        cardType: 'summary_large_image',
        site: `${WEBAPP_URL}`,
      },
    }
  },

  notFound: {
    labels: '404, Not Found',
    content: '🤔 Sorry, we could not find this page.',
  },

  footer: {
    text: () => {
      return <span>☕ Made by Slash</span>
    },
  },

  sidebar: {
    defaultMenuCollapseLevel: 2,
    toggleButton: true,
  },

  banner: {
    text: '🚧 This is a work in progress. 🚧',
    dismissible: false,
  },
}

export default config
