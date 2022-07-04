import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { CustomerUncheckedUpdateOneWithoutUserNestedInput } from '../customer/customer-unchecked-update-one-without-user-nested.input'

@InputType()
export class UserUncheckedUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  username?: StringFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  discriminator?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  email?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  avatar?: NullableStringFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  locale?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  accessToken?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  refreshToken?: NullableStringFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  acceptedTermsAndConditions?: BoolFieldUpdateOperationsInput

  @Field(() => CustomerUncheckedUpdateOneWithoutUserNestedInput, {
    nullable: true,
  })
  customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
}
