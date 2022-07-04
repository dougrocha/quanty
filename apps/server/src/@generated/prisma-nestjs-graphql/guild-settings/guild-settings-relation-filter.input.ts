import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildSettingsWhereInput } from './guild-settings-where.input'

@InputType()
export class GuildSettingsRelationFilter {
  @Field(() => GuildSettingsWhereInput, { nullable: true })
  is?: GuildSettingsWhereInput

  @Field(() => GuildSettingsWhereInput, { nullable: true })
  isNot?: GuildSettingsWhereInput
}
