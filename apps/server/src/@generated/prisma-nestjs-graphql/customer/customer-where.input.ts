import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFilter } from '../prisma/string-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { BoolFilter } from '../prisma/bool-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'
import { UserWhereInput } from '../user/user-where.input'
import { GuildSubscriptionListRelationFilter } from '../guild-subscription/guild-subscription-list-relation-filter.input'

@InputType()
export class CustomerWhereInput {
  @Field(() => [CustomerWhereInput], { nullable: true })
  AND?: Array<CustomerWhereInput>

  @Field(() => [CustomerWhereInput], { nullable: true })
  OR?: Array<CustomerWhereInput>

  @Field(() => [CustomerWhereInput], { nullable: true })
  NOT?: Array<CustomerWhereInput>

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter

  @Field(() => StringNullableFilter, { nullable: true })
  email?: StringNullableFilter

  @Field(() => BoolFilter, { nullable: true })
  subscriptionId?: BoolFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => UserWhereInput, { nullable: true })
  user?: UserWhereInput

  @Field(() => StringNullableFilter, { nullable: true })
  userId?: StringNullableFilter

  @Field(() => GuildSubscriptionListRelationFilter, { nullable: true })
  subscription?: GuildSubscriptionListRelationFilter
}
