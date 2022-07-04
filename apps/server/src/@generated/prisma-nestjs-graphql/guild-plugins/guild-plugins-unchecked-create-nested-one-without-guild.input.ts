import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildPluginsCreateWithoutGuildInput } from './guild-plugins-create-without-guild.input'
import { Type } from 'class-transformer'
import { GuildPluginsCreateOrConnectWithoutGuildInput } from './guild-plugins-create-or-connect-without-guild.input'
import { GuildPluginsWhereUniqueInput } from './guild-plugins-where-unique.input'

@InputType()
export class GuildPluginsUncheckedCreateNestedOneWithoutGuildInput {
  @Field(() => GuildPluginsCreateWithoutGuildInput, { nullable: true })
  @Type(() => GuildPluginsCreateWithoutGuildInput)
  create?: GuildPluginsCreateWithoutGuildInput

  @Field(() => GuildPluginsCreateOrConnectWithoutGuildInput, { nullable: true })
  @Type(() => GuildPluginsCreateOrConnectWithoutGuildInput)
  connectOrCreate?: GuildPluginsCreateOrConnectWithoutGuildInput

  @Field(() => GuildPluginsWhereUniqueInput, { nullable: true })
  @Type(() => GuildPluginsWhereUniqueInput)
  connect?: GuildPluginsWhereUniqueInput
}
