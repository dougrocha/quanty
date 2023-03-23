import '../styles/globals.css'
import type { AppType } from 'next/app'
import { Open_Sans } from 'next/font/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { clsx } from 'clsx'

import { api } from '~/api'

const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-sans',
  display: 'swap',
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      {/* {@link https://github.com/vercel/next.js/issues/43674} */}
      <style jsx global>{`
        :root {
          --font-sans: ${open_sans.style.fontFamily};
        }
      `}</style>

      <main className={clsx(open_sans.variable, 'font-sans antialiased')}>
        <Component {...pageProps} />
      </main>

      <VercelAnalytics />
    </>
  )
}

export default api.withTRPC(MyApp)
