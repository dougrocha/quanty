import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildWhereUniqueInput } from './guild-where-unique.input'
import { Type } from 'class-transformer'
import { GuildCreateWithoutGuildSettingsInput } from './guild-create-without-guild-settings.input'

@InputType()
export class GuildCreateOrConnectWithoutGuildSettingsInput {
  @Field(() => GuildWhereUniqueInput, { nullable: false })
  @Type(() => GuildWhereUniqueInput)
  where!: GuildWhereUniqueInput

  @Field(() => GuildCreateWithoutGuildSettingsInput, { nullable: false })
  @Type(() => GuildCreateWithoutGuildSettingsInput)
  create!: GuildCreateWithoutGuildSettingsInput
}
