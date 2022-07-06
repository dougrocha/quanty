import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { GuildSubscriptionUpdateOneWithoutGuildInput } from '../guild-subscription/guild-subscription-update-one-without-guild.input'
import { GuildPluginsUpdateOneWithoutGuildInput } from '../guild-plugins/guild-plugins-update-one-without-guild.input'

@InputType()
export class GuildUpdateWithoutGuildSettingsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  premium?: BoolFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  prefix?: StringFieldUpdateOperationsInput

  @Field(() => GuildSubscriptionUpdateOneWithoutGuildInput, { nullable: true })
  subscription?: GuildSubscriptionUpdateOneWithoutGuildInput

  @Field(() => GuildPluginsUpdateOneWithoutGuildInput, { nullable: true })
  guildPlugins?: GuildPluginsUpdateOneWithoutGuildInput
}
