import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Guild_tier } from './guild-tier.enum'
import { NestedEnumGuild_tierFilter } from './nested-enum-guild-tier-filter.input'

@InputType()
export class EnumGuild_tierFilter {
  @Field(() => Guild_tier, { nullable: true })
  equals?: keyof typeof Guild_tier;

  @Field(() => [Guild_tier], { nullable: true })
  in?: Array<keyof typeof Guild_tier>

  @Field(() => [Guild_tier], { nullable: true })
  notIn?: Array<keyof typeof Guild_tier>

  @Field(() => NestedEnumGuild_tierFilter, { nullable: true })
  not?: NestedEnumGuild_tierFilter
}
