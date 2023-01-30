import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { AppProps } from 'next/app'

import { APOLLO_STATE_PROP_NAME } from '../utils/constants'

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps'],
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}
