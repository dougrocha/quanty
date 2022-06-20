import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildWhereUniqueInput } from './guild-where-unique.input';
import { Type } from 'class-transformer';
import { GuildCreateInput } from './guild-create.input';
import { GuildUpdateInput } from './guild-update.input';

@ArgsType()
export class UpsertOneGuildArgs {

    @Field(() => GuildWhereUniqueInput, {nullable:false})
    @Type(() => GuildWhereUniqueInput)
    where!: GuildWhereUniqueInput;

    @Field(() => GuildCreateInput, {nullable:false})
    @Type(() => GuildCreateInput)
    create!: GuildCreateInput;

    @Field(() => GuildUpdateInput, {nullable:false})
    @Type(() => GuildUpdateInput)
    update!: GuildUpdateInput;
}
