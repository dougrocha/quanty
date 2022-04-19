import { QueryOptions } from '@apollo/client'
import { DocumentNode } from 'graphql'

import client from './apollo-client'

interface Headers {
  Cookie: string
}

type SsrQueryOptions<V> = Omit<
  QueryOptions<V, unknown>,
  'query' | 'fetchPolicy' | 'context'
>

/**
 *
 * **Cache-Policy**
 *
 * Will always be set to cache-first
 */
export const useSsrQuery = async <T, V = Record<string, unknown>>(
  query: DocumentNode,
  headers: Headers,
  options?: SsrQueryOptions<V>,
) =>
  await client.query<T, V>({
    query,
    context: {
      headers: {
        cookie: headers.Cookie,
      },
    },
    ...options,
  })
