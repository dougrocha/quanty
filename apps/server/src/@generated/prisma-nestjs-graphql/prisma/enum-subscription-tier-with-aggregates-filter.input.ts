import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Subscription_tier } from './subscription-tier.enum'
import { NestedEnumSubscription_tierWithAggregatesFilter } from './nested-enum-subscription-tier-with-aggregates-filter.input'
import { NestedIntFilter } from './nested-int-filter.input'
import { NestedEnumSubscription_tierFilter } from './nested-enum-subscription-tier-filter.input'

@InputType()
export class EnumSubscription_tierWithAggregatesFilter {
  @Field(() => Subscription_tier, { nullable: true })
  equals?: keyof typeof Subscription_tier;

  @Field(() => [Subscription_tier], { nullable: true })
  in?: Array<keyof typeof Subscription_tier>

  @Field(() => [Subscription_tier], { nullable: true })
  notIn?: Array<keyof typeof Subscription_tier>

  @Field(() => NestedEnumSubscription_tierWithAggregatesFilter, {
    nullable: true,
  })
  not?: NestedEnumSubscription_tierWithAggregatesFilter

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter

  @Field(() => NestedEnumSubscription_tierFilter, { nullable: true })
  _min?: NestedEnumSubscription_tierFilter

  @Field(() => NestedEnumSubscription_tierFilter, { nullable: true })
  _max?: NestedEnumSubscription_tierFilter
}
