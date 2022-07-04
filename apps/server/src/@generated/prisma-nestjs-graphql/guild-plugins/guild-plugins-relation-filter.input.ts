import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildPluginsWhereInput } from './guild-plugins-where.input'

@InputType()
export class GuildPluginsRelationFilter {
  @Field(() => GuildPluginsWhereInput, { nullable: true })
  is?: GuildPluginsWhereInput

  @Field(() => GuildPluginsWhereInput, { nullable: true })
  isNot?: GuildPluginsWhereInput
}
