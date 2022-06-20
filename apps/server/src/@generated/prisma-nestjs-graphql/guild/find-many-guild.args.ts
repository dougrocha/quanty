import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildWhereInput } from './guild-where.input';
import { Type } from 'class-transformer';
import { GuildOrderByWithRelationInput } from './guild-order-by-with-relation.input';
import { GuildWhereUniqueInput } from './guild-where-unique.input';
import { Int } from '@nestjs/graphql';
import { GuildScalarFieldEnum } from './guild-scalar-field.enum';

@ArgsType()
export class FindManyGuildArgs {

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

    @Field(() => [GuildScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof GuildScalarFieldEnum>;
}
