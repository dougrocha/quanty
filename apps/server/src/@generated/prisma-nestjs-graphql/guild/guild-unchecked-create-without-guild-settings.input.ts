import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildSubscriptionUncheckedCreateNestedOneWithoutGuildInput } from '../guild-subscription/guild-subscription-unchecked-create-nested-one-without-guild.input'
import { GuildPluginsUncheckedCreateNestedOneWithoutGuildInput } from '../guild-plugins/guild-plugins-unchecked-create-nested-one-without-guild.input'

@InputType()
export class GuildUncheckedCreateWithoutGuildSettingsInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => Boolean, { nullable: true })
  premium?: boolean

  @Field(() => String, { nullable: true })
  prefix?: string

  @Field(() => GuildSubscriptionUncheckedCreateNestedOneWithoutGuildInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionUncheckedCreateNestedOneWithoutGuildInput

  @Field(() => GuildPluginsUncheckedCreateNestedOneWithoutGuildInput, {
    nullable: true,
  })
  guildPlugins?: GuildPluginsUncheckedCreateNestedOneWithoutGuildInput
}
