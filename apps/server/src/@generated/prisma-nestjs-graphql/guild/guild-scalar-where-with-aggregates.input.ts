import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input'

@InputType()
export class GuildScalarWhereWithAggregatesInput {
  @Field(() => [GuildScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<GuildScalarWhereWithAggregatesInput>

  @Field(() => [GuildScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<GuildScalarWhereWithAggregatesInput>

  @Field(() => [GuildScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<GuildScalarWhereWithAggregatesInput>

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  premium?: BoolWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  prefix?: StringWithAggregatesFilter
}
