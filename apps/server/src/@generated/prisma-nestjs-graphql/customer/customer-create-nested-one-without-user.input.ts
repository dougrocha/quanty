import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { CustomerCreateWithoutUserInput } from './customer-create-without-user.input'
import { Type } from 'class-transformer'
import { CustomerCreateOrConnectWithoutUserInput } from './customer-create-or-connect-without-user.input'
import { CustomerWhereUniqueInput } from './customer-where-unique.input'

@InputType()
export class CustomerCreateNestedOneWithoutUserInput {
  @Field(() => CustomerCreateWithoutUserInput, { nullable: true })
  @Type(() => CustomerCreateWithoutUserInput)
  create?: CustomerCreateWithoutUserInput

  @Field(() => CustomerCreateOrConnectWithoutUserInput, { nullable: true })
  @Type(() => CustomerCreateOrConnectWithoutUserInput)
  connectOrCreate?: CustomerCreateOrConnectWithoutUserInput

  @Field(() => CustomerWhereUniqueInput, { nullable: true })
  @Type(() => CustomerWhereUniqueInput)
  connect?: CustomerWhereUniqueInput
}
