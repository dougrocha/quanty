import { useAtom } from 'jotai'

import { useGetUserQuery } from '../graphql/generated/schema'
import { currentUserAtom } from '../utils/store'

export const useCurrentUser = () => {
  const [user, setUser] = useAtom(currentUserAtom)

  useGetUserQuery({
    onCompleted: ({ user }) => {
      setUser(user)
    },
    fetchPolicy: 'cache-and-network',
  })

  return { user, setUser }
}
