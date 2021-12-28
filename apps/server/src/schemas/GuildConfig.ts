/* eslint-disable  */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type GuildDocument = Guilds & Document

@Schema({ _id: false })
class Music {
  @Prop({ default: false })
  plugin?: boolean

  @Prop({ default: false })
  immortal?: boolean

  @Prop({ default: null })
  channel?: String
}

@Schema({ _id: false })
class Anime {
  @Prop({ default: false })
  plugin?: boolean
  @Prop({ default: false })
  nsfw?: boolean
}

@Schema({ _id: false })
class CustomCommands {
  @Prop({ required: true })
  id: string
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  description: string
}
@Schema({ _id: false })
class Logs {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  action: string
  @Prop({ now: true, default: Date.now(), required: true })
  updatedAt: number
}

@Schema({ _id: false })
class Moderation {
  @Prop({ default: false })
  plugin?: boolean

  @Prop({ default: false })
  autoMod?: boolean
}

@Schema({ timestamps: true, versionKey: false })
export class Guilds {
  @Prop({ required: true, unique: true })
  guildId: string

  @Prop({ default: 'q!' })
  prefix: string

  @Prop()
  music: Music

  @Prop()
  moderation: Moderation

  @Prop()
  anime: Anime

  @Prop()
  customCommands: CustomCommands[]

  @Prop({ default: false })
  premium: boolean

  @Prop()
  logs: Logs[]

  @Prop({ nullable: true, lowercase: true })
  blacklistedWords: string[]
}

export const GuildSchema = SchemaFactory.createForClass<Guilds>(Guilds)
