import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Mutual Guilds. Guilds that a user can edit' })
export class MutualGuild {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string

  @Field()
  bot: boolean

  /**
   * Whether the user has access to change settings in the guild
   *
   * For now the value will always be true till feature is built
   */
  @Field({ defaultValue: true })
  botMaster?: boolean

  @Field()
  owner: boolean
}
