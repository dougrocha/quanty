import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Mutual Guilds. Guilds that a user can edit' })
export class MutualGuild {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string

  /**
   * Whether the bot is in the guild
   */
  @Field()
  bot: boolean

  /**
   * Whether the user has access to change settings in the guild
   *
   * For now the value will always be true till feature is built
   *
   * Currently only admins and owners are able to be bot masters
   */
  @Field({ defaultValue: true })
  botMaster?: boolean

  /**
   * Whether the user owns this server
   */
  @Field()
  owner: boolean
}
