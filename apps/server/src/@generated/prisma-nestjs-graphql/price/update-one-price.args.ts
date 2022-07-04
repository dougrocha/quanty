import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { PriceUpdateInput } from './price-update.input'
import { Type } from 'class-transformer'
import { PriceWhereUniqueInput } from './price-where-unique.input'

@ArgsType()
export class UpdateOnePriceArgs {
  @Field(() => PriceUpdateInput, { nullable: false })
  @Type(() => PriceUpdateInput)
  data!: PriceUpdateInput

  @Field(() => PriceWhereUniqueInput, { nullable: false })
  @Type(() => PriceWhereUniqueInput)
  where!: PriceWhereUniqueInput
}
