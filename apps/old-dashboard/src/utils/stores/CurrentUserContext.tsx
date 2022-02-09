// React Imports
import { createContext } from 'react'

// Types
import { CurrentUser } from '../types'

interface CurrentUserType {
  user?: CurrentUser
  setUser: Function
}

export const CurrentUserContext = createContext<CurrentUserType>({
  user: undefined,
  setUser: (user: CurrentUser) => {},
})

export const CurrentUserContextProvider = CurrentUserContext.Provider
