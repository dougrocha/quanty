/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from 'react'

import { GuildConfig } from '../../graphql/generated/schema'

interface ICurrentGuild {
  guild: GuildConfig | null
  // eslint-disable-next-line @typescript-eslint/ban-types
  setGuild: Function
}

export const CurrentGuildContext = createContext<ICurrentGuild>({
  guild: null,
  setGuild: (guild: GuildConfig) => {},
})

export const CurrentGuildContextProvider = CurrentGuildContext.Provider
