import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { EnumPriceTypeWithAggregatesFilter } from '../prisma/enum-price-type-with-aggregates-filter.input'

@InputType()
export class PriceScalarWhereWithAggregatesInput {
  @Field(() => [PriceScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<PriceScalarWhereWithAggregatesInput>

  @Field(() => [PriceScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<PriceScalarWhereWithAggregatesInput>

  @Field(() => [PriceScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<PriceScalarWhereWithAggregatesInput>

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  recurringInterval?: StringNullableWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  unit_amount?: IntWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  currency?: StringWithAggregatesFilter

  @Field(() => EnumPriceTypeWithAggregatesFilter, { nullable: true })
  type?: EnumPriceTypeWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  productId?: StringWithAggregatesFilter
}
