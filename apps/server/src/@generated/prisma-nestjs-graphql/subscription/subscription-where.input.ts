import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFilter } from '../prisma/string-filter.input'
import { EnumSubscription_statusFilter } from '../prisma/enum-subscription-status-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'
import { BoolFilter } from '../prisma/bool-filter.input'
import { GuildWhereInput } from '../guild/guild-where.input'
import { CustomerWhereInput } from '../customer/customer-where.input'
import { PriceWhereInput } from '../price/price-where.input'

@InputType()
export class SubscriptionWhereInput {
  @Field(() => [SubscriptionWhereInput], { nullable: true })
  AND?: Array<SubscriptionWhereInput>

  @Field(() => [SubscriptionWhereInput], { nullable: true })
  OR?: Array<SubscriptionWhereInput>

  @Field(() => [SubscriptionWhereInput], { nullable: true })
  NOT?: Array<SubscriptionWhereInput>

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter

  @Field(() => EnumSubscription_statusFilter, { nullable: true })
  status?: EnumSubscription_statusFilter

  @Field(() => DateTimeFilter, { nullable: true })
  current_period_end?: DateTimeFilter

  @Field(() => BoolFilter, { nullable: true })
  cancel_at_period_end?: BoolFilter

  @Field(() => GuildWhereInput, { nullable: true })
  guild?: GuildWhereInput

  @Field(() => StringFilter, { nullable: true })
  guildId?: StringFilter

  @Field(() => CustomerWhereInput, { nullable: true })
  customer?: CustomerWhereInput

  @Field(() => StringFilter, { nullable: true })
  customerId?: StringFilter

  @Field(() => PriceWhereInput, { nullable: true })
  price?: PriceWhereInput

  @Field(() => StringFilter, { nullable: true })
  priceId?: StringFilter
}
