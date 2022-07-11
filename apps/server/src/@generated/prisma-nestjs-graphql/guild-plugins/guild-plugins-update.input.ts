import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { GuildUpdateOneRequiredWithoutGuildPluginsInput } from '../guild/guild-update-one-required-without-guild-plugins.input'

@InputType()
export class GuildPluginsUpdateInput {
  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  autoMod?: BoolFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  anime?: BoolFieldUpdateOperationsInput

  @Field(() => GuildUpdateOneRequiredWithoutGuildPluginsInput, {
    nullable: true,
  })
  guild?: GuildUpdateOneRequiredWithoutGuildPluginsInput
}
