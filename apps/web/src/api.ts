import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@quanty/api'
import { transformer } from '@quanty/api/transformer'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * (60 * 1000), // 5 mins
            cacheTime: 10 * (60 * 1000), // 10 mins
          },
        },
      },
      links: [
        loggerLink({
          enabled: opts =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }
  },
  ssr: false,
})

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
