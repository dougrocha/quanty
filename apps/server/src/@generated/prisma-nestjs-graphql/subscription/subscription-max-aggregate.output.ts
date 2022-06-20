import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Subscription_tier } from '../prisma/subscription-tier.enum';
import { Subscription_status } from '../prisma/subscription-status.enum';

@ObjectType()
export class SubscriptionMaxAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Subscription_tier, {nullable:true})
    tier?: keyof typeof Subscription_tier;

    @Field(() => Subscription_status, {nullable:true})
    status?: keyof typeof Subscription_status;

    @Field(() => Date, {nullable:true})
    current_period_end?: Date | string;

    @Field(() => Boolean, {nullable:true})
    cancel_at_period_end?: boolean;

    @Field(() => String, {nullable:true})
    guildId?: string;

    @Field(() => String, {nullable:true})
    customerId?: string;

    @Field(() => String, {nullable:true})
    priceId?: string;
}
