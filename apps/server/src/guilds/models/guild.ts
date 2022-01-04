import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  GuildVerificationLevel,
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildMFALevel,
  GuildSystemChannelFlags,
  APIGuildWelcomeScreen,
  APIStageInstance,
  GatewayPresenceUpdate,
  GatewayVoiceState,
} from 'discord-api-types'

import { Channel } from './channel'
import { Emojis } from './emojis'
import { GuildMember } from './guildMember'
import { Roles } from './roles'
import { Sticker } from './sticker'

@ObjectType()
export class Guild {
  @Field({ nullable: true })
  owner?: boolean

  @Field()
  owner_id: string

  @Field(() => Int)
  afk_timeout: number

  @Field(() => [Roles])
  roles: Roles[]

  @Field(() => [Emojis])
  emojis: Emojis[]

  @Field(() => GuildMember, { nullable: true })
  members?: GuildMember[]

  @Field(() => [Channel], { nullable: true })
  channels?: Channel[]

  @Field(() => [Channel], { nullable: true })
  threads?: Channel[]

  @Field({ nullable: true })
  description?: string

  @Field()
  premium_tier: GuildPremiumTier

  @Field()
  premium_subscription_count?: number

  @Field()
  preferred_locale: string

  @Field()
  nsfw_level: GuildNSFWLevel

  @Field(() => [Sticker])
  stickers: Sticker[]

  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string

  @Field()
  splash: string

  @Field({ nullable: true })
  unavailable?: boolean

  @Field(() => String)
  id: string

  @Field(() => [String])
  features: string[]
  @Field({ nullable: true })
  icon_hash?: string
  @Field()
  discovery_splash: string
  @Field({ nullable: true })
  permissions?: string
  // @Field()
  // region: string
  // @Field()
  // afk_channel_id: string
  // @Field({ nullable: true })
  // widget_enabled?: boolean
  // @Field({ nullable: true })
  // widget_channel_id?: string
  // @Field()
  // verification_level: GuildVerificationLevel
  // @Field()
  // default_message_notifications: GuildDefaultMessageNotifications
  // @Field()
  // explicit_content_filter: GuildExplicitContentFilter
  // @Field()
  // mfa_level: GuildMFALevel
  // @Field()
  // application_id: string
  // @Field()
  // system_channel_id: string
  // @Field()
  // system_channel_flags: GuildSystemChannelFlags
  // @Field()
  // rules_channel_id: string
  // @Field()
  // joined_at?: string
  // @Field()
  // large?: boolean
  @Field()
  member_count?: number
  // @Field()
  // voice_states?: Omit<GatewayVoiceState, 'guild_id'>[]
  // @Field()
  // presences?: GatewayPresenceUpdate[]
  // @Field()
  // max_presences?: number
  // @Field()
  // max_members?: number
  // @Field()
  // vanity_url_code: string
  // @Field()
  // banner: string
  // @Field()
  // public_updates_channel_id: string
  // @Field()
  // max_video_channel_users?: number
  // @Field()
  // approximate_member_count?: number
  // @Field()
  // approximate_presence_count?: number
  // @Field()
  // welcome_screen?: APIGuildWelcomeScreen
  // @Field(() => [APIStageInstance])
  // stage_instances?: APIStageInstance[]
}

enum GuildPremiumTier {
  None = 0,
  Tier1 = 1,
  Tier2 = 2,
  Tier3 = 3,
}

enum GuildNSFWLevel {
  Default = 0,
  Explicit = 1,
  Safe = 2,
  AgeRestricted = 3,
}
