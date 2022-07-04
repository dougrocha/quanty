import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { PriceCreateNestedManyWithoutProductInput } from '../price/price-create-nested-many-without-product.input'

@InputType()
export class ProductCreateInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => PriceCreateNestedManyWithoutProductInput, { nullable: true })
  price?: PriceCreateNestedManyWithoutProductInput
}
