import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user'

@ObjectType()
export class GuildMember {
  @Field(() => User, { nullable: true })
  user?: User
  @Field({ nullable: true })
  nick?: string
  @Field({ nullable: true })
  avatar?: string
  @Field(() => [String])
  roles: string[]
  @Field()
  joined_at: string
  @Field({ nullable: true })
  premium_since?: string
  @Field()
  deaf: boolean
  @Field()
  mute: boolean
  @Field({ nullable: true })
  pending?: boolean
}
