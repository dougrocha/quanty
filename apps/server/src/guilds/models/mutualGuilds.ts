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
}
