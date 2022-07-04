import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class ProductMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true

  @Field(() => Boolean, { nullable: true })
  name?: true

  @Field(() => Boolean, { nullable: true })
  description?: true
}
