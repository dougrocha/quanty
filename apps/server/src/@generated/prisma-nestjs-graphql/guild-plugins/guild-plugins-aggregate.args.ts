import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildPluginsWhereInput } from './guild-plugins-where.input'
import { Type } from 'class-transformer'
import { GuildPluginsOrderByWithRelationAndSearchRelevanceInput } from './guild-plugins-order-by-with-relation-and-search-relevance.input'
import { GuildPluginsWhereUniqueInput } from './guild-plugins-where-unique.input'
import { Int } from '@nestjs/graphql'
import { GuildPluginsCountAggregateInput } from './guild-plugins-count-aggregate.input'
import { GuildPluginsMinAggregateInput } from './guild-plugins-min-aggregate.input'
import { GuildPluginsMaxAggregateInput } from './guild-plugins-max-aggregate.input'

@ArgsType()
export class GuildPluginsAggregateArgs {
  @Field(() => GuildPluginsWhereInput, { nullable: true })
  @Type(() => GuildPluginsWhereInput)
  where?: GuildPluginsWhereInput

  @Field(() => [GuildPluginsOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true,
  })
  orderBy?: Array<GuildPluginsOrderByWithRelationAndSearchRelevanceInput>

  @Field(() => GuildPluginsWhereUniqueInput, { nullable: true })
  cursor?: GuildPluginsWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => GuildPluginsCountAggregateInput, { nullable: true })
  _count?: GuildPluginsCountAggregateInput

  @Field(() => GuildPluginsMinAggregateInput, { nullable: true })
  _min?: GuildPluginsMinAggregateInput

  @Field(() => GuildPluginsMaxAggregateInput, { nullable: true })
  _max?: GuildPluginsMaxAggregateInput
}
