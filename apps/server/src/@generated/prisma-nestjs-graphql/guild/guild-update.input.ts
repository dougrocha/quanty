import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { GuildSubscriptionUpdateOneWithoutGuildNestedInput } from '../guild-subscription/guild-subscription-update-one-without-guild-nested.input'
import { GuildSettingsUpdateOneWithoutGuildNestedInput } from '../guild-settings/guild-settings-update-one-without-guild-nested.input'
import { GuildPluginsUpdateOneWithoutGuildNestedInput } from '../guild-plugins/guild-plugins-update-one-without-guild-nested.input'

@InputType()
export class GuildUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  premium?: BoolFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  prefix?: StringFieldUpdateOperationsInput

  @Field(() => GuildSubscriptionUpdateOneWithoutGuildNestedInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionUpdateOneWithoutGuildNestedInput

  @Field(() => GuildSettingsUpdateOneWithoutGuildNestedInput, {
    nullable: true,
  })
  guildSettings?: GuildSettingsUpdateOneWithoutGuildNestedInput

  @Field(() => GuildPluginsUpdateOneWithoutGuildNestedInput, { nullable: true })
  guildPlugins?: GuildPluginsUpdateOneWithoutGuildNestedInput
}
