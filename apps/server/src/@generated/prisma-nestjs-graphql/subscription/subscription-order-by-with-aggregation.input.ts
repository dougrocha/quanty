import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { SubscriptionCountOrderByAggregateInput } from './subscription-count-order-by-aggregate.input'
import { SubscriptionMaxOrderByAggregateInput } from './subscription-max-order-by-aggregate.input'
import { SubscriptionMinOrderByAggregateInput } from './subscription-min-order-by-aggregate.input'

@InputType()
export class SubscriptionOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  status?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  current_period_end?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  cancel_at_period_end?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  guildId?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  customerId?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  priceId?: keyof typeof SortOrder

  @Field(() => SubscriptionCountOrderByAggregateInput, { nullable: true })
  _count?: SubscriptionCountOrderByAggregateInput

  @Field(() => SubscriptionMaxOrderByAggregateInput, { nullable: true })
  _max?: SubscriptionMaxOrderByAggregateInput

  @Field(() => SubscriptionMinOrderByAggregateInput, { nullable: true })
  _min?: SubscriptionMinOrderByAggregateInput
}
