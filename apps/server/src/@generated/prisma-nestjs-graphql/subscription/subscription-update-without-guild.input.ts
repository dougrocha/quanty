import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { EnumSubscription_statusFieldUpdateOperationsInput } from '../prisma/enum-subscription-status-field-update-operations.input'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { CustomerUpdateOneRequiredWithoutSubscriptionNestedInput } from '../customer/customer-update-one-required-without-subscription-nested.input'
import { PriceUpdateOneRequiredWithoutSubscriptionNestedInput } from '../price/price-update-one-required-without-subscription-nested.input'

@InputType()
export class SubscriptionUpdateWithoutGuildInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => EnumSubscription_statusFieldUpdateOperationsInput, {
    nullable: true,
  })
  status?: EnumSubscription_statusFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  current_period_end?: DateTimeFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  cancel_at_period_end?: BoolFieldUpdateOperationsInput

  @Field(() => CustomerUpdateOneRequiredWithoutSubscriptionNestedInput, {
    nullable: true,
  })
  customer?: CustomerUpdateOneRequiredWithoutSubscriptionNestedInput

  @Field(() => PriceUpdateOneRequiredWithoutSubscriptionNestedInput, {
    nullable: true,
  })
  price?: PriceUpdateOneRequiredWithoutSubscriptionNestedInput
}
