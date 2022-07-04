import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFilter } from '../prisma/string-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { IntFilter } from '../prisma/int-filter.input'
import { EnumPriceTypeFilter } from '../prisma/enum-price-type-filter.input'

@InputType()
export class PriceScalarWhereInput {
  @Field(() => [PriceScalarWhereInput], { nullable: true })
  AND?: Array<PriceScalarWhereInput>

  @Field(() => [PriceScalarWhereInput], { nullable: true })
  OR?: Array<PriceScalarWhereInput>

  @Field(() => [PriceScalarWhereInput], { nullable: true })
  NOT?: Array<PriceScalarWhereInput>

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

  @Field(() => StringFilter, { nullable: true })
  productId?: StringFilter
}
