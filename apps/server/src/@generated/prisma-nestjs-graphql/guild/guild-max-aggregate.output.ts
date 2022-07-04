import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GuildMaxAggregate {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => Boolean, { nullable: true })
  premium?: boolean

  @Field(() => String, { nullable: true })
  prefix?: string
}
