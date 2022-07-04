import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildSubscriptionCreateNestedOneWithoutGuildInput } from '../guild-subscription/guild-subscription-create-nested-one-without-guild.input'
import { GuildPluginsCreateNestedOneWithoutGuildInput } from '../guild-plugins/guild-plugins-create-nested-one-without-guild.input'

@InputType()
export class GuildCreateWithoutGuildSettingsInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => Boolean, { nullable: true })
  premium?: boolean

  @Field(() => String, { nullable: true })
  prefix?: string

  @Field(() => GuildSubscriptionCreateNestedOneWithoutGuildInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionCreateNestedOneWithoutGuildInput

  @Field(() => GuildPluginsCreateNestedOneWithoutGuildInput, { nullable: true })
  guildPlugins?: GuildPluginsCreateNestedOneWithoutGuildInput
}
