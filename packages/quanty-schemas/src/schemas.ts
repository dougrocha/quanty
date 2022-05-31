import { SchemaFactory } from '@nestjs/mongoose'

import {
  GuildBanLogs,
  GuildCommands,
  GuildLogs,
  GuildPlugins,
  Guilds,
  GuildTickets,
} from './guilds'
import { Users } from './users'

export const GuildBanLogsSchema =
  SchemaFactory.createForClass<GuildBanLogs>(GuildBanLogs)

export const GuildCommandsSchema =
  SchemaFactory.createForClass<GuildCommands>(GuildCommands)

export const GuildLogsSchema =
  SchemaFactory.createForClass<GuildLogs>(GuildLogs)

export const GuildPluginsSchema =
  SchemaFactory.createForClass<GuildPlugins>(GuildPlugins)

export const GuildsSchema = SchemaFactory.createForClass<Guilds>(Guilds)

export const GuildTicketsSchema =
  SchemaFactory.createForClass<GuildTickets>(GuildTickets)

export const UsersSchema = SchemaFactory.createForClass<Users>(Users)
