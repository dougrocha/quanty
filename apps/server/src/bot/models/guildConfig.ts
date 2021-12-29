import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
class Logs {
  @Field({ nullable: false })
  name?: string

  @Field({ nullable: false })
  action?: string
}

@ObjectType()
class Moderation {
  @Field({ nullable: true })
  autoMod?: boolean

  @Field({ nullable: true })
  plugin?: boolean
}

@ObjectType()
class Music {
  @Field({ nullable: true })
  plugin?: boolean

  @Field({ nullable: true })
  channel?: string

  @Field({ nullable: true })
  immortal?: boolean
}

@ObjectType()
class Anime {
  @Field({ nullable: true })
  plugin?: boolean

  @Field({ nullable: true })
  nsfw?: boolean
}

@ObjectType()
class CustomCommands {
  @Field({ nullable: false })
  id?: string

  @Field({ nullable: false })
  name?: string

  @Field({ nullable: false })
  description?: string
}

@ObjectType()
export class GuildConfig {
  @Field({ nullable: false })
  guildId: string

  @Field({ nullable: true })
  prefix?: string

  @Field(() => Moderation, { nullable: true })
  moderation?: Moderation

  @Field(() => Music, { nullable: true })
  music?: Music

  @Field(() => Anime, { nullable: true })
  anime?: Anime

  @Field(() => [CustomCommands], { nullable: true })
  customCommands?: CustomCommands[]

  @Field({ nullable: true })
  premium?: boolean

  @Field(() => [Logs], { nullable: true })
  logs?: Logs[]

  @Field(() => [String], { nullable: true })
  blacklistedWords?: string[]
}
