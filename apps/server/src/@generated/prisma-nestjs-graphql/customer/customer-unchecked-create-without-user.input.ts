import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import * as Validator from 'class-validator'
import { GuildSubscriptionUncheckedCreateNestedManyWithoutCustomerInput } from '../guild-subscription/guild-subscription-unchecked-create-nested-many-without-customer.input'

@InputType()
export class CustomerUncheckedCreateWithoutUserInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: true })
  @Validator.IsEmail()
  email?: string

  @Field(() => Boolean, { nullable: true })
  subscriptionId?: boolean

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => GuildSubscriptionUncheckedCreateNestedManyWithoutCustomerInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionUncheckedCreateNestedManyWithoutCustomerInput
}
