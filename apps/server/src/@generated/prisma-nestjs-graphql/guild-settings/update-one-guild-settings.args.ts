import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildSettingsUpdateInput } from './guild-settings-update.input';
import { Type } from 'class-transformer';
import { GuildSettingsWhereUniqueInput } from './guild-settings-where-unique.input';

@ArgsType()
export class UpdateOneGuildSettingsArgs {

    @Field(() => GuildSettingsUpdateInput, {nullable:false})
    @Type(() => GuildSettingsUpdateInput)
    data!: GuildSettingsUpdateInput;

    @Field(() => GuildSettingsWhereUniqueInput, {nullable:false})
    @Type(() => GuildSettingsWhereUniqueInput)
    where!: GuildSettingsWhereUniqueInput;
}
