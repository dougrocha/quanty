import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildPluginsWhereUniqueInput } from './guild-plugins-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteOneGuildPluginsArgs {
  @Field(() => GuildPluginsWhereUniqueInput, { nullable: false })
  @Type(() => GuildPluginsWhereUniqueInput)
  where!: GuildPluginsWhereUniqueInput
}
