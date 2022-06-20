import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { GuildCountOrderByAggregateInput } from './guild-count-order-by-aggregate.input';
import { GuildMaxOrderByAggregateInput } from './guild-max-order-by-aggregate.input';
import { GuildMinOrderByAggregateInput } from './guild-min-order-by-aggregate.input';

@InputType()
export class GuildOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    tier?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    prefix?: keyof typeof SortOrder;

    @Field(() => GuildCountOrderByAggregateInput, {nullable:true})
    _count?: GuildCountOrderByAggregateInput;

    @Field(() => GuildMaxOrderByAggregateInput, {nullable:true})
    _max?: GuildMaxOrderByAggregateInput;

    @Field(() => GuildMinOrderByAggregateInput, {nullable:true})
    _min?: GuildMinOrderByAggregateInput;
}
