import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Subscription_status } from '../prisma/subscription-status.enum'
import { GuildCreateNestedOneWithoutSubscriptionInput } from '../guild/guild-create-nested-one-without-subscription.input'
import { PriceCreateNestedOneWithoutSubscriptionInput } from '../price/price-create-nested-one-without-subscription.input'

@InputType()
export class SubscriptionCreateWithoutCustomerInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => Subscription_status, { nullable: true })
  status?: keyof typeof Subscription_status

  @Field(() => Date, { nullable: false })
  current_period_end!: Date | string

  @Field(() => Boolean, { nullable: true })
  cancel_at_period_end?: boolean

  @Field(() => GuildCreateNestedOneWithoutSubscriptionInput, {
    nullable: false,
  })
  guild!: GuildCreateNestedOneWithoutSubscriptionInput

  @Field(() => PriceCreateNestedOneWithoutSubscriptionInput, {
    nullable: false,
  })
  price!: PriceCreateNestedOneWithoutSubscriptionInput
}
