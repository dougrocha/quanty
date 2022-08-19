import { ApolloProvider } from '@apollo/client'
import LoadingLayout from 'layouts/loading'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'

import { useApollo } from '../libs/apolloClient'
import '../styles/globals.css'
import defaultSeo from '../utils/defaultSeo'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const router = useRouter()

  const apolloClient = useApollo(pageProps)

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true)
    }
    const handleComplete = () => {
      setPageLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  })

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ThemeProvider attribute="class">
      <DefaultSeo {...defaultSeo} />
      <ApolloProvider client={apolloClient}>
        {Component.getLayout ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <>{pageLoading ? <LoadingLayout /> : <Component {...pageProps} />}</>
        )}
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default MyApp
