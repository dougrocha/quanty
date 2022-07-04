import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import * as Validator from 'class-validator'
import { GuildSubscriptionCreateNestedManyWithoutCustomerInput } from '../guild-subscription/guild-subscription-create-nested-many-without-customer.input'

@InputType()
export class CustomerCreateWithoutUserInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: true })
  @Validator.IsEmail()
  email?: string

  @Field(() => Boolean, { nullable: true })
  subscriptionId?: boolean

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => GuildSubscriptionCreateNestedManyWithoutCustomerInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionCreateNestedManyWithoutCustomerInput
}
