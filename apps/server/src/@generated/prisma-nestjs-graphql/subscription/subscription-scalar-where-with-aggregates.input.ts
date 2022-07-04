import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { EnumSubscription_statusWithAggregatesFilter } from '../prisma/enum-subscription-status-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input'

@InputType()
export class SubscriptionScalarWhereWithAggregatesInput {
  @Field(() => [SubscriptionScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<SubscriptionScalarWhereWithAggregatesInput>

  @Field(() => [SubscriptionScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<SubscriptionScalarWhereWithAggregatesInput>

  @Field(() => [SubscriptionScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<SubscriptionScalarWhereWithAggregatesInput>

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter

  @Field(() => EnumSubscription_statusWithAggregatesFilter, { nullable: true })
  status?: EnumSubscription_statusWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  current_period_end?: DateTimeWithAggregatesFilter

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  cancel_at_period_end?: BoolWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  guildId?: StringWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  customerId?: StringWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  priceId?: StringWithAggregatesFilter
}
