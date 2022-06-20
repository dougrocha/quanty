import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildUpdateWithoutSettingsInput } from './guild-update-without-settings.input';
import { Type } from 'class-transformer';
import { GuildCreateWithoutSettingsInput } from './guild-create-without-settings.input';

@InputType()
export class GuildUpsertWithoutSettingsInput {

    @Field(() => GuildUpdateWithoutSettingsInput, {nullable:false})
    @Type(() => GuildUpdateWithoutSettingsInput)
    update!: GuildUpdateWithoutSettingsInput;

    @Field(() => GuildCreateWithoutSettingsInput, {nullable:false})
    @Type(() => GuildCreateWithoutSettingsInput)
    create!: GuildCreateWithoutSettingsInput;
}
