import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildPluginsCreateWithoutGuildInput } from './guild-plugins-create-without-guild.input'
import { Type } from 'class-transformer'
import { GuildPluginsCreateOrConnectWithoutGuildInput } from './guild-plugins-create-or-connect-without-guild.input'
import { GuildPluginsUpsertWithoutGuildInput } from './guild-plugins-upsert-without-guild.input'
import { GuildPluginsWhereUniqueInput } from './guild-plugins-where-unique.input'
import { GuildPluginsUpdateWithoutGuildInput } from './guild-plugins-update-without-guild.input'

@InputType()
export class GuildPluginsUncheckedUpdateOneWithoutGuildInput {
  @Field(() => GuildPluginsCreateWithoutGuildInput, { nullable: true })
  @Type(() => GuildPluginsCreateWithoutGuildInput)
  create?: GuildPluginsCreateWithoutGuildInput

  @Field(() => GuildPluginsCreateOrConnectWithoutGuildInput, { nullable: true })
  @Type(() => GuildPluginsCreateOrConnectWithoutGuildInput)
  connectOrCreate?: GuildPluginsCreateOrConnectWithoutGuildInput

  @Field(() => GuildPluginsUpsertWithoutGuildInput, { nullable: true })
  @Type(() => GuildPluginsUpsertWithoutGuildInput)
  upsert?: GuildPluginsUpsertWithoutGuildInput

  @Field(() => Boolean, { nullable: true })
  disconnect?: boolean

  @Field(() => Boolean, { nullable: true })
  delete?: boolean

  @Field(() => GuildPluginsWhereUniqueInput, { nullable: true })
  @Type(() => GuildPluginsWhereUniqueInput)
  connect?: GuildPluginsWhereUniqueInput

  @Field(() => GuildPluginsUpdateWithoutGuildInput, { nullable: true })
  @Type(() => GuildPluginsUpdateWithoutGuildInput)
  update?: GuildPluginsUpdateWithoutGuildInput
}
