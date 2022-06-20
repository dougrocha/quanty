import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SubscriptionWhereInput } from './subscription-where.input';
import { Type } from 'class-transformer';
import { SubscriptionOrderByWithAggregationInput } from './subscription-order-by-with-aggregation.input';
import { SubscriptionScalarFieldEnum } from './subscription-scalar-field.enum';
import { SubscriptionScalarWhereWithAggregatesInput } from './subscription-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { SubscriptionCountAggregateInput } from './subscription-count-aggregate.input';
import { SubscriptionMinAggregateInput } from './subscription-min-aggregate.input';
import { SubscriptionMaxAggregateInput } from './subscription-max-aggregate.input';

@ArgsType()
export class SubscriptionGroupByArgs {

    @Field(() => SubscriptionWhereInput, {nullable:true})
    @Type(() => SubscriptionWhereInput)
    where?: SubscriptionWhereInput;

    @Field(() => [SubscriptionOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<SubscriptionOrderByWithAggregationInput>;

    @Field(() => [SubscriptionScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof SubscriptionScalarFieldEnum>;

    @Field(() => SubscriptionScalarWhereWithAggregatesInput, {nullable:true})
    having?: SubscriptionScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => SubscriptionCountAggregateInput, {nullable:true})
    _count?: SubscriptionCountAggregateInput;

    @Field(() => SubscriptionMinAggregateInput, {nullable:true})
    _min?: SubscriptionMinAggregateInput;

    @Field(() => SubscriptionMaxAggregateInput, {nullable:true})
    _max?: SubscriptionMaxAggregateInput;
}
