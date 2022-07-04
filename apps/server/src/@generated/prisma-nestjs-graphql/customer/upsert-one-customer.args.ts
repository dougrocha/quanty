import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { CustomerWhereUniqueInput } from './customer-where-unique.input'
import { Type } from 'class-transformer'
import { CustomerCreateInput } from './customer-create.input'
import { CustomerUpdateInput } from './customer-update.input'

@ArgsType()
export class UpsertOneCustomerArgs {
  @Field(() => CustomerWhereUniqueInput, { nullable: false })
  @Type(() => CustomerWhereUniqueInput)
  where!: CustomerWhereUniqueInput

  @Field(() => CustomerCreateInput, { nullable: false })
  @Type(() => CustomerCreateInput)
  create!: CustomerCreateInput

  @Field(() => CustomerUpdateInput, { nullable: false })
  @Type(() => CustomerUpdateInput)
  update!: CustomerUpdateInput
}
