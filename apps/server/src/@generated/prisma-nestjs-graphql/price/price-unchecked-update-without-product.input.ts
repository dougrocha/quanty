import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'
import { EnumPriceTypeFieldUpdateOperationsInput } from '../prisma/enum-price-type-field-update-operations.input'
import { GuildSubscriptionUncheckedUpdateManyWithoutPriceNestedInput } from '../guild-subscription/guild-subscription-unchecked-update-many-without-price-nested.input'

@InputType()
export class PriceUncheckedUpdateWithoutProductInput {
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

  @Field(() => GuildSubscriptionUncheckedUpdateManyWithoutPriceNestedInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionUncheckedUpdateManyWithoutPriceNestedInput
}
