import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFilter } from '../prisma/string-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { PriceListRelationFilter } from '../price/price-list-relation-filter.input'

@InputType()
export class ProductWhereInput {
  @Field(() => [ProductWhereInput], { nullable: true })
  AND?: Array<ProductWhereInput>

  @Field(() => [ProductWhereInput], { nullable: true })
  OR?: Array<ProductWhereInput>

  @Field(() => [ProductWhereInput], { nullable: true })
  NOT?: Array<ProductWhereInput>

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter

  @Field(() => StringNullableFilter, { nullable: true })
  description?: StringNullableFilter

  @Field(() => PriceListRelationFilter, { nullable: true })
  price?: PriceListRelationFilter
}
