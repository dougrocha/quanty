import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PremiumTier } from './premium-tier.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumPremiumTierFilter } from './nested-enum-premium-tier-filter.input';

@InputType()
export class NestedEnumPremiumTierWithAggregatesFilter {

    @Field(() => PremiumTier, {nullable:true})
    equals?: keyof typeof PremiumTier;

    @Field(() => [PremiumTier], {nullable:true})
    in?: Array<keyof typeof PremiumTier>;

    @Field(() => [PremiumTier], {nullable:true})
    notIn?: Array<keyof typeof PremiumTier>;

    @Field(() => NestedEnumPremiumTierWithAggregatesFilter, {nullable:true})
    not?: NestedEnumPremiumTierWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumPremiumTierFilter, {nullable:true})
    _min?: NestedEnumPremiumTierFilter;

    @Field(() => NestedEnumPremiumTierFilter, {nullable:true})
    _max?: NestedEnumPremiumTierFilter;
}
