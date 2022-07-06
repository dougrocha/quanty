import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'
import { EnumPriceTypeFieldUpdateOperationsInput } from '../prisma/enum-price-type-field-update-operations.input'
import { ProductUpdateOneRequiredWithoutPriceInput } from '../product/product-update-one-required-without-price.input'
import { GuildSubscriptionUpdateManyWithoutPriceInput } from '../guild-subscription/guild-subscription-update-many-without-price.input'

@InputType()
export class PriceUpdateInput {
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

  @Field(() => ProductUpdateOneRequiredWithoutPriceInput, { nullable: true })
  product?: ProductUpdateOneRequiredWithoutPriceInput

  @Field(() => GuildSubscriptionUpdateManyWithoutPriceInput, { nullable: true })
  subscription?: GuildSubscriptionUpdateManyWithoutPriceInput
}
