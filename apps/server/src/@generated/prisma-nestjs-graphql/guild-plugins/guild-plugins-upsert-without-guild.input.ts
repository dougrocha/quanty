import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildPluginsUpdateWithoutGuildInput } from './guild-plugins-update-without-guild.input'
import { Type } from 'class-transformer'
import { GuildPluginsCreateWithoutGuildInput } from './guild-plugins-create-without-guild.input'

@InputType()
export class GuildPluginsUpsertWithoutGuildInput {
  @Field(() => GuildPluginsUpdateWithoutGuildInput, { nullable: false })
  @Type(() => GuildPluginsUpdateWithoutGuildInput)
  update!: GuildPluginsUpdateWithoutGuildInput

  @Field(() => GuildPluginsCreateWithoutGuildInput, { nullable: false })
  @Type(() => GuildPluginsCreateWithoutGuildInput)
  create!: GuildPluginsCreateWithoutGuildInput
}
