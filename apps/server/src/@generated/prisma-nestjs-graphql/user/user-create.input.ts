import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import * as Validator from 'class-validator'
import { CustomerCreateNestedOneWithoutUserInput } from '../customer/customer-create-nested-one-without-user.input'

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  username!: string

  @Field(() => String, { nullable: false })
  discriminator!: string

  @Field(() => String, { nullable: true })
  @Validator.IsEmail()
  email?: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => String, { nullable: true })
  locale?: string

  @Field(() => String, { nullable: true })
  accessToken?: string

  @Field(() => String, { nullable: true })
  refreshToken?: string

  @Field(() => Boolean, { nullable: true })
  acceptedTermsAndConditions?: boolean

  @Field(() => CustomerCreateNestedOneWithoutUserInput, { nullable: true })
  customer?: CustomerCreateNestedOneWithoutUserInput
}
