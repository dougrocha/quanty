import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildSettingsCreateNestedOneWithoutGuildInput } from '../guild-settings/guild-settings-create-nested-one-without-guild.input'
import { GuildPluginsCreateNestedOneWithoutGuildInput } from '../guild-plugins/guild-plugins-create-nested-one-without-guild.input'

@InputType()
export class GuildCreateWithoutSubscriptionInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => Boolean, { nullable: true })
  premium?: boolean

  @Field(() => String, { nullable: true })
  prefix?: string

  @Field(() => GuildSettingsCreateNestedOneWithoutGuildInput, {
    nullable: true,
  })
  guildSettings?: GuildSettingsCreateNestedOneWithoutGuildInput

  @Field(() => GuildPluginsCreateNestedOneWithoutGuildInput, { nullable: true })
  guildPlugins?: GuildPluginsCreateNestedOneWithoutGuildInput
}
