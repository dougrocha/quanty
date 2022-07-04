import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Subscription_status } from '../prisma/subscription-status.enum'
import { SubscriptionCountAggregate } from './subscription-count-aggregate.output'
import { SubscriptionMinAggregate } from './subscription-min-aggregate.output'
import { SubscriptionMaxAggregate } from './subscription-max-aggregate.output'

@ObjectType()
export class SubscriptionGroupBy {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => Subscription_status, { nullable: false })
  status!: keyof typeof Subscription_status

  @Field(() => Date, { nullable: false })
  current_period_end!: Date | string

  @Field(() => Boolean, { nullable: false })
  cancel_at_period_end!: boolean

  @Field(() => String, { nullable: false })
  guildId!: string

  @Field(() => String, { nullable: false })
  customerId!: string

  @Field(() => String, { nullable: false })
  priceId!: string

  @Field(() => SubscriptionCountAggregate, { nullable: true })
  _count?: SubscriptionCountAggregate

  @Field(() => SubscriptionMinAggregate, { nullable: true })
  _min?: SubscriptionMinAggregate

  @Field(() => SubscriptionMaxAggregate, { nullable: true })
  _max?: SubscriptionMaxAggregate
}
