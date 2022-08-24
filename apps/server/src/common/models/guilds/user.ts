import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordUser {
  @Field()
  id: string

  @Field()
  username: string

  @Field()
  discriminator: string

  @Field()
  avatar: string

  @Field({ nullable: true })
  bot?: boolean

  @Field({ nullable: true })
  system?: boolean

  @Field({ nullable: true })
  mfa_enabled?: boolean

  @Field({ nullable: true })
  banner?: string

  @Field({ nullable: true })
  accent_color?: number

  @Field({ nullable: true })
  locale?: string

  @Field({ nullable: true })
  verified?: boolean

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  flags?: UserFlags

  @Field({ nullable: true })
  premium_type?: UserPremiumType

  @Field({ nullable: true })
  public_flags?: UserFlags
}

enum UserPremiumType {
  None = 0,
  NitroClassic = 1,
  Nitro = 2,
}

enum UserFlags {
  None = 0,
  DiscordEmployee = 1,
  PartneredServerOwner = 2,
  DiscordHypeSquadEvents = 4,
  BugHunterLevel1 = 8,
  HypeSquadHouseBravery = 64,
  HypeSquadHouseBrilliance = 128,
  HypeSquadHouseBalance = 256,
  EarlySupporter = 512,
  TeamUser = 1024,
  BugHunterLevel2 = 16384,
  VerifiedBot = 65536,
  EarlyVerifiedBotDeveloper = 131072,
  DiscordCertifiedModerator = 262144,
}
