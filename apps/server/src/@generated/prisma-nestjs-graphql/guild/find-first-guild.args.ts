import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildWhereInput } from './guild-where.input'
import { Type } from 'class-transformer'
import { GuildOrderByWithRelationAndSearchRelevanceInput } from './guild-order-by-with-relation-and-search-relevance.input'
import { GuildWhereUniqueInput } from './guild-where-unique.input'
import { Int } from '@nestjs/graphql'
import { GuildScalarFieldEnum } from './guild-scalar-field.enum'

@ArgsType()
export class FindFirstGuildArgs {
  @Field(() => GuildWhereInput, { nullable: true })
  @Type(() => GuildWhereInput)
  where?: GuildWhereInput

  @Field(() => [GuildOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true,
  })
  orderBy?: Array<GuildOrderByWithRelationAndSearchRelevanceInput>

  @Field(() => GuildWhereUniqueInput, { nullable: true })
  cursor?: GuildWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => [GuildScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof GuildScalarFieldEnum>
}
