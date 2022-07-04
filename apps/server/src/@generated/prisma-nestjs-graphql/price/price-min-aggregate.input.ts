import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class PriceMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true

  @Field(() => Boolean, { nullable: true })
  recurringInterval?: true

  @Field(() => Boolean, { nullable: true })
  unit_amount?: true

  @Field(() => Boolean, { nullable: true })
  currency?: true

  @Field(() => Boolean, { nullable: true })
  type?: true

  @Field(() => Boolean, { nullable: true })
  productId?: true
}
