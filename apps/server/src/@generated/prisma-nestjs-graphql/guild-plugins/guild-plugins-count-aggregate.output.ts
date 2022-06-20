import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class GuildPluginsCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    autoMod!: number;

    @Field(() => Int, {nullable:false})
    anime!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
