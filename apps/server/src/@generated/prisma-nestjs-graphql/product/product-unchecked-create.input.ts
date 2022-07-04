import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { PriceUncheckedCreateNestedManyWithoutProductInput } from '../price/price-unchecked-create-nested-many-without-product.input'

@InputType()
export class ProductUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => PriceUncheckedCreateNestedManyWithoutProductInput, {
    nullable: true,
  })
  price?: PriceUncheckedCreateNestedManyWithoutProductInput
}
