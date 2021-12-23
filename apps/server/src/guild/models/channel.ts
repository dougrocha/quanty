import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from './user'

@ObjectType()
class OverWrite {
  @Field()
  id: string
  @Field()
  type: OverwriteType
  @Field()
  allow: string
  @Field()
  deny: string
}

@ObjectType()
class ThreadMetaData {
  @Field()
  archived: boolean
  @Field()
  auto_archive_duration: ThreadAutoArchiveDuration
  @Field()
  archive_timestamp: string
  @Field({ nullable: true })
  locked?: boolean
  @Field({ nullable: true })
  invitable?: boolean
}

@ObjectType()
class ThreadMember {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  user_id?: string
  @Field()
  join_timestamp: string
  @Field()
  flags: ThreadMemberFlags
}

@ObjectType()
export class Channel {
  @Field({ nullable: true })
  guild_id?: string
  @Field({ nullable: true })
  position?: number
  @Field(() => [OverWrite], { nullable: true })
  permission_overwrites?: OverWrite[]
  @Field({ nullable: true })
  topic?: string
  @Field({ nullable: true })
  nsfw?: boolean
  @Field({ nullable: true })
  last_message_id?: string
  @Field(() => Int, { nullable: true })
  bitrate?: number
  @Field(() => Int, { nullable: true })
  user_limit?: number
  @Field(() => Int, { nullable: true })
  rate_limit_per_user?: number
  @Field(() => [User], { nullable: true })
  recipients?: User[]
  @Field({ nullable: true })
  icon?: string
  @Field({ nullable: true })
  owner_id?: string
  @Field({ nullable: true })
  application_id?: string
  @Field({ nullable: true })
  parent_id?: string
  @Field({ nullable: true })
  last_pin_timestamp?: string
  @Field({ nullable: true })
  rtc_region?: string
  @Field({ nullable: true })
  video_quality_mode?: VideoQualityMode
  @Field(() => Int, { nullable: true })
  message_count?: number
  @Field(() => Int, { nullable: true })
  member_count?: number
  @Field(() => ThreadMetaData, { nullable: true })
  thread_metadata?: ThreadMetaData
  @Field(() => ThreadMember, { nullable: true })
  member?: ThreadMember
  @Field({ nullable: true })
  default_auto_archive_duration?: ThreadAutoArchiveDuration
  @Field(() => String)
  id: string
  @Field()
  type: ChannelType
  @Field({ nullable: true })
  name?: string
}

enum VideoQualityMode {
  /**
   * Discord chooses the quality for optimal performance
   */
  Auto = 1,
  /**
   * 720p
   */
  Full = 2,
}

enum OverwriteType {
  Role = 0,
  Member = 1,
}

enum ThreadAutoArchiveDuration {
  OneHour = 60,
  OneDay = 1440,
  ThreeDays = 4320,
  OneWeek = 10080,
}

enum ThreadMemberFlags {}

enum ChannelType {
  /**
   * A text channel within a guild
   */
  GuildText = 0,
  /**
   * A direct message between users
   */
  DM = 1,
  /**
   * A voice channel within a guild
   */
  GuildVoice = 2,
  /**
   * A direct message between multiple users
   */
  GroupDM = 3,
  /**
   * An organizational category that contains up to 50 channels
   *
   * See https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101
   */
  GuildCategory = 4,
  /**
   * A channel that users can follow and crosspost into their own guild
   *
   * See https://support.discord.com/hc/en-us/articles/360032008192
   */
  GuildNews = 5,
  /**
   * A channel in which game developers can sell their game on Discord
   *
   * See https://discord.com/developers/docs/game-and-server-management/special-channels
   */
  GuildStore = 6,
  /**
   * A thread channel (public) within a Guild News channel
   */
  GuildNewsThread = 10,
  /**
   * A public thread channel within a Guild Text channel
   */
  GuildPublicThread = 11,
  /**
   * A private thread channel within a Guild Text channel
   */
  GuildPrivateThread = 12,
  /**
   * A voice channel for hosting events with an audience
   *
   * See https://support.discord.com/hc/en-us/articles/1500005513722
   */
  GuildStageVoice = 13,
}
