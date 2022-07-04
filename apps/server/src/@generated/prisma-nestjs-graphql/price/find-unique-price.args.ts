import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { PriceWhereUniqueInput } from './price-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniquePriceArgs {
  @Field(() => PriceWhereUniqueInput, { nullable: false })
  @Type(() => PriceWhereUniqueInput)
  where!: PriceWhereUniqueInput
}
