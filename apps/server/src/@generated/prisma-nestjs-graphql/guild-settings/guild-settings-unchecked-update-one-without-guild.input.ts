import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildSettingsCreateWithoutGuildInput } from './guild-settings-create-without-guild.input'
import { Type } from 'class-transformer'
import { GuildSettingsCreateOrConnectWithoutGuildInput } from './guild-settings-create-or-connect-without-guild.input'
import { GuildSettingsUpsertWithoutGuildInput } from './guild-settings-upsert-without-guild.input'
import { GuildSettingsWhereUniqueInput } from './guild-settings-where-unique.input'
import { GuildSettingsUpdateWithoutGuildInput } from './guild-settings-update-without-guild.input'

@InputType()
export class GuildSettingsUncheckedUpdateOneWithoutGuildInput {
  @Field(() => GuildSettingsCreateWithoutGuildInput, { nullable: true })
  @Type(() => GuildSettingsCreateWithoutGuildInput)
  create?: GuildSettingsCreateWithoutGuildInput

  @Field(() => GuildSettingsCreateOrConnectWithoutGuildInput, {
    nullable: true,
  })
  @Type(() => GuildSettingsCreateOrConnectWithoutGuildInput)
  connectOrCreate?: GuildSettingsCreateOrConnectWithoutGuildInput

  @Field(() => GuildSettingsUpsertWithoutGuildInput, { nullable: true })
  @Type(() => GuildSettingsUpsertWithoutGuildInput)
  upsert?: GuildSettingsUpsertWithoutGuildInput

  @Field(() => Boolean, { nullable: true })
  disconnect?: boolean

  @Field(() => Boolean, { nullable: true })
  delete?: boolean

  @Field(() => GuildSettingsWhereUniqueInput, { nullable: true })
  @Type(() => GuildSettingsWhereUniqueInput)
  connect?: GuildSettingsWhereUniqueInput

  @Field(() => GuildSettingsUpdateWithoutGuildInput, { nullable: true })
  @Type(() => GuildSettingsUpdateWithoutGuildInput)
  update?: GuildSettingsUpdateWithoutGuildInput
}
