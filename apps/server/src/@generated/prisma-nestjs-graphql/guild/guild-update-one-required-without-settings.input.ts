import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildCreateWithoutSettingsInput } from './guild-create-without-settings.input';
import { Type } from 'class-transformer';
import { GuildCreateOrConnectWithoutSettingsInput } from './guild-create-or-connect-without-settings.input';
import { GuildUpsertWithoutSettingsInput } from './guild-upsert-without-settings.input';
import { GuildWhereUniqueInput } from './guild-where-unique.input';
import { GuildUpdateWithoutSettingsInput } from './guild-update-without-settings.input';

@InputType()
export class GuildUpdateOneRequiredWithoutSettingsInput {

    @Field(() => GuildCreateWithoutSettingsInput, {nullable:true})
    @Type(() => GuildCreateWithoutSettingsInput)
    create?: GuildCreateWithoutSettingsInput;

    @Field(() => GuildCreateOrConnectWithoutSettingsInput, {nullable:true})
    @Type(() => GuildCreateOrConnectWithoutSettingsInput)
    connectOrCreate?: GuildCreateOrConnectWithoutSettingsInput;

    @Field(() => GuildUpsertWithoutSettingsInput, {nullable:true})
    @Type(() => GuildUpsertWithoutSettingsInput)
    upsert?: GuildUpsertWithoutSettingsInput;

    @Field(() => GuildWhereUniqueInput, {nullable:true})
    @Type(() => GuildWhereUniqueInput)
    connect?: GuildWhereUniqueInput;

    @Field(() => GuildUpdateWithoutSettingsInput, {nullable:true})
    @Type(() => GuildUpdateWithoutSettingsInput)
    update?: GuildUpdateWithoutSettingsInput;
}
