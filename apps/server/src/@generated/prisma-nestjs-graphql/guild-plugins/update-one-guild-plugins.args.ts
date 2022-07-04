import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildPluginsUpdateInput } from './guild-plugins-update.input'
import { Type } from 'class-transformer'
import { GuildPluginsWhereUniqueInput } from './guild-plugins-where-unique.input'

@ArgsType()
export class UpdateOneGuildPluginsArgs {
  @Field(() => GuildPluginsUpdateInput, { nullable: false })
  @Type(() => GuildPluginsUpdateInput)
  data!: GuildPluginsUpdateInput

  @Field(() => GuildPluginsWhereUniqueInput, { nullable: false })
  @Type(() => GuildPluginsWhereUniqueInput)
  where!: GuildPluginsWhereUniqueInput
}
