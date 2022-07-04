import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { PriceUncheckedUpdateManyWithoutProductNestedInput } from '../price/price-unchecked-update-many-without-product-nested.input'

@InputType()
export class ProductUncheckedUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  description?: NullableStringFieldUpdateOperationsInput

  @Field(() => PriceUncheckedUpdateManyWithoutProductNestedInput, {
    nullable: true,
  })
  price?: PriceUncheckedUpdateManyWithoutProductNestedInput
}
