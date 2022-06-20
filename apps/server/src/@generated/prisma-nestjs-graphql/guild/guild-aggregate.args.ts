import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildWhereInput } from './guild-where.input';
import { Type } from 'class-transformer';
import { GuildOrderByWithRelationInput } from './guild-order-by-with-relation.input';
import { GuildWhereUniqueInput } from './guild-where-unique.input';
import { Int } from '@nestjs/graphql';
import { GuildCountAggregateInput } from './guild-count-aggregate.input';
import { GuildMinAggregateInput } from './guild-min-aggregate.input';
import { GuildMaxAggregateInput } from './guild-max-aggregate.input';

@ArgsType()
export class GuildAggregateArgs {

    @Field(() => GuildWhereInput, {nullable:true})
    @Type(() => GuildWhereInput)
    where?: GuildWhereInput;

    @Field(() => [GuildOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<GuildOrderByWithRelationInput>;

    @Field(() => GuildWhereUniqueInput, {nullable:true})
    cursor?: GuildWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => GuildCountAggregateInput, {nullable:true})
    _count?: GuildCountAggregateInput;

    @Field(() => GuildMinAggregateInput, {nullable:true})
    _min?: GuildMinAggregateInput;

    @Field(() => GuildMaxAggregateInput, {nullable:true})
    _max?: GuildMaxAggregateInput;
}
