import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    tier!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    current_period_end!: number;

    @Field(() => Int, {nullable:false})
    cancel_at_period_end!: number;

    @Field(() => Int, {nullable:false})
    guildId!: number;

    @Field(() => Int, {nullable:false})
    customerId!: number;

    @Field(() => Int, {nullable:false})
    priceId!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
