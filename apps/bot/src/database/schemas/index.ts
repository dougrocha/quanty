import { getModelForClass } from '@typegoose/typegoose'

import { GuildBanLogs } from './GuildBanSchema'
import { GuildCommands } from './GuildCommandsSchema'
import { GuildLogs } from './GuildLogsSchema'
import { GuildPlugins } from './GuildPluginSchema'
import { Guild } from './GuildSchema'
import { GuildTicket } from './GuildTicketSchema'

export const GuildLogsModel = getModelForClass(GuildLogs)

export const GuildBanLogsModel = getModelForClass(GuildBanLogs)

export const GuildModel = getModelForClass(Guild)

export const GuildTicketModel = getModelForClass(GuildTicket)

export const GuildPluginModel = getModelForClass(GuildPlugins)

export const GuildCommandModel = getModelForClass(GuildCommands)
