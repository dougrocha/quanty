import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { ProductOrderByWithRelationInput } from '../product/product-order-by-with-relation.input'
import { GuildSubscriptionOrderByRelationAggregateInput } from '../guild-subscription/guild-subscription-order-by-relation-aggregate.input'

@InputType()
export class PriceOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  recurringInterval?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  unit_amount?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  currency?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  type?: keyof typeof SortOrder

  @Field(() => ProductOrderByWithRelationInput, { nullable: true })
  product?: ProductOrderByWithRelationInput

  @Field(() => SortOrder, { nullable: true })
  productId?: keyof typeof SortOrder

  @Field(() => GuildSubscriptionOrderByRelationAggregateInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionOrderByRelationAggregateInput
}
