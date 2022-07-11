import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { GuildSettingsUpdateOneWithoutGuildInput } from '../guild-settings/guild-settings-update-one-without-guild.input'
import { GuildPluginsUpdateOneWithoutGuildInput } from '../guild-plugins/guild-plugins-update-one-without-guild.input'

@InputType()
export class GuildUpdateWithoutSubscriptionInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  premium?: BoolFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  prefix?: StringFieldUpdateOperationsInput

  @Field(() => GuildSettingsUpdateOneWithoutGuildInput, { nullable: true })
  guildSettings?: GuildSettingsUpdateOneWithoutGuildInput

  @Field(() => GuildPluginsUpdateOneWithoutGuildInput, { nullable: true })
  guildPlugins?: GuildPluginsUpdateOneWithoutGuildInput
}
