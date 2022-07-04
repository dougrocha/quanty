import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Subscription_status } from './subscription-status.enum'

@InputType()
export class NestedEnumSubscription_statusFilter {
  @Field(() => Subscription_status, { nullable: true })
  equals?: keyof typeof Subscription_status;

  @Field(() => [Subscription_status], { nullable: true })
  in?: Array<keyof typeof Subscription_status>

  @Field(() => [Subscription_status], { nullable: true })
  notIn?: Array<keyof typeof Subscription_status>

  @Field(() => NestedEnumSubscription_statusFilter, { nullable: true })
  not?: NestedEnumSubscription_statusFilter
}
