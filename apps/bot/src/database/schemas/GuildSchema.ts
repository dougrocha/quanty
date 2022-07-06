import { ModelOptions, Prop, index } from '@typegoose/typegoose'
import { Ref } from '@typegoose/typegoose/lib/types'

import { GuildBanLogs } from './GuildBanSchema'
import { GuildLogs } from './GuildLogsSchema'
import { GuildPlugins } from './GuildPluginSchema'
import { GuildTicket } from './GuildTicketSchema'

@index({ guildId: 1 })
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Guild {
  @Prop({ required: true, unique: true })
  guildId: string

  @Prop({ default: 'q!', lowercase: true })
  prefix: string

  // @Prop({
  //   type: () => String,
  //   enum: PremiumTiers,
  //   default: PremiumTiers.FREE,
  // })
  // premium?: PremiumTiers

  @Prop({
    ref: () => GuildLogs,
    required: false,
  })
  logs?: Ref<GuildLogs>[]

  @Prop({
    ref: () => GuildBanLogs,
    required: false,
  })
  banLogs?: Ref<GuildBanLogs>[]

  @Prop({
    ref: () => GuildTicket,
    required: false,
  })
  tickets?: Ref<GuildTicket>[]

  @Prop({
    type: () => GuildPlugins,
    ref: () => GuildPlugins,
    required: false,
  })
  plugins?: Ref<GuildPlugins>

  @Prop({
    type: () => Number,
    required: false,
    default: 1,
    min: [1, 'Must at least have one'],
    max: [25, 'Max Tickets'],
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
