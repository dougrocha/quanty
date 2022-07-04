import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class CustomerScalarWhereWithAggregatesInput {
  @Field(() => [CustomerScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<CustomerScalarWhereWithAggregatesInput>

  @Field(() => [CustomerScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<CustomerScalarWhereWithAggregatesInput>

  @Field(() => [CustomerScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<CustomerScalarWhereWithAggregatesInput>

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  email?: StringNullableWithAggregatesFilter

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  subscriptionId?: BoolWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  userId?: StringNullableWithAggregatesFilter
}
