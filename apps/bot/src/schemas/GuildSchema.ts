import {
  getModelForClass,
  ModelOptions,
  Prop,
  index,
} from '@typegoose/typegoose'
import { Ref } from '@typegoose/typegoose/lib/types'

import { GuildBanLogs } from './GuildBanSchema'
import { GuildTicket } from './GuildTicketSchema'

@ModelOptions({ schemaOptions: { _id: false } })
class Music {
  @Prop({ default: false })
  plugin?: boolean

  @Prop({ default: false })
  immortal?: boolean

  @Prop({ default: null })
  channel?: string
}

@ModelOptions({ schemaOptions: { _id: false } })
class Anime {
  @Prop({ default: false })
  plugin?: boolean
  @Prop({ default: false })
  nsfw?: boolean
}

@ModelOptions({ schemaOptions: { _id: false } })
class CustomCommands {
  @Prop({ required: true })
  id: string
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  description: string
}
@ModelOptions({ schemaOptions: { _id: false } })
class Logs {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  action: string
  @Prop({ now: true, default: Date.now(), required: true })
  updatedAt: number
}

@ModelOptions({ schemaOptions: { _id: false } })
class Moderation {
  @Prop({ default: false })
  plugin?: boolean

  @Prop({ default: false })
  autoMod?: boolean
}

enum PremiumTiers {
  quantum = 'quantum',
  gold = 'gold',
  silver = 'silver',
  free = 'free',
}

@index({ guildId: 1 })
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Guild {
  @Prop({ required: true, unique: true })
  guildId: string

  @Prop({ default: 'q!' })
  prefix: string

  @Prop({
    type: () => String,
    enum: Object.values(PremiumTiers),
    default: 'free',
  })
  premium: boolean

  @Prop({ type: () => [String], nullable: true, lowercase: true })
  blacklistedWords: string[]

  @Prop({
    type: () => GuildBanLogs,
    ref: () => 'GuildBanLogs',
    required: false,
  })
  banLogs?: Ref<GuildBanLogs>[]

  @Prop({
    type: () => GuildTicket,
    ref: () => 'GuildTicket',
    required: false,
  })
  tickets?: Ref<GuildTicket>[]

  @Prop({ type: () => String, required: false })
  ticketCategory?: string

  @Prop({ type: () => String, required: false })
  ticketTranscriptChannel?: string
}

const GuildModel = getModelForClass<typeof Guild>(Guild)
export default GuildModel
