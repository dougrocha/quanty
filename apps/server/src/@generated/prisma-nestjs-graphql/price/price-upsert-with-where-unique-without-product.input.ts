import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { PriceWhereUniqueInput } from './price-where-unique.input'
import { Type } from 'class-transformer'
import { PriceUpdateWithoutProductInput } from './price-update-without-product.input'
import { PriceCreateWithoutProductInput } from './price-create-without-product.input'

@InputType()
export class PriceUpsertWithWhereUniqueWithoutProductInput {
  @Field(() => PriceWhereUniqueInput, { nullable: false })
  @Type(() => PriceWhereUniqueInput)
  where!: PriceWhereUniqueInput

  @Field(() => PriceUpdateWithoutProductInput, { nullable: false })
  @Type(() => PriceUpdateWithoutProductInput)
  update!: PriceUpdateWithoutProductInput

  @Field(() => PriceCreateWithoutProductInput, { nullable: false })
  @Type(() => PriceCreateWithoutProductInput)
  create!: PriceCreateWithoutProductInput
}
