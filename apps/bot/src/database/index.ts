import {
  GuildPlugins,
  GuildBanLogs,
  GuildLogs,
  Guilds,
  GuildTickets,
  GuildCommands,
  GuildSchema,
  GuildBanLogsSchema,
  GuildLogsSchema,
  GuildTicketsSchema,
  GuildPluginsSchema,
  GuildCommandsSchema,
} from '@quanty/schemas'

import Database from './database'
import { getModelFromClass } from './utils'

export const GuildLogsModel = getModelFromClass<GuildLogs>(
  GuildLogs.name,
  GuildLogsSchema,
)

export const GuildBanLogsModel = getModelFromClass<GuildBanLogs>(
  GuildBanLogs.name,
  GuildBanLogsSchema,
)

export const GuildsModel = getModelFromClass<Guilds>(Guilds.name, GuildSchema)

export const GuildTicketsModel = getModelFromClass<GuildTickets>(
  GuildTickets.name,
  GuildTicketsSchema,
)

export const GuildPluginsModel = getModelFromClass<GuildPlugins>(
  GuildPlugins.name,
  GuildPluginsSchema,
)

export const GuildCommandsModel = getModelFromClass<GuildCommands>(
  GuildCommands.name,
  GuildCommandsSchema,
)

export default Database
