import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildWhereInput } from './guild-where.input'

@InputType()
export class GuildRelationFilter {
  @Field(() => GuildWhereInput, { nullable: true })
  is?: GuildWhereInput

  @Field(() => GuildWhereInput, { nullable: true })
  isNot?: GuildWhereInput
}
