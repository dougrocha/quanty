import Image from 'next/image'
import Link from 'next/link.js'
import { useRouter } from 'next/router'
import { useConfig, type DocsThemeConfig } from 'nextra-theme-docs'
import { DOCS_URL, WEBAPP_URL } from '@quanty/lib'

import { clientEnv } from './src/env/schema.mjs'

const config: DocsThemeConfig = {
  docsRepositoryBase:
    'https://github.com/dougrocha/quanty/tree/master/apps/docs',
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
    <Link href={WEBAPP_URL}>
      <Image
        src={'/images/quanty_sm.jpg'}
        alt="Quanty Logo"
        height={32}
        width={32}
        className="mr-2 h-8 w-8 rounded-full"
      />
      <span className="font-bold">Quanty Docs</span>
    </Link>
  ),

  navigation: true,

  head: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { asPath } = useRouter()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const meta = useConfig().frontMatter as Record<string, string>

    return (
      <>
        <meta name="theme-color" content="#17151E" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        <meta
          name="description"
          content={
            meta.description ||
            'The next-generation Discord bot. Quanty is the perfect choice for communities looking to take their Discord experience to the next level. Stay tuned for future updates.'
          }
        />
        <meta name="title" content={meta.title || 'Quanty Docs'} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOCS_URL}${asPath}`} />
        <meta property="og:title" content={meta.title || 'Quanty Docs'} />
        <meta
          property="og:description"
          content={
            meta.description ||
            'The next-generation Discord bot. Quanty is the perfect choice for communities looking to take their Discord experience to the next level. Stay tuned for future updates.'
          }
        />
        <meta
          property="og:image"
          content={`${DOCS_URL}${meta.image || '/images/quanty_lg.jpg'}`}
        />
        <meta property="og:locale" content="en_US" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${DOCS_URL}${asPath}`} />
        <meta property="twitter:title" content={meta.title || 'Quanty Docs'} />
        <meta
          property="twitter:image"
          content={`${DOCS_URL}${meta.image || '/images/quanty_lg.jpg'}`}
        />
        <meta
          property="twitter:description"
          content={
            meta.description ||
            'The next-generation Discord bot. Quanty is the perfect choice for communities looking to take their Discord experience to the next level. Stay tuned for future updates.'
          }
        />
      </>
    )
  },

  useNextSeoProps: () => {
    const { asPath } = useRouter()

    const titleTemplate = asPath !== '/docs' ? '%s – Docs' : 'Quanty Docs'

    return {
      titleTemplate,

      additionalLinkTags: [
        {
          rel: 'canonical',
          href: `${DOCS_URL}`,
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
