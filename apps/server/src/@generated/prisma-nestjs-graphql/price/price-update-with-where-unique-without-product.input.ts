import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { PriceWhereUniqueInput } from './price-where-unique.input'
import { Type } from 'class-transformer'
import { PriceUpdateWithoutProductInput } from './price-update-without-product.input'

@InputType()
export class PriceUpdateWithWhereUniqueWithoutProductInput {
  @Field(() => PriceWhereUniqueInput, { nullable: false })
  @Type(() => PriceWhereUniqueInput)
  where!: PriceWhereUniqueInput

  @Field(() => PriceUpdateWithoutProductInput, { nullable: false })
  @Type(() => PriceUpdateWithoutProductInput)
  data!: PriceUpdateWithoutProductInput
}
