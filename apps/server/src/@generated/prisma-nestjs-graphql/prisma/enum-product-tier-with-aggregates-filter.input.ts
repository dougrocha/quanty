import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Product_tier } from './product-tier.enum';
import { NestedEnumProduct_tierWithAggregatesFilter } from './nested-enum-product-tier-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumProduct_tierFilter } from './nested-enum-product-tier-filter.input';

@InputType()
export class EnumProduct_tierWithAggregatesFilter {

    @Field(() => Product_tier, {nullable:true})
    equals?: keyof typeof Product_tier;

    @Field(() => [Product_tier], {nullable:true})
    in?: Array<keyof typeof Product_tier>;

    @Field(() => [Product_tier], {nullable:true})
    notIn?: Array<keyof typeof Product_tier>;

    @Field(() => NestedEnumProduct_tierWithAggregatesFilter, {nullable:true})
    not?: NestedEnumProduct_tierWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumProduct_tierFilter, {nullable:true})
    _min?: NestedEnumProduct_tierFilter;

    @Field(() => NestedEnumProduct_tierFilter, {nullable:true})
    _max?: NestedEnumProduct_tierFilter;
}
