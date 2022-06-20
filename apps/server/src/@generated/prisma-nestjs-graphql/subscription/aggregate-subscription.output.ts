import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { SubscriptionCountAggregate } from './subscription-count-aggregate.output';
import { SubscriptionMinAggregate } from './subscription-min-aggregate.output';
import { SubscriptionMaxAggregate } from './subscription-max-aggregate.output';

@ObjectType()
export class AggregateSubscription {

    @Field(() => SubscriptionCountAggregate, {nullable:true})
    _count?: SubscriptionCountAggregate;

    @Field(() => SubscriptionMinAggregate, {nullable:true})
    _min?: SubscriptionMinAggregate;

    @Field(() => SubscriptionMaxAggregate, {nullable:true})
    _max?: SubscriptionMaxAggregate;
}
