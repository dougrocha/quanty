import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'

@InputType()
export class GuildSettingsUncheckedUpdateWithoutGuildInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  defaultJoinRole?: StringFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  nsfw?: BoolFieldUpdateOperationsInput

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  globalCooldown?: IntFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  djRole?: StringFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  musicTimeOut?: BoolFieldUpdateOperationsInput
}
