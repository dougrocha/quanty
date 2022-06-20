import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { GuildPluginsCountOrderByAggregateInput } from './guild-plugins-count-order-by-aggregate.input';
import { GuildPluginsMaxOrderByAggregateInput } from './guild-plugins-max-order-by-aggregate.input';
import { GuildPluginsMinOrderByAggregateInput } from './guild-plugins-min-order-by-aggregate.input';

@InputType()
export class GuildPluginsOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    autoMod?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    anime?: keyof typeof SortOrder;

    @Field(() => GuildPluginsCountOrderByAggregateInput, {nullable:true})
    _count?: GuildPluginsCountOrderByAggregateInput;

    @Field(() => GuildPluginsMaxOrderByAggregateInput, {nullable:true})
    _max?: GuildPluginsMaxOrderByAggregateInput;

    @Field(() => GuildPluginsMinOrderByAggregateInput, {nullable:true})
    _min?: GuildPluginsMinOrderByAggregateInput;
}
