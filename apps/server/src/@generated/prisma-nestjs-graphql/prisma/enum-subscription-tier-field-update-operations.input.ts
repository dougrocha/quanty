import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Subscription_tier } from './subscription-tier.enum';

@InputType()
export class EnumSubscription_tierFieldUpdateOperationsInput {

    @Field(() => Subscription_tier, {nullable:true})
    set?: keyof typeof Subscription_tier;
}
