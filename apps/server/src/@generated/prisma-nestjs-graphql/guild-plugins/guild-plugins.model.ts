import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Guild } from '../guild/guild.model';

@ObjectType()
export class GuildPlugins {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    autoMod!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    anime!: boolean;

    @Field(() => Guild, {nullable:false})
    guild?: Guild;
}
