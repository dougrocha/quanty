import { Field, Int, ObjectType } from '@nestjs/graphql'
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
  //   icon_hash?: string;
  //   discovery_splash: string;
  //   permissions?: string;
  //   region: string;
  //   afk_channel_id: string;
  //   widget_enabled?: boolean;
  //   widget_channel_id?: string;
  //   verification_level: GuildVerificationLevel;
  //   default_message_notifications: GuildDefaultMessageNotifications;
  //   explicit_content_filter: GuildExplicitContentFilter;
  //   mfa_level: GuildMFALevel;
  //   application_id: string;
  //   system_channel_id: string;
  //   system_channel_flags: GuildSystemChannelFlags;
  //   rules_channel_id: string;
  //   joined_at?: string;
  //   large?: boolean;
  //   member_count?: number;
  //   voice_states?: Omit<GatewayVoiceState, 'guild_id'>[];
  //   presences?: GatewayPresenceUpdate[];
  //   max_presences?: number;
  //   max_members?: number;
  //   vanity_url_code: string;
  //   banner: string;
  //   public_updates_channel_id: string;
  //   max_video_channel_users?: number;
  //   approximate_member_count?: number;
  //   approximate_presence_count?: number;
  //   welcome_screen?: APIGuildWelcomeScreen;
  //   stage_instances?: APIStageInstance[];
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
