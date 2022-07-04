import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { ProductCreateWithoutPriceInput } from './product-create-without-price.input'
import { Type } from 'class-transformer'
import { ProductCreateOrConnectWithoutPriceInput } from './product-create-or-connect-without-price.input'
import { ProductUpsertWithoutPriceInput } from './product-upsert-without-price.input'
import { ProductWhereUniqueInput } from './product-where-unique.input'
import { ProductUpdateWithoutPriceInput } from './product-update-without-price.input'

@InputType()
export class ProductUpdateOneRequiredWithoutPriceInput {
  @Field(() => ProductCreateWithoutPriceInput, { nullable: true })
  @Type(() => ProductCreateWithoutPriceInput)
  create?: ProductCreateWithoutPriceInput

  @Field(() => ProductCreateOrConnectWithoutPriceInput, { nullable: true })
  @Type(() => ProductCreateOrConnectWithoutPriceInput)
  connectOrCreate?: ProductCreateOrConnectWithoutPriceInput

  @Field(() => ProductUpsertWithoutPriceInput, { nullable: true })
  @Type(() => ProductUpsertWithoutPriceInput)
  upsert?: ProductUpsertWithoutPriceInput

  @Field(() => ProductWhereUniqueInput, { nullable: true })
  @Type(() => ProductWhereUniqueInput)
  connect?: ProductWhereUniqueInput

  @Field(() => ProductUpdateWithoutPriceInput, { nullable: true })
  @Type(() => ProductUpdateWithoutPriceInput)
  update?: ProductUpdateWithoutPriceInput
}
