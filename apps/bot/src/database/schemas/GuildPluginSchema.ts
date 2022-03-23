import { ModelOptions, getModelForClass, Prop } from '@typegoose/typegoose'

@ModelOptions({ schemaOptions: { timestamps: true } })
export class GuildPlugins {
  @Prop({ required: true, unique: true })
  guildId: string

  @Prop({ type: () => [String], required: false, lowercase: true, default: [] })
  plugins?: string[]

  @Prop({ type: () => [String], nullable: true, lowercase: true, default: [] })
  blacklistedWords?: string[]

  @Prop({ required: false, default: null })
  djRole?: string

  @Prop({ default: false })
  immortal?: boolean

  @Prop({ default: null })
  channel?: string

  @Prop({ default: false })
  nsfw?: boolean

  @Prop({ default: 0 })
  defaultGlobalCooldown?: number

  @Prop({ type: () => String, required: false })
  ticketCategory?: string

  @Prop({ type: () => String, required: false })
  ticketTranscriptChannel?: string
}

const GuildPluginModel = getModelForClass<typeof GuildPlugins>(GuildPlugins)
export default GuildPluginModel
