import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildSettingsUpdateManyMutationInput } from './guild-settings-update-many-mutation.input';
import { Type } from 'class-transformer';
import { GuildSettingsWhereInput } from './guild-settings-where.input';

@ArgsType()
export class UpdateManyGuildSettingsArgs {

    @Field(() => GuildSettingsUpdateManyMutationInput, {nullable:false})
    @Type(() => GuildSettingsUpdateManyMutationInput)
    data!: GuildSettingsUpdateManyMutationInput;

    @Field(() => GuildSettingsWhereInput, {nullable:true})
    @Type(() => GuildSettingsWhereInput)
    where?: GuildSettingsWhereInput;
}
