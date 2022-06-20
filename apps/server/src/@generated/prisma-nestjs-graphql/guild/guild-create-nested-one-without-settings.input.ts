import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildCreateWithoutSettingsInput } from './guild-create-without-settings.input';
import { Type } from 'class-transformer';
import { GuildCreateOrConnectWithoutSettingsInput } from './guild-create-or-connect-without-settings.input';
import { GuildWhereUniqueInput } from './guild-where-unique.input';

@InputType()
export class GuildCreateNestedOneWithoutSettingsInput {

    @Field(() => GuildCreateWithoutSettingsInput, {nullable:true})
    @Type(() => GuildCreateWithoutSettingsInput)
    create?: GuildCreateWithoutSettingsInput;

    @Field(() => GuildCreateOrConnectWithoutSettingsInput, {nullable:true})
    @Type(() => GuildCreateOrConnectWithoutSettingsInput)
    connectOrCreate?: GuildCreateOrConnectWithoutSettingsInput;

    @Field(() => GuildWhereUniqueInput, {nullable:true})
    @Type(() => GuildWhereUniqueInput)
    connect?: GuildWhereUniqueInput;
}
