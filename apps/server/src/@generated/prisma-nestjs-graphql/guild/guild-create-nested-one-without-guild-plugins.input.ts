import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildCreateWithoutGuildPluginsInput } from './guild-create-without-guild-plugins.input'
import { Type } from 'class-transformer'
import { GuildCreateOrConnectWithoutGuildPluginsInput } from './guild-create-or-connect-without-guild-plugins.input'
import { GuildWhereUniqueInput } from './guild-where-unique.input'

@InputType()
export class GuildCreateNestedOneWithoutGuildPluginsInput {
  @Field(() => GuildCreateWithoutGuildPluginsInput, { nullable: true })
  @Type(() => GuildCreateWithoutGuildPluginsInput)
  create?: GuildCreateWithoutGuildPluginsInput

  @Field(() => GuildCreateOrConnectWithoutGuildPluginsInput, { nullable: true })
  @Type(() => GuildCreateOrConnectWithoutGuildPluginsInput)
  connectOrCreate?: GuildCreateOrConnectWithoutGuildPluginsInput

  @Field(() => GuildWhereUniqueInput, { nullable: true })
  @Type(() => GuildWhereUniqueInput)
  connect?: GuildWhereUniqueInput
}
