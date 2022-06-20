import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildUpdateInput } from './guild-update.input';
import { Type } from 'class-transformer';
import { GuildWhereUniqueInput } from './guild-where-unique.input';

@ArgsType()
export class UpdateOneGuildArgs {

    @Field(() => GuildUpdateInput, {nullable:false})
    @Type(() => GuildUpdateInput)
    data!: GuildUpdateInput;

    @Field(() => GuildWhereUniqueInput, {nullable:false})
    @Type(() => GuildWhereUniqueInput)
    where!: GuildWhereUniqueInput;
}
