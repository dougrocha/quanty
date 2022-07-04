import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input'
import { Type } from 'class-transformer'
import { SubscriptionUpdateWithoutCustomerInput } from './subscription-update-without-customer.input'
import { SubscriptionCreateWithoutCustomerInput } from './subscription-create-without-customer.input'

@InputType()
export class SubscriptionUpsertWithWhereUniqueWithoutCustomerInput {
  @Field(() => SubscriptionWhereUniqueInput, { nullable: false })
  @Type(() => SubscriptionWhereUniqueInput)
  where!: SubscriptionWhereUniqueInput

  @Field(() => SubscriptionUpdateWithoutCustomerInput, { nullable: false })
  @Type(() => SubscriptionUpdateWithoutCustomerInput)
  update!: SubscriptionUpdateWithoutCustomerInput

  @Field(() => SubscriptionCreateWithoutCustomerInput, { nullable: false })
  @Type(() => SubscriptionCreateWithoutCustomerInput)
  create!: SubscriptionCreateWithoutCustomerInput
}
