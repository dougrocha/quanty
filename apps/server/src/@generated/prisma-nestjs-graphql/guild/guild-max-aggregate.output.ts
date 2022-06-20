import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Guild_tier } from '../prisma/guild-tier.enum';

@ObjectType()
export class GuildMaxAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Guild_tier, {nullable:true})
    tier?: keyof typeof Guild_tier;

    @Field(() => String, {nullable:true})
    prefix?: string;
}
