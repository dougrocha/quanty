import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { ProductCountOrderByAggregateInput } from './product-count-order-by-aggregate.input'
import { ProductMaxOrderByAggregateInput } from './product-max-order-by-aggregate.input'
import { ProductMinOrderByAggregateInput } from './product-min-order-by-aggregate.input'

@InputType()
export class ProductOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder

  @Field(() => ProductCountOrderByAggregateInput, { nullable: true })
  _count?: ProductCountOrderByAggregateInput

  @Field(() => ProductMaxOrderByAggregateInput, { nullable: true })
  _max?: ProductMaxOrderByAggregateInput

  @Field(() => ProductMinOrderByAggregateInput, { nullable: true })
  _min?: ProductMinOrderByAggregateInput
}
