import {
  GuildBanLogs,
  GuildCommands,
  GuildLogs,
  GuildPlugins,
  Guilds,
  GuildTickets,
} from './guilds'
import { Users } from './users'

export * from './guilds'
export * from './users'
export * from './schemas'

export type GuildBanLogsDocument = GuildBanLogs & Document

export type GuildCommandsDocument = GuildCommands & Document

export type GuildLogsDocument = GuildLogs & Document

export type GuildPluginsDocument = GuildPlugins & Document

export type GuildDocument = Guilds & Document

export type GuildTicketsDocument = GuildTickets & Document

export type UsersDocument = Users & Document
