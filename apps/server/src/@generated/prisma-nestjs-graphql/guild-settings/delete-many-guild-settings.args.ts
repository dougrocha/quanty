import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildSettingsWhereInput } from './guild-settings-where.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteManyGuildSettingsArgs {
  @Field(() => GuildSettingsWhereInput, { nullable: true })
  @Type(() => GuildSettingsWhereInput)
  where?: GuildSettingsWhereInput
}
