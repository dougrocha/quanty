import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFilter } from '../prisma/string-filter.input'
import { EnumSubscription_statusFilter } from '../prisma/enum-subscription-status-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'
import { BoolFilter } from '../prisma/bool-filter.input'

@InputType()
export class SubscriptionScalarWhereInput {
  @Field(() => [SubscriptionScalarWhereInput], { nullable: true })
  AND?: Array<SubscriptionScalarWhereInput>

  @Field(() => [SubscriptionScalarWhereInput], { nullable: true })
  OR?: Array<SubscriptionScalarWhereInput>

  @Field(() => [SubscriptionScalarWhereInput], { nullable: true })
  NOT?: Array<SubscriptionScalarWhereInput>

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter

  @Field(() => EnumSubscription_statusFilter, { nullable: true })
  status?: EnumSubscription_statusFilter

  @Field(() => DateTimeFilter, { nullable: true })
  current_period_end?: DateTimeFilter

  @Field(() => BoolFilter, { nullable: true })
  cancel_at_period_end?: BoolFilter

  @Field(() => StringFilter, { nullable: true })
  guildId?: StringFilter

  @Field(() => StringFilter, { nullable: true })
  customerId?: StringFilter

  @Field(() => StringFilter, { nullable: true })
  priceId?: StringFilter
}
