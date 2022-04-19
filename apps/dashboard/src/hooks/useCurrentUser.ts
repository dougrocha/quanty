import { useState } from 'react'

import { useGetUserQuery } from '../graphql/generated/schema'
import { CurrentUser } from '../utils/types'

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null)

  useGetUserQuery({
    onCompleted: ({ user }) => {
      setUser(user)
    },
  })

  return [user]
}
