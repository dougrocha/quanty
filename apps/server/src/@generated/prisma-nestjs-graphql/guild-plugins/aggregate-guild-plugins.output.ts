import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { GuildPluginsCountAggregate } from './guild-plugins-count-aggregate.output';
import { GuildPluginsMinAggregate } from './guild-plugins-min-aggregate.output';
import { GuildPluginsMaxAggregate } from './guild-plugins-max-aggregate.output';

@ObjectType()
export class AggregateGuildPlugins {

    @Field(() => GuildPluginsCountAggregate, {nullable:true})
    _count?: GuildPluginsCountAggregate;

    @Field(() => GuildPluginsMinAggregate, {nullable:true})
    _min?: GuildPluginsMinAggregate;

    @Field(() => GuildPluginsMaxAggregate, {nullable:true})
    _max?: GuildPluginsMaxAggregate;
}
