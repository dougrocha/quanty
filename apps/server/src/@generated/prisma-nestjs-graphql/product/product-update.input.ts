import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { PriceUpdateManyWithoutProductNestedInput } from '../price/price-update-many-without-product-nested.input'

@InputType()
export class ProductUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  description?: NullableStringFieldUpdateOperationsInput

  @Field(() => PriceUpdateManyWithoutProductNestedInput, { nullable: true })
  price?: PriceUpdateManyWithoutProductNestedInput
}
