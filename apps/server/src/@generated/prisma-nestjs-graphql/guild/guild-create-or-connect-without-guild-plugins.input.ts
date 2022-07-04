import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildWhereUniqueInput } from './guild-where-unique.input'
import { Type } from 'class-transformer'
import { GuildCreateWithoutGuildPluginsInput } from './guild-create-without-guild-plugins.input'

@InputType()
export class GuildCreateOrConnectWithoutGuildPluginsInput {
  @Field(() => GuildWhereUniqueInput, { nullable: false })
  @Type(() => GuildWhereUniqueInput)
  where!: GuildWhereUniqueInput

  @Field(() => GuildCreateWithoutGuildPluginsInput, { nullable: false })
  @Type(() => GuildCreateWithoutGuildPluginsInput)
  create!: GuildCreateWithoutGuildPluginsInput
}
