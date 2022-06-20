import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildPluginsWhereInput } from './guild-plugins-where.input';
import { Type } from 'class-transformer';
import { GuildPluginsOrderByWithRelationInput } from './guild-plugins-order-by-with-relation.input';
import { GuildPluginsWhereUniqueInput } from './guild-plugins-where-unique.input';
import { Int } from '@nestjs/graphql';
import { GuildPluginsScalarFieldEnum } from './guild-plugins-scalar-field.enum';

@ArgsType()
export class FindFirstGuildPluginsArgs {

    @Field(() => GuildPluginsWhereInput, {nullable:true})
    @Type(() => GuildPluginsWhereInput)
    where?: GuildPluginsWhereInput;

    @Field(() => [GuildPluginsOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<GuildPluginsOrderByWithRelationInput>;

    @Field(() => GuildPluginsWhereUniqueInput, {nullable:true})
    cursor?: GuildPluginsWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [GuildPluginsScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof GuildPluginsScalarFieldEnum>;
}
