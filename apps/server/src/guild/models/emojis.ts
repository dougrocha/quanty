import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user'

@ObjectType()
export class Emojis {
  @Field(() => [String], { nullable: true })
  roles?: string[]
  @Field(() => User, { nullable: true })
  user?: User
  @Field({ nullable: true })
  require_colons?: boolean
  @Field({ nullable: true })
  managed?: boolean
  @Field({ nullable: true })
  available?: boolean
  @Field()
  id: string
  @Field()
  name: string
  @Field({ nullable: true })
  animated?: boolean
}
