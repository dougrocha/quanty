import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { GuildOrderByWithRelationInput } from '../guild/guild-order-by-with-relation.input'
import { CustomerOrderByWithRelationInput } from '../customer/customer-order-by-with-relation.input'
import { PriceOrderByWithRelationInput } from '../price/price-order-by-with-relation.input'

@InputType()
export class SubscriptionOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  status?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  current_period_end?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  cancel_at_period_end?: keyof typeof SortOrder

  @Field(() => GuildOrderByWithRelationInput, { nullable: true })
  guild?: GuildOrderByWithRelationInput

  @Field(() => SortOrder, { nullable: true })
  guildId?: keyof typeof SortOrder

  @Field(() => CustomerOrderByWithRelationInput, { nullable: true })
  customer?: CustomerOrderByWithRelationInput

  @Field(() => SortOrder, { nullable: true })
  customerId?: keyof typeof SortOrder

  @Field(() => PriceOrderByWithRelationInput, { nullable: true })
  price?: PriceOrderByWithRelationInput

  @Field(() => SortOrder, { nullable: true })
  priceId?: keyof typeof SortOrder
}
