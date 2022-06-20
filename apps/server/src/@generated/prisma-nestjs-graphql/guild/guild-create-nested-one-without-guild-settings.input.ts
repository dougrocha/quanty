import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildCreateWithoutGuildSettingsInput } from './guild-create-without-guild-settings.input';
import { Type } from 'class-transformer';
import { GuildCreateOrConnectWithoutGuildSettingsInput } from './guild-create-or-connect-without-guild-settings.input';
import { GuildWhereUniqueInput } from './guild-where-unique.input';

@InputType()
export class GuildCreateNestedOneWithoutGuildSettingsInput {

    @Field(() => GuildCreateWithoutGuildSettingsInput, {nullable:true})
    @Type(() => GuildCreateWithoutGuildSettingsInput)
    create?: GuildCreateWithoutGuildSettingsInput;

    @Field(() => GuildCreateOrConnectWithoutGuildSettingsInput, {nullable:true})
    @Type(() => GuildCreateOrConnectWithoutGuildSettingsInput)
    connectOrCreate?: GuildCreateOrConnectWithoutGuildSettingsInput;

    @Field(() => GuildWhereUniqueInput, {nullable:true})
    @Type(() => GuildWhereUniqueInput)
    connect?: GuildWhereUniqueInput;
}
