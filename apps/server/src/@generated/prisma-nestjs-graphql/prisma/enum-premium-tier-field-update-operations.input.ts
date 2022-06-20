import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PremiumTier } from './premium-tier.enum';

@InputType()
export class EnumPremiumTierFieldUpdateOperationsInput {

    @Field(() => PremiumTier, {nullable:true})
    set?: keyof typeof PremiumTier;
}
