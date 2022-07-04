import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { GuildSubscriptionUncheckedUpdateManyWithoutCustomerNestedInput } from '../guild-subscription/guild-subscription-unchecked-update-many-without-customer-nested.input'

@InputType()
export class CustomerUncheckedUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  email?: NullableStringFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  subscriptionId?: BoolFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  userId?: NullableStringFieldUpdateOperationsInput

  @Field(() => GuildSubscriptionUncheckedUpdateManyWithoutCustomerNestedInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionUncheckedUpdateManyWithoutCustomerNestedInput
}
