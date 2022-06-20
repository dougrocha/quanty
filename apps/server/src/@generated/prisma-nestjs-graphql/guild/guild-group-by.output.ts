import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Guild_tier } from '../prisma/guild-tier.enum';
import { GuildCountAggregate } from './guild-count-aggregate.output';
import { GuildMinAggregate } from './guild-min-aggregate.output';
import { GuildMaxAggregate } from './guild-max-aggregate.output';

@ObjectType()
export class GuildGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Guild_tier, {nullable:false})
    tier!: keyof typeof Guild_tier;

    @Field(() => String, {nullable:false})
    prefix!: string;

    @Field(() => GuildCountAggregate, {nullable:true})
    _count?: GuildCountAggregate;

    @Field(() => GuildMinAggregate, {nullable:true})
    _min?: GuildMinAggregate;

    @Field(() => GuildMaxAggregate, {nullable:true})
    _max?: GuildMaxAggregate;
}
