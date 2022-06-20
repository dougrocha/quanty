import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildPluginsCreateInput } from './guild-plugins-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneGuildPluginsArgs {

    @Field(() => GuildPluginsCreateInput, {nullable:false})
    @Type(() => GuildPluginsCreateInput)
    data!: GuildPluginsCreateInput;
}
