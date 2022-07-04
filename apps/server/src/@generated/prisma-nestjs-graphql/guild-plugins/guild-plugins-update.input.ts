import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { GuildUpdateOneRequiredWithoutGuildPluginsNestedInput } from '../guild/guild-update-one-required-without-guild-plugins-nested.input'

@InputType()
export class GuildPluginsUpdateInput {
  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  autoMod?: BoolFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  anime?: BoolFieldUpdateOperationsInput

  @Field(() => GuildUpdateOneRequiredWithoutGuildPluginsNestedInput, {
    nullable: true,
  })
  guild?: GuildUpdateOneRequiredWithoutGuildPluginsNestedInput
}
