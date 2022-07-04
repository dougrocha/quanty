import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildCreateWithoutGuildPluginsInput } from './guild-create-without-guild-plugins.input'
import { Type } from 'class-transformer'
import { GuildCreateOrConnectWithoutGuildPluginsInput } from './guild-create-or-connect-without-guild-plugins.input'
import { GuildUpsertWithoutGuildPluginsInput } from './guild-upsert-without-guild-plugins.input'
import { GuildWhereUniqueInput } from './guild-where-unique.input'
import { GuildUpdateWithoutGuildPluginsInput } from './guild-update-without-guild-plugins.input'

@InputType()
export class GuildUpdateOneRequiredWithoutGuildPluginsInput {
  @Field(() => GuildCreateWithoutGuildPluginsInput, { nullable: true })
  @Type(() => GuildCreateWithoutGuildPluginsInput)
  create?: GuildCreateWithoutGuildPluginsInput

  @Field(() => GuildCreateOrConnectWithoutGuildPluginsInput, { nullable: true })
  @Type(() => GuildCreateOrConnectWithoutGuildPluginsInput)
  connectOrCreate?: GuildCreateOrConnectWithoutGuildPluginsInput

  @Field(() => GuildUpsertWithoutGuildPluginsInput, { nullable: true })
  @Type(() => GuildUpsertWithoutGuildPluginsInput)
  upsert?: GuildUpsertWithoutGuildPluginsInput

  @Field(() => GuildWhereUniqueInput, { nullable: true })
  @Type(() => GuildWhereUniqueInput)
  connect?: GuildWhereUniqueInput

  @Field(() => GuildUpdateWithoutGuildPluginsInput, { nullable: true })
  @Type(() => GuildUpdateWithoutGuildPluginsInput)
  update?: GuildUpdateWithoutGuildPluginsInput
}
