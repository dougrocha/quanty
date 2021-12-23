import { createContext } from 'react'
import { Guild } from '../types'

type GuildContextType = {
  guild?: Guild
  setGuild: Function
}

export const GuildContext = createContext<GuildContextType>({
  guild: undefined,
  setGuild: (guild: Guild) => {},
})

export const GuildContextProvider = GuildContext.Provider
