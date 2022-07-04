import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input'
import { Type } from 'class-transformer'
import { SubscriptionUpdateWithoutCustomerInput } from './subscription-update-without-customer.input'

@InputType()
export class SubscriptionUpdateWithWhereUniqueWithoutCustomerInput {
  @Field(() => SubscriptionWhereUniqueInput, { nullable: false })
  @Type(() => SubscriptionWhereUniqueInput)
  where!: SubscriptionWhereUniqueInput

  @Field(() => SubscriptionUpdateWithoutCustomerInput, { nullable: false })
  @Type(() => SubscriptionUpdateWithoutCustomerInput)
  data!: SubscriptionUpdateWithoutCustomerInput
}
