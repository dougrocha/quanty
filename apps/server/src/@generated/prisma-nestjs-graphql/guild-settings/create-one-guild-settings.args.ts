import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildSettingsCreateInput } from './guild-settings-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOneGuildSettingsArgs {
  @Field(() => GuildSettingsCreateInput, { nullable: false })
  @Type(() => GuildSettingsCreateInput)
  data!: GuildSettingsCreateInput
}
