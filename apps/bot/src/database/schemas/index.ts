import { getModelForClass } from '@typegoose/typegoose'

import { GuildBanLogs } from './GuildBanSchema'
import { GuildCommands } from './GuildCommandsSchema'
import { GuildLogs } from './GuildLogsSchema'
import { GuildPlugins } from './GuildPluginSchema'
import { Guild } from './GuildSchema'
import { GuildTicket } from './GuildTicketSchema'

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
