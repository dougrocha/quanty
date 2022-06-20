import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PremiumTier } from './premium-tier.enum';

@InputType()
export class NestedEnumPremiumTierFilter {

    @Field(() => PremiumTier, {nullable:true})
    equals?: keyof typeof PremiumTier;

    @Field(() => [PremiumTier], {nullable:true})
    in?: Array<keyof typeof PremiumTier>;

    @Field(() => [PremiumTier], {nullable:true})
    notIn?: Array<keyof typeof PremiumTier>;

    @Field(() => NestedEnumPremiumTierFilter, {nullable:true})
    not?: NestedEnumPremiumTierFilter;
}
