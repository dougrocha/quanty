import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Guild_tier } from './guild-tier.enum'
import { NestedIntFilter } from './nested-int-filter.input'
import { NestedEnumGuild_tierFilter } from './nested-enum-guild-tier-filter.input'

@InputType()
export class NestedEnumGuild_tierWithAggregatesFilter {
  @Field(() => Guild_tier, { nullable: true })
  equals?: keyof typeof Guild_tier;

  @Field(() => [Guild_tier], { nullable: true })
  in?: Array<keyof typeof Guild_tier>

  @Field(() => [Guild_tier], { nullable: true })
  notIn?: Array<keyof typeof Guild_tier>

  @Field(() => NestedEnumGuild_tierWithAggregatesFilter, { nullable: true })
  not?: NestedEnumGuild_tierWithAggregatesFilter

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter

  @Field(() => NestedEnumGuild_tierFilter, { nullable: true })
  _min?: NestedEnumGuild_tierFilter

  @Field(() => NestedEnumGuild_tierFilter, { nullable: true })
  _max?: NestedEnumGuild_tierFilter
}
