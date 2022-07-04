import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildPluginsUpdateManyMutationInput } from './guild-plugins-update-many-mutation.input'
import { Type } from 'class-transformer'
import { GuildPluginsWhereInput } from './guild-plugins-where.input'

@ArgsType()
export class UpdateManyGuildPluginsArgs {
  @Field(() => GuildPluginsUpdateManyMutationInput, { nullable: false })
  @Type(() => GuildPluginsUpdateManyMutationInput)
  data!: GuildPluginsUpdateManyMutationInput

  @Field(() => GuildPluginsWhereInput, { nullable: true })
  @Type(() => GuildPluginsWhereInput)
  where?: GuildPluginsWhereInput
}
