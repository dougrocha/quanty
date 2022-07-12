import { Field, ObjectType } from '@nestjs/graphql'
import { Schema, Prop } from '@nestjs/mongoose'

@ObjectType()
@Schema({ timestamps: true })
export class GuildPlugins {
  @Field()
  @Prop({ required: true, unique: true, index: true })
  guildId: string

  @Field(() => [String], { nullable: true })
  @Prop({ type: () => [String], required: false, lowercase: true, default: [] })
  plugins?: string[]

  @Field(() => [String], { nullable: true })
  @Prop({ type: () => [String], nullable: true, lowercase: true, default: [] })
  blacklistedWords?: string[]

  @Field({ nullable: true })
  @Prop({ default: false })
  autoMod?: boolean

  @Field({ nullable: true })
  @Prop({ required: false, default: null })
  djRole?: string

  @Field({ nullable: true })
  @Prop({ default: false })
  immortal?: boolean

  @Field({ nullable: true })
  @Prop({ default: null })
  channel?: string

  @Field({ nullable: true })
  @Prop({ default: false })
  nsfw?: boolean

  @Field({ nullable: true })
  @Prop({ default: 0 })
  defaultGlobalCooldown?: number

  @Field({ nullable: true })
  @Prop({ type: () => String, required: false })
  ticketCategory?: string

  @Field({ nullable: true })
  @Prop({ type: () => String, required: false })
  ticketTranscriptChannel?: string
}
