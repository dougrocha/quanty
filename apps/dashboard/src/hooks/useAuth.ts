import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useDebugValue } from 'react'

import { useGetUserQuery } from '../graphql/generated/schema'
import { currentUserAtom } from '../utils/atoms'

export const useAuth = () => {
  const router = useRouter()

  const [user, setUser] = useAtom(currentUserAtom)

  const redirectToLogin = () => router.push('/login')

  const { client, loading, error } = useGetUserQuery({
    fetchPolicy: 'network-only',
    // Error Policy All removes unhandled errors from this query
    errorPolicy: 'all',
    onCompleted: ({ me }) => {
      if (!me) {
        if (router.pathname !== '/') {
          redirectToLogin()
        }
      }
      setUser(me)
    },
    onError: () => {
      client.resetStore()
      setUser(null)
    },
  })

  useDebugValue(user, user => (user ? 'Logged in' : 'Logged out'))

  const logIn = () => {
    router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`)
  }

  const logOut = (redirect = false) => {
    client.clearStore()
    setUser(null)

    if (redirect) {
      router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`)
    }
  }

  return { loading, logIn, logOut, user, error }
}
