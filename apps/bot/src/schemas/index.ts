import { getModelForClass } from '@typegoose/typegoose'

import { GuildBanLogs } from './GuildBanSchema'
import { Guild } from './GuildSchema'
import { GuildTicket } from './GuildTicketSchema'

export const GuildBanLogsModel =
  getModelForClass<typeof GuildBanLogs>(GuildBanLogs)

export const GuildModel = getModelForClass<typeof Guild>(Guild)

export const GuildTicketModel = getModelForClass(GuildTicket)
