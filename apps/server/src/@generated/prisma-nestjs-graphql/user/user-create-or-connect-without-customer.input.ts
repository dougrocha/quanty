import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { UserWhereUniqueInput } from './user-where-unique.input'
import { Type } from 'class-transformer'
import { UserCreateWithoutCustomerInput } from './user-create-without-customer.input'

@InputType()
export class UserCreateOrConnectWithoutCustomerInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput

  @Field(() => UserCreateWithoutCustomerInput, { nullable: false })
  @Type(() => UserCreateWithoutCustomerInput)
  create!: UserCreateWithoutCustomerInput
}
