import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildPluginsWhereUniqueInput } from './guild-plugins-where-unique.input'
import { Type } from 'class-transformer'
import { GuildPluginsCreateInput } from './guild-plugins-create.input'
import { GuildPluginsUpdateInput } from './guild-plugins-update.input'

@ArgsType()
export class UpsertOneGuildPluginsArgs {
  @Field(() => GuildPluginsWhereUniqueInput, { nullable: false })
  @Type(() => GuildPluginsWhereUniqueInput)
  where!: GuildPluginsWhereUniqueInput

  @Field(() => GuildPluginsCreateInput, { nullable: false })
  @Type(() => GuildPluginsCreateInput)
  create!: GuildPluginsCreateInput

  @Field(() => GuildPluginsUpdateInput, { nullable: false })
  @Type(() => GuildPluginsUpdateInput)
  update!: GuildPluginsUpdateInput
}
