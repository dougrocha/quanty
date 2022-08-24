import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'

import { useApollo } from '../hooks/useApollo'
import defaultSeo from '../utils/defaultSeo'

const LoadingLayout = dynamic(() => import('layouts/loading'), {
  ssr: false,
})

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
