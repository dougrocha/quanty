import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class SubscriptionCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true

  @Field(() => Boolean, { nullable: true })
  status?: true

  @Field(() => Boolean, { nullable: true })
  current_period_end?: true

  @Field(() => Boolean, { nullable: true })
  cancel_at_period_end?: true

  @Field(() => Boolean, { nullable: true })
  guildId?: true

  @Field(() => Boolean, { nullable: true })
  customerId?: true

  @Field(() => Boolean, { nullable: true })
  priceId?: true

  @Field(() => Boolean, { nullable: true })
  _all?: true
}
