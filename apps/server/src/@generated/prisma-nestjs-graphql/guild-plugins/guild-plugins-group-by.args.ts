import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildPluginsWhereInput } from './guild-plugins-where.input';
import { Type } from 'class-transformer';
import { GuildPluginsOrderByWithAggregationInput } from './guild-plugins-order-by-with-aggregation.input';
import { GuildPluginsScalarFieldEnum } from './guild-plugins-scalar-field.enum';
import { GuildPluginsScalarWhereWithAggregatesInput } from './guild-plugins-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { GuildPluginsCountAggregateInput } from './guild-plugins-count-aggregate.input';
import { GuildPluginsMinAggregateInput } from './guild-plugins-min-aggregate.input';
import { GuildPluginsMaxAggregateInput } from './guild-plugins-max-aggregate.input';

@ArgsType()
export class GuildPluginsGroupByArgs {

    @Field(() => GuildPluginsWhereInput, {nullable:true})
    @Type(() => GuildPluginsWhereInput)
    where?: GuildPluginsWhereInput;

    @Field(() => [GuildPluginsOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<GuildPluginsOrderByWithAggregationInput>;

    @Field(() => [GuildPluginsScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof GuildPluginsScalarFieldEnum>;

    @Field(() => GuildPluginsScalarWhereWithAggregatesInput, {nullable:true})
    having?: GuildPluginsScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => GuildPluginsCountAggregateInput, {nullable:true})
    _count?: GuildPluginsCountAggregateInput;

    @Field(() => GuildPluginsMinAggregateInput, {nullable:true})
    _min?: GuildPluginsMinAggregateInput;

    @Field(() => GuildPluginsMaxAggregateInput, {nullable:true})
    _max?: GuildPluginsMaxAggregateInput;
}
