import { getModelForClass } from '@typegoose/typegoose'

import { GuildBanLogs } from './guilds/GuildBanSchema'
import { GuildCommands } from './guilds/GuildCommandsSchema'
import { GuildLogs } from './guilds/GuildLogsSchema'
import { GuildPlugins } from './guilds/GuildPluginSchema'
import { Guild } from './guilds/GuildSchema'
import { GuildTicket } from './guilds/GuildTicketSchema'
import { LoggedUser } from './guilds/LoggedUser'

export const GuildLogsModel = getModelForClass<typeof GuildLogs>(GuildLogs)

export const GuildBanLogsModel =
  getModelForClass<typeof GuildBanLogs>(GuildBanLogs)

export const GuildModel = getModelForClass<typeof Guild>(Guild)

export const GuildTicketModel =
  getModelForClass<typeof GuildTicket>(GuildTicket)

export const GuildPluginModel =
  getModelForClass<typeof GuildPlugins>(GuildPlugins)

export const GuildCommandModel =
  getModelForClass<typeof GuildCommands>(GuildCommands)

export {
  GuildCommands,
  GuildLogs,
  GuildPlugins,
  GuildTicket,
  GuildBanLogs,
  Guild,
  LoggedUser,
}
