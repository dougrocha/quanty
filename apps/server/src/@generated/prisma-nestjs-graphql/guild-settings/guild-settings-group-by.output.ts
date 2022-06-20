import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GuildSettingsCountAggregate } from './guild-settings-count-aggregate.output';
import { GuildSettingsAvgAggregate } from './guild-settings-avg-aggregate.output';
import { GuildSettingsSumAggregate } from './guild-settings-sum-aggregate.output';
import { GuildSettingsMinAggregate } from './guild-settings-min-aggregate.output';
import { GuildSettingsMaxAggregate } from './guild-settings-max-aggregate.output';

@ObjectType()
export class GuildSettingsGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    defaultJoinRole!: string;

    @Field(() => Boolean, {nullable:false})
    nsfw!: boolean;

    @Field(() => Int, {nullable:false})
    globalCooldown!: number;

    @Field(() => String, {nullable:false})
    djRole!: string;

    @Field(() => Boolean, {nullable:false})
    musicTimeOut!: boolean;

    @Field(() => GuildSettingsCountAggregate, {nullable:true})
    _count?: GuildSettingsCountAggregate;

    @Field(() => GuildSettingsAvgAggregate, {nullable:true})
    _avg?: GuildSettingsAvgAggregate;

    @Field(() => GuildSettingsSumAggregate, {nullable:true})
    _sum?: GuildSettingsSumAggregate;

    @Field(() => GuildSettingsMinAggregate, {nullable:true})
    _min?: GuildSettingsMinAggregate;

    @Field(() => GuildSettingsMaxAggregate, {nullable:true})
    _max?: GuildSettingsMaxAggregate;
}
