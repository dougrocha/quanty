import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import * as Validator from 'class-validator'
import { UserCreateNestedOneWithoutCustomerInput } from '../user/user-create-nested-one-without-customer.input'

@InputType()
export class CustomerCreateWithoutSubscriptionInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: true })
  @Validator.IsEmail()
  email?: string

  @Field(() => Boolean, { nullable: true })
  subscriptionId?: boolean

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => UserCreateNestedOneWithoutCustomerInput, { nullable: true })
  user?: UserCreateNestedOneWithoutCustomerInput
}
