import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Product_tier } from './product-tier.enum'

@InputType()
export class NestedEnumProduct_tierFilter {
  @Field(() => Product_tier, { nullable: true })
  equals?: keyof typeof Product_tier;

  @Field(() => [Product_tier], { nullable: true })
  in?: Array<keyof typeof Product_tier>

  @Field(() => [Product_tier], { nullable: true })
  notIn?: Array<keyof typeof Product_tier>

  @Field(() => NestedEnumProduct_tierFilter, { nullable: true })
  not?: NestedEnumProduct_tierFilter
}
