import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { PriceOrderByRelationAggregateInput } from '../price/price-order-by-relation-aggregate.input'

@InputType()
export class ProductOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder

  @Field(() => PriceOrderByRelationAggregateInput, { nullable: true })
  price?: PriceOrderByRelationAggregateInput
}
