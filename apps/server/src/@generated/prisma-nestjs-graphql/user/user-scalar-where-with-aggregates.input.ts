import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input'

@InputType()
export class UserScalarWhereWithAggregatesInput {
  @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<UserScalarWhereWithAggregatesInput>

  @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<UserScalarWhereWithAggregatesInput>

  @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<UserScalarWhereWithAggregatesInput>

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  username?: StringWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  discriminator?: StringWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  email?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  avatar?: StringNullableWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  locale?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  accessToken?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  refreshToken?: StringNullableWithAggregatesFilter

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  acceptedTermsAndConditions?: BoolWithAggregatesFilter
}
