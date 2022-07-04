import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import * as Validator from 'class-validator'

@InputType()
export class CustomerCreateManyInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: true })
  @Validator.IsEmail()
  email?: string

  @Field(() => Boolean, { nullable: true })
  subscriptionId?: boolean

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => String, { nullable: true })
  userId?: string
}
