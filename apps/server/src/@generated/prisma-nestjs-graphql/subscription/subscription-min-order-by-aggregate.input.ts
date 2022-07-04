import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'

@InputType()
export class SubscriptionMinOrderByAggregateInput {
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
}
