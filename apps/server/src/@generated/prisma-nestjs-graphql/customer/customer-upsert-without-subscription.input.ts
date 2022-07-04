import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { CustomerUpdateWithoutSubscriptionInput } from './customer-update-without-subscription.input'
import { Type } from 'class-transformer'
import { CustomerCreateWithoutSubscriptionInput } from './customer-create-without-subscription.input'

@InputType()
export class CustomerUpsertWithoutSubscriptionInput {
  @Field(() => CustomerUpdateWithoutSubscriptionInput, { nullable: false })
  @Type(() => CustomerUpdateWithoutSubscriptionInput)
  update!: CustomerUpdateWithoutSubscriptionInput

  @Field(() => CustomerCreateWithoutSubscriptionInput, { nullable: false })
  @Type(() => CustomerCreateWithoutSubscriptionInput)
  create!: CustomerCreateWithoutSubscriptionInput
}
