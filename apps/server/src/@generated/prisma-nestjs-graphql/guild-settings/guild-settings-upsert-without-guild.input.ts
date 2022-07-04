import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildSettingsUpdateWithoutGuildInput } from './guild-settings-update-without-guild.input'
import { Type } from 'class-transformer'
import { GuildSettingsCreateWithoutGuildInput } from './guild-settings-create-without-guild.input'

@InputType()
export class GuildSettingsUpsertWithoutGuildInput {
  @Field(() => GuildSettingsUpdateWithoutGuildInput, { nullable: false })
  @Type(() => GuildSettingsUpdateWithoutGuildInput)
  update!: GuildSettingsUpdateWithoutGuildInput

  @Field(() => GuildSettingsCreateWithoutGuildInput, { nullable: false })
  @Type(() => GuildSettingsCreateWithoutGuildInput)
  create!: GuildSettingsCreateWithoutGuildInput
}
