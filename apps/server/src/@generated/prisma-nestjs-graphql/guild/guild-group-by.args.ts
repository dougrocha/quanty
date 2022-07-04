import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { GuildWhereInput } from './guild-where.input'
import { Type } from 'class-transformer'
import { GuildOrderByWithAggregationInput } from './guild-order-by-with-aggregation.input'
import { GuildScalarFieldEnum } from './guild-scalar-field.enum'
import { GuildScalarWhereWithAggregatesInput } from './guild-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'
import { GuildCountAggregateInput } from './guild-count-aggregate.input'
import { GuildMinAggregateInput } from './guild-min-aggregate.input'
import { GuildMaxAggregateInput } from './guild-max-aggregate.input'

@ArgsType()
export class GuildGroupByArgs {
  @Field(() => GuildWhereInput, { nullable: true })
  @Type(() => GuildWhereInput)
  where?: GuildWhereInput

  @Field(() => [GuildOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<GuildOrderByWithAggregationInput>

  @Field(() => [GuildScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof GuildScalarFieldEnum>

  @Field(() => GuildScalarWhereWithAggregatesInput, { nullable: true })
  having?: GuildScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => GuildCountAggregateInput, { nullable: true })
  _count?: GuildCountAggregateInput

  @Field(() => GuildMinAggregateInput, { nullable: true })
  _min?: GuildMinAggregateInput

  @Field(() => GuildMaxAggregateInput, { nullable: true })
  _max?: GuildMaxAggregateInput
}
