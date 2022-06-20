import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { GuildSettingsCountOrderByAggregateInput } from './guild-settings-count-order-by-aggregate.input';
import { GuildSettingsAvgOrderByAggregateInput } from './guild-settings-avg-order-by-aggregate.input';
import { GuildSettingsMaxOrderByAggregateInput } from './guild-settings-max-order-by-aggregate.input';
import { GuildSettingsMinOrderByAggregateInput } from './guild-settings-min-order-by-aggregate.input';
import { GuildSettingsSumOrderByAggregateInput } from './guild-settings-sum-order-by-aggregate.input';

@InputType()
export class GuildSettingsOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    defaultJoinRole?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    nsfw?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    globalCooldown?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    djRole?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    musicTimeOut?: keyof typeof SortOrder;

    @Field(() => GuildSettingsCountOrderByAggregateInput, {nullable:true})
    _count?: GuildSettingsCountOrderByAggregateInput;

    @Field(() => GuildSettingsAvgOrderByAggregateInput, {nullable:true})
    _avg?: GuildSettingsAvgOrderByAggregateInput;

    @Field(() => GuildSettingsMaxOrderByAggregateInput, {nullable:true})
    _max?: GuildSettingsMaxOrderByAggregateInput;

    @Field(() => GuildSettingsMinOrderByAggregateInput, {nullable:true})
    _min?: GuildSettingsMinOrderByAggregateInput;

    @Field(() => GuildSettingsSumOrderByAggregateInput, {nullable:true})
    _sum?: GuildSettingsSumOrderByAggregateInput;
}
