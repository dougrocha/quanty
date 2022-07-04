import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildCreateWithoutGuildSettingsInput } from './guild-create-without-guild-settings.input'
import { Type } from 'class-transformer'
import { GuildCreateOrConnectWithoutGuildSettingsInput } from './guild-create-or-connect-without-guild-settings.input'
import { GuildUpsertWithoutGuildSettingsInput } from './guild-upsert-without-guild-settings.input'
import { GuildWhereUniqueInput } from './guild-where-unique.input'
import { GuildUpdateWithoutGuildSettingsInput } from './guild-update-without-guild-settings.input'

@InputType()
export class GuildUpdateOneWithoutGuildSettingsInput {
  @Field(() => GuildCreateWithoutGuildSettingsInput, { nullable: true })
  @Type(() => GuildCreateWithoutGuildSettingsInput)
  create?: GuildCreateWithoutGuildSettingsInput

  @Field(() => GuildCreateOrConnectWithoutGuildSettingsInput, {
    nullable: true,
  })
  @Type(() => GuildCreateOrConnectWithoutGuildSettingsInput)
  connectOrCreate?: GuildCreateOrConnectWithoutGuildSettingsInput

  @Field(() => GuildUpsertWithoutGuildSettingsInput, { nullable: true })
  @Type(() => GuildUpsertWithoutGuildSettingsInput)
  upsert?: GuildUpsertWithoutGuildSettingsInput

  @Field(() => Boolean, { nullable: true })
  disconnect?: boolean

  @Field(() => Boolean, { nullable: true })
  delete?: boolean

  @Field(() => GuildWhereUniqueInput, { nullable: true })
  @Type(() => GuildWhereUniqueInput)
  connect?: GuildWhereUniqueInput

  @Field(() => GuildUpdateWithoutGuildSettingsInput, { nullable: true })
  @Type(() => GuildUpdateWithoutGuildSettingsInput)
  update?: GuildUpdateWithoutGuildSettingsInput
}
