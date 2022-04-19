import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  name: 'quanty-bot-client',
  version: '1.0.0',
  ssrMode: true,
  uri: 'http://localhost:3001/api/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
    },
  },
  ssrForceFetchDelay: 0.5,
})

export default client
