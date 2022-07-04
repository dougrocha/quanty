import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFilter } from '../prisma/string-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { IntFilter } from '../prisma/int-filter.input'
import { EnumPriceTypeFilter } from '../prisma/enum-price-type-filter.input'
import { ProductWhereInput } from '../product/product-where.input'
import { GuildSubscriptionListRelationFilter } from '../guild-subscription/guild-subscription-list-relation-filter.input'

@InputType()
export class PriceWhereInput {
  @Field(() => [PriceWhereInput], { nullable: true })
  AND?: Array<PriceWhereInput>

  @Field(() => [PriceWhereInput], { nullable: true })
  OR?: Array<PriceWhereInput>

  @Field(() => [PriceWhereInput], { nullable: true })
  NOT?: Array<PriceWhereInput>

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter

  @Field(() => StringNullableFilter, { nullable: true })
  recurringInterval?: StringNullableFilter

  @Field(() => IntFilter, { nullable: true })
  unit_amount?: IntFilter

  @Field(() => StringFilter, { nullable: true })
  currency?: StringFilter

  @Field(() => EnumPriceTypeFilter, { nullable: true })
  type?: EnumPriceTypeFilter

  @Field(() => ProductWhereInput, { nullable: true })
  product?: ProductWhereInput

  @Field(() => StringFilter, { nullable: true })
  productId?: StringFilter

  @Field(() => GuildSubscriptionListRelationFilter, { nullable: true })
  subscription?: GuildSubscriptionListRelationFilter
}
