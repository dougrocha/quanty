import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Schema, Prop } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'

import { GuildBanLogs, GuildLogs, GuildPlugins, GuildTickets } from './'

export enum PremiumTiers {
  FREE = 'FREE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  QUANTUM = 'QUANTUM',
}

registerEnumType(PremiumTiers, {
  name: 'PremiumTiers',
  description: 'Premium tiers with for Quanty Bot',
})

@ObjectType({ description: 'Guild Config for Quantum Bot Users' })
@Schema({ timestamps: true, autoIndex: true })
export class Guilds {
  @Prop({ required: true, unique: true, index: true })
  @Field()
  guildId: string

  @Prop({ default: 'q!', lowercase: true })
  @Field({ nullable: true })
  prefix: string

  @Prop({
    type: () => Number,
    enum: PremiumTiers,
    default: PremiumTiers.FREE,
    nullable: true,
  })
  @Field(() => [PremiumTiers], {
    defaultValue: PremiumTiers.FREE,
    nullable: true,
  })
  premium?: PremiumTiers

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'GuildLogs' }],
    required: false,
  })
  @Field(() => [GuildLogs], { nullable: true })
  logs?: GuildLogs[]

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'GuildBanLogs' }],
    required: false,
  })
  @Field(() => [GuildBanLogs], { nullable: true })
  banLogs?: GuildBanLogs[]

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'GuildTickets' }],
    required: false,
  })
  @Field(() => [GuildTickets], { nullable: true })
  tickets?: GuildTickets[]

  @Prop({
    type: () => MongooseSchema.Types.ObjectId,
    ref: 'GuildPlugins',
    required: false,
  })
  @Field(() => GuildPlugins, { nullable: true })
  plugins?: GuildPlugins

  @Prop({
    type: Number,
    required: false,
    default: 1,
    min: [1, 'Must at least have one'],
    max: [25, 'Max Tickets'],
  })
  @Field({ nullable: true })
  maxTickets?: number

  @Prop({
    type: String,
    required: false,
  })
  @Field({ nullable: true })
  defaultJoinRole?: string

  @Prop({
    type: String,
    required: false,
  })
  @Field({ nullable: true })
  logChannel?: string
}
