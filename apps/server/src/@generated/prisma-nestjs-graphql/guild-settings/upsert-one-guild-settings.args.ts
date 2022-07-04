import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildSettingsWhereUniqueInput } from './guild-settings-where-unique.input'
import { Type } from 'class-transformer'
import { GuildSettingsCreateInput } from './guild-settings-create.input'
import { GuildSettingsUpdateInput } from './guild-settings-update.input'

@ArgsType()
export class UpsertOneGuildSettingsArgs {
  @Field(() => GuildSettingsWhereUniqueInput, { nullable: false })
  @Type(() => GuildSettingsWhereUniqueInput)
  where!: GuildSettingsWhereUniqueInput

  @Field(() => GuildSettingsCreateInput, { nullable: false })
  @Type(() => GuildSettingsCreateInput)
  create!: GuildSettingsCreateInput

  @Field(() => GuildSettingsUpdateInput, { nullable: false })
  @Type(() => GuildSettingsUpdateInput)
  update!: GuildSettingsUpdateInput
}
