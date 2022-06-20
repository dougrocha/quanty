import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { GuildPluginsCountAggregate } from './guild-plugins-count-aggregate.output';
import { GuildPluginsMinAggregate } from './guild-plugins-min-aggregate.output';
import { GuildPluginsMaxAggregate } from './guild-plugins-max-aggregate.output';

@ObjectType()
export class GuildPluginsGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Boolean, {nullable:false})
    autoMod!: boolean;

    @Field(() => Boolean, {nullable:false})
    anime!: boolean;

    @Field(() => GuildPluginsCountAggregate, {nullable:true})
    _count?: GuildPluginsCountAggregate;

    @Field(() => GuildPluginsMinAggregate, {nullable:true})
    _min?: GuildPluginsMinAggregate;

    @Field(() => GuildPluginsMaxAggregate, {nullable:true})
    _max?: GuildPluginsMaxAggregate;
}
