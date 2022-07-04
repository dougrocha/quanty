import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { PriceScalarWhereInput } from './price-scalar-where.input'
import { Type } from 'class-transformer'
import { PriceUpdateManyMutationInput } from './price-update-many-mutation.input'

@InputType()
export class PriceUpdateManyWithWhereWithoutProductInput {
  @Field(() => PriceScalarWhereInput, { nullable: false })
  @Type(() => PriceScalarWhereInput)
  where!: PriceScalarWhereInput

  @Field(() => PriceUpdateManyMutationInput, { nullable: false })
  @Type(() => PriceUpdateManyMutationInput)
  data!: PriceUpdateManyMutationInput
}
