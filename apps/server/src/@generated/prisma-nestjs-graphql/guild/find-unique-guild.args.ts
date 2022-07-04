import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildWhereUniqueInput } from './guild-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniqueGuildArgs {
  @Field(() => GuildWhereUniqueInput, { nullable: false })
  @Type(() => GuildWhereUniqueInput)
  where!: GuildWhereUniqueInput
}
