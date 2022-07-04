import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { PriceCountOrderByAggregateInput } from './price-count-order-by-aggregate.input'
import { PriceAvgOrderByAggregateInput } from './price-avg-order-by-aggregate.input'
import { PriceMaxOrderByAggregateInput } from './price-max-order-by-aggregate.input'
import { PriceMinOrderByAggregateInput } from './price-min-order-by-aggregate.input'
import { PriceSumOrderByAggregateInput } from './price-sum-order-by-aggregate.input'

@InputType()
export class PriceOrderByWithAggregationInput {
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

  @Field(() => SortOrder, { nullable: true })
  productId?: keyof typeof SortOrder

  @Field(() => PriceCountOrderByAggregateInput, { nullable: true })
  _count?: PriceCountOrderByAggregateInput

  @Field(() => PriceAvgOrderByAggregateInput, { nullable: true })
  _avg?: PriceAvgOrderByAggregateInput

  @Field(() => PriceMaxOrderByAggregateInput, { nullable: true })
  _max?: PriceMaxOrderByAggregateInput

  @Field(() => PriceMinOrderByAggregateInput, { nullable: true })
  _min?: PriceMinOrderByAggregateInput

  @Field(() => PriceSumOrderByAggregateInput, { nullable: true })
  _sum?: PriceSumOrderByAggregateInput
}
