import { ApolloProvider } from '@apollo/client'
import LoadingLayout from 'layouts/loading'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'

import { useApollo } from '../libs/apolloClient'

import '../styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady])

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
    <ApolloProvider client={apolloClient}>
      {Component.getLayout ? (
        getLayout(<Component {...pageProps} />)
      ) : (
        <>{pageLoading ? <LoadingLayout /> : <Component {...pageProps} />}</>
      )}
    </ApolloProvider>
  )
}

export default MyApp
