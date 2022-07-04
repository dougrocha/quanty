import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildSettingsWhereUniqueInput } from './guild-settings-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniqueGuildSettingsArgs {
  @Field(() => GuildSettingsWhereUniqueInput, { nullable: false })
  @Type(() => GuildSettingsWhereUniqueInput)
  where!: GuildSettingsWhereUniqueInput
}
