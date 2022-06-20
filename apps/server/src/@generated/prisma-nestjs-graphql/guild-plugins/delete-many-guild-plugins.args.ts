import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildPluginsWhereInput } from './guild-plugins-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyGuildPluginsArgs {

    @Field(() => GuildPluginsWhereInput, {nullable:true})
    @Type(() => GuildPluginsWhereInput)
    where?: GuildPluginsWhereInput;
}
