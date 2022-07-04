import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SubscriptionCreateManyCustomerInput } from './subscription-create-many-customer.input'
import { Type } from 'class-transformer'

@InputType()
export class SubscriptionCreateManyCustomerInputEnvelope {
  @Field(() => [SubscriptionCreateManyCustomerInput], { nullable: false })
  @Type(() => SubscriptionCreateManyCustomerInput)
  data!: Array<SubscriptionCreateManyCustomerInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
