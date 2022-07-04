import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { CustomerWhereUniqueInput } from './customer-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteOneCustomerArgs {
  @Field(() => CustomerWhereUniqueInput, { nullable: false })
  @Type(() => CustomerWhereUniqueInput)
  where!: CustomerWhereUniqueInput
}
