import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildSettingsCreateWithoutGuildInput } from './guild-settings-create-without-guild.input'
import { Type } from 'class-transformer'
import { GuildSettingsCreateOrConnectWithoutGuildInput } from './guild-settings-create-or-connect-without-guild.input'
import { GuildSettingsWhereUniqueInput } from './guild-settings-where-unique.input'

@InputType()
export class GuildSettingsCreateNestedOneWithoutGuildInput {
  @Field(() => GuildSettingsCreateWithoutGuildInput, { nullable: true })
  @Type(() => GuildSettingsCreateWithoutGuildInput)
  create?: GuildSettingsCreateWithoutGuildInput

  @Field(() => GuildSettingsCreateOrConnectWithoutGuildInput, {
    nullable: true,
  })
  @Type(() => GuildSettingsCreateOrConnectWithoutGuildInput)
  connectOrCreate?: GuildSettingsCreateOrConnectWithoutGuildInput

  @Field(() => GuildSettingsWhereUniqueInput, { nullable: true })
  @Type(() => GuildSettingsWhereUniqueInput)
  connect?: GuildSettingsWhereUniqueInput
}
