/* eslint-disable react-hooks/rules-of-hooks */

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useConfig, type DocsThemeConfig } from 'nextra-theme-docs'
import { WEBAPP_URL } from '@quanty/lib'

const config: DocsThemeConfig = {
  docsRepositoryBase:
    'https://github.com/dougrocha/quanty/tree/master/apps/web/src/pages',
  project: {
    link: 'https://github.com/dougrocha/quanty',
  },
  chat: {
    link: `${WEBAPP_URL}/discord`,
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
    const { title, ...meta } = useConfig().frontMatter

    const titleTemplate = asPath !== '/docs' ? '%s – Docs' : 'Quanty Docs'

    return {
      title,
      titleTemplate,
      description: meta.description ?? 'The next generation Discord bot.',
      additionalLinkTags: [
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'icon',
          href: '/favicon/favicon.ico',
        },
      ],

      openGraph: {
        url: `${WEBAPP_URL}${asPath}`,
        title: title ?? 'Quanty Docs',
        siteName: 'Quanty',
        description: meta.description ?? 'The next generation Discord bot.',
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: `${WEBAPP_URL}/images/quanty_lg.jpg`,
            width: 32,
            height: 32,
            alt: 'Quanty Logo',
          },
          ...(meta.image
            ? [
                {
                  url: `${WEBAPP_URL}${meta.image}`,
                  width: 32,
                  height: 32,
                  alt: meta.description ?? 'The next generation Discord bot.',
                },
              ]
            : []),
        ],
      },

      // twitter: {
      //   handle: '@quantybot',
      //   site: '@quantybot',
      //   cardType: meta.image ? 'summary_large_image' : 'summary',
      // },
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
