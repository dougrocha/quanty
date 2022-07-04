import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { PriceCreateManyProductInput } from './price-create-many-product.input'
import { Type } from 'class-transformer'

@InputType()
export class PriceCreateManyProductInputEnvelope {
  @Field(() => [PriceCreateManyProductInput], { nullable: false })
  @Type(() => PriceCreateManyProductInput)
  data!: Array<PriceCreateManyProductInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
