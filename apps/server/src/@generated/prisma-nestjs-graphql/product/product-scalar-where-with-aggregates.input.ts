import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'

@InputType()
export class ProductScalarWhereWithAggregatesInput {
  @Field(() => [ProductScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ProductScalarWhereWithAggregatesInput>

  @Field(() => [ProductScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ProductScalarWhereWithAggregatesInput>

  @Field(() => [ProductScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ProductScalarWhereWithAggregatesInput>

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  description?: StringNullableWithAggregatesFilter
}
