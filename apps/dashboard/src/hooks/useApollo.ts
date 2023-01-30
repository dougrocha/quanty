import { AppProps } from 'next/app'
import { useMemo } from 'react'

import { initializeApollo } from '../libs/apolloClient'
import { APOLLO_STATE_PROP_NAME } from '../utils/constants'

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state],
  )
  return store
}
