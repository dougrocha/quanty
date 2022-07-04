import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'
import { EnumPriceTypeFieldUpdateOperationsInput } from '../prisma/enum-price-type-field-update-operations.input'
import { ProductUpdateOneRequiredWithoutPriceNestedInput } from '../product/product-update-one-required-without-price-nested.input'

@InputType()
export class PriceUpdateWithoutSubscriptionInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  recurringInterval?: NullableStringFieldUpdateOperationsInput

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  unit_amount?: IntFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  currency?: StringFieldUpdateOperationsInput

  @Field(() => EnumPriceTypeFieldUpdateOperationsInput, { nullable: true })
  type?: EnumPriceTypeFieldUpdateOperationsInput

  @Field(() => ProductUpdateOneRequiredWithoutPriceNestedInput, {
    nullable: true,
  })
  product?: ProductUpdateOneRequiredWithoutPriceNestedInput
}
