import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildPluginsCreateManyInput } from './guild-plugins-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyGuildPluginsArgs {

    @Field(() => [GuildPluginsCreateManyInput], {nullable:false})
    @Type(() => GuildPluginsCreateManyInput)
    data!: Array<GuildPluginsCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
