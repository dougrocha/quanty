import '../styles/globals.css'
import React from 'react'
import type { AppType } from 'next/app'
import Head from 'next/head'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'

import { api } from '~/api'
import nextSeoConfig from '../lib/config/next-seo.config'
import { NextPageWithLayout } from '../lib/types'
import { Inter, Lato, Montserrat, Roboto } from '@next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
  variable: '--font-lato',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const MyApp: AppType<{
  session: Session | null
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout =
    (Component as NextPageWithLayout).getLayout ||
    ((page: React.ReactElement) => page)

  return (
    <SessionProvider session={session}>
      {/* {@link https://github.com/vercel/next.js/issues/43674} */}
      <style jsx global>{`
        :root {
          --font-montserrat: ${montserrat.style.fontFamily};
        }
      `}</style>

      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <DefaultSeo {...nextSeoConfig} />
      <main className={`${montserrat.variable} font-montserrat antialiased`}>
        {getLayout(<Component {...pageProps} />)}
      </main>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
