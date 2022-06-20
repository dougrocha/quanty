import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Subscription_tier } from '../prisma/subscription-tier.enum';
import { Subscription_status } from '../prisma/subscription-status.enum';

@InputType()
export class SubscriptionUncheckedCreateWithoutCustomerInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Subscription_tier, {nullable:true})
    tier?: keyof typeof Subscription_tier;

    @Field(() => Subscription_status, {nullable:true})
    status?: keyof typeof Subscription_status;

    @Field(() => Date, {nullable:false})
    current_period_end!: Date | string;

    @Field(() => Boolean, {nullable:true})
    cancel_at_period_end?: boolean;

    @Field(() => String, {nullable:false})
    guildId!: string;

    @Field(() => String, {nullable:false})
    priceId!: string;
}
