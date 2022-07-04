import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Subscription_status } from './subscription-status.enum'
import { NestedIntFilter } from './nested-int-filter.input'
import { NestedEnumSubscription_statusFilter } from './nested-enum-subscription-status-filter.input'

@InputType()
export class NestedEnumSubscription_statusWithAggregatesFilter {
  @Field(() => Subscription_status, { nullable: true })
  equals?: keyof typeof Subscription_status;

  @Field(() => [Subscription_status], { nullable: true })
  in?: Array<keyof typeof Subscription_status>

  @Field(() => [Subscription_status], { nullable: true })
  notIn?: Array<keyof typeof Subscription_status>

  @Field(() => NestedEnumSubscription_statusWithAggregatesFilter, {
    nullable: true,
  })
  not?: NestedEnumSubscription_statusWithAggregatesFilter

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter

  @Field(() => NestedEnumSubscription_statusFilter, { nullable: true })
  _min?: NestedEnumSubscription_statusFilter

  @Field(() => NestedEnumSubscription_statusFilter, { nullable: true })
  _max?: NestedEnumSubscription_statusFilter
}
