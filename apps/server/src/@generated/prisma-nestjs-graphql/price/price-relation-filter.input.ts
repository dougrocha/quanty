import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { PriceWhereInput } from './price-where.input'

@InputType()
export class PriceRelationFilter {
  @Field(() => PriceWhereInput, { nullable: true })
  is?: PriceWhereInput

  @Field(() => PriceWhereInput, { nullable: true })
  isNot?: PriceWhereInput
}
