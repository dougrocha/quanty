import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
class RoleTags {
  @Field({ nullable: true })
  bot_id?: string

  @Field({ nullable: true })
  integration_id?: string
}

@ObjectType()
export class DiscordRoles {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  color: number

  @Field()
  hoist: boolean

  @Field({ nullable: true })
  icon?: string

  @Field({ nullable: true })
  unicode_emoji?: string

  @Field()
  position: number

  @Field()
  permissions: string

  @Field()
  managed: boolean

  @Field()
  mentionable: boolean

  @Field(() => RoleTags, { nullable: true })
  tags?: RoleTags
}
