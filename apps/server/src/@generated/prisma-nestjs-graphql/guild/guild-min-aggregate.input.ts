import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class GuildMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true

  @Field(() => Boolean, { nullable: true })
  premium?: true

  @Field(() => Boolean, { nullable: true })
  prefix?: true
}
