import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { CustomerCreateWithoutSubscriptionInput } from './customer-create-without-subscription.input'
import { Type } from 'class-transformer'
import { CustomerCreateOrConnectWithoutSubscriptionInput } from './customer-create-or-connect-without-subscription.input'
import { CustomerWhereUniqueInput } from './customer-where-unique.input'

@InputType()
export class CustomerCreateNestedOneWithoutSubscriptionInput {
  @Field(() => CustomerCreateWithoutSubscriptionInput, { nullable: true })
  @Type(() => CustomerCreateWithoutSubscriptionInput)
  create?: CustomerCreateWithoutSubscriptionInput

  @Field(() => CustomerCreateOrConnectWithoutSubscriptionInput, {
    nullable: true,
  })
  @Type(() => CustomerCreateOrConnectWithoutSubscriptionInput)
  connectOrCreate?: CustomerCreateOrConnectWithoutSubscriptionInput

  @Field(() => CustomerWhereUniqueInput, { nullable: true })
  @Type(() => CustomerWhereUniqueInput)
  connect?: CustomerWhereUniqueInput
}
