import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'

@InputType()
export class PriceMaxOrderByAggregateInput {
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
}
