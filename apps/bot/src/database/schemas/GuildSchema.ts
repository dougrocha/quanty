import { ModelOptions, Prop, index } from '@typegoose/typegoose'
import { Ref } from '@typegoose/typegoose/lib/types'

import { GuildBanLogs } from './GuildBanSchema'
import { GuildLogs } from './GuildLogsSchema'
import { GuildPlugins } from './GuildPluginSchema'
import { GuildTicket } from './GuildTicketSchema'

enum PremiumTiers {
  FREE = 0,
  SILVER = 1,
  GOLD = 2,
  QUANTUM = 3,
}
@index({ guildId: 1 })
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Guild {
  @Prop({ required: true, unique: true })
  guildId: string

  @Prop({ default: 'q!', lowercase: true })
  prefix: string

  @Prop({
    type: () => Number,
    enum: PremiumTiers,
    default: PremiumTiers.FREE,
  })
  premium: PremiumTiers

  @Prop({
    type: () => GuildLogs,
    ref: () => GuildLogs,
    required: false,
  })
  logs?: Ref<GuildLogs>[]

  @Prop({
    type: () => GuildBanLogs,
    ref: () => GuildBanLogs,
    required: false,
  })
  banLogs?: Ref<GuildBanLogs>[]

  @Prop({
    type: () => GuildTicket,
    ref: () => GuildTicket,
    required: false,
  })
  tickets?: Ref<GuildTicket>[]

  @Prop({
    type: () => GuildPlugins,
    ref: () => GuildPlugins,
    required: false,
  })
  GuildPlugins?: Ref<GuildPlugins>

  @Prop({
    type: () => Number,
    required: false,
    default: 1,
    min: [1, 'Must at least have one'],
    max: [10, 'Max Tickets'],
  })
  maxTickets: number

  @Prop({
    type: () => String,
    required: false,
  })
  defaultJoinRole: string

  @Prop({
    type: () => String,
    required: false,
  })
  logChannel: string
}
