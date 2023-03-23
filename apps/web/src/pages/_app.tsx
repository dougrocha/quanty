import '../styles/globals.css'
import React from 'react'
import type { AppType } from 'next/app'
import { Open_Sans } from 'next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { clsx } from 'clsx'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'

import { api } from '~/api'
import nextSeoConfig from '../lib/config/next-seo.config'
import { NextPageWithLayout } from '../lib/types'

const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-sans',
  display: 'swap',
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
          --font-sans: ${open_sans.style.fontFamily};
        }
      `}</style>

      <main className={clsx(open_sans.variable, 'font-sans antialiased')}>
        {getLayout(<Component {...pageProps} />)}
      </main>

      <DefaultSeo {...nextSeoConfig} />

      <VercelAnalytics />

      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
