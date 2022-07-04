import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildPluginsWhereUniqueInput } from './guild-plugins-where-unique.input'
import { Type } from 'class-transformer'
import { GuildPluginsCreateWithoutGuildInput } from './guild-plugins-create-without-guild.input'

@InputType()
export class GuildPluginsCreateOrConnectWithoutGuildInput {
  @Field(() => GuildPluginsWhereUniqueInput, { nullable: false })
  @Type(() => GuildPluginsWhereUniqueInput)
  where!: GuildPluginsWhereUniqueInput

  @Field(() => GuildPluginsCreateWithoutGuildInput, { nullable: false })
  @Type(() => GuildPluginsCreateWithoutGuildInput)
  create!: GuildPluginsCreateWithoutGuildInput
}
