import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildSettingsWhereInput } from './guild-settings-where.input';
import { Type } from 'class-transformer';
import { GuildSettingsOrderByWithRelationInput } from './guild-settings-order-by-with-relation.input';
import { GuildSettingsWhereUniqueInput } from './guild-settings-where-unique.input';
import { Int } from '@nestjs/graphql';
import { GuildSettingsCountAggregateInput } from './guild-settings-count-aggregate.input';
import { GuildSettingsAvgAggregateInput } from './guild-settings-avg-aggregate.input';
import { GuildSettingsSumAggregateInput } from './guild-settings-sum-aggregate.input';
import { GuildSettingsMinAggregateInput } from './guild-settings-min-aggregate.input';
import { GuildSettingsMaxAggregateInput } from './guild-settings-max-aggregate.input';

@ArgsType()
export class GuildSettingsAggregateArgs {

    @Field(() => GuildSettingsWhereInput, {nullable:true})
    @Type(() => GuildSettingsWhereInput)
    where?: GuildSettingsWhereInput;

    @Field(() => [GuildSettingsOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<GuildSettingsOrderByWithRelationInput>;

    @Field(() => GuildSettingsWhereUniqueInput, {nullable:true})
    cursor?: GuildSettingsWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => GuildSettingsCountAggregateInput, {nullable:true})
    _count?: GuildSettingsCountAggregateInput;

    @Field(() => GuildSettingsAvgAggregateInput, {nullable:true})
    _avg?: GuildSettingsAvgAggregateInput;

    @Field(() => GuildSettingsSumAggregateInput, {nullable:true})
    _sum?: GuildSettingsSumAggregateInput;

    @Field(() => GuildSettingsMinAggregateInput, {nullable:true})
    _min?: GuildSettingsMinAggregateInput;

    @Field(() => GuildSettingsMaxAggregateInput, {nullable:true})
    _max?: GuildSettingsMaxAggregateInput;
}
