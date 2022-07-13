import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useDebugValue } from 'react'

import { useGetUserQuery } from '../graphql/generated/schema'
import { currentUserAtom } from '../utils/store'

export const useAuth = () => {
  const router = useRouter()

  const [user, setUser] = useAtom(currentUserAtom)

  const redirectToHome = () => router.push('/')

  const { client, loading, error } = useGetUserQuery({
    fetchPolicy: 'cache-first',
    onCompleted: ({ me }) => {
      setUser(me)
    },
    onError: () => {
      if (router.route !== '/') redirectToHome()
      client.resetStore()
      setUser(null)
    },
  })

  useDebugValue(user, user => (user ? 'Logged in' : 'Logged out'))

  const logIn = () => {
    router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`)
  }

  const logOut = () => {
    router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`)
  }

  return { loading, logIn, logOut, user, error }
}
