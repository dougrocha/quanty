import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input'
import { GuildSubscriptionUncheckedUpdateOneWithoutGuildNestedInput } from '../guild-subscription/guild-subscription-unchecked-update-one-without-guild-nested.input'
import { GuildPluginsUncheckedUpdateOneWithoutGuildNestedInput } from '../guild-plugins/guild-plugins-unchecked-update-one-without-guild-nested.input'

@InputType()
export class GuildUncheckedUpdateWithoutGuildSettingsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  premium?: BoolFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  prefix?: StringFieldUpdateOperationsInput

  @Field(() => GuildSubscriptionUncheckedUpdateOneWithoutGuildNestedInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionUncheckedUpdateOneWithoutGuildNestedInput

  @Field(() => GuildPluginsUncheckedUpdateOneWithoutGuildNestedInput, {
    nullable: true,
  })
  guildPlugins?: GuildPluginsUncheckedUpdateOneWithoutGuildNestedInput
}
