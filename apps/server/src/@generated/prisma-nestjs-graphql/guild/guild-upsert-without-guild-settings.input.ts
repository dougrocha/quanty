import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildUpdateWithoutGuildSettingsInput } from './guild-update-without-guild-settings.input';
import { Type } from 'class-transformer';
import { GuildCreateWithoutGuildSettingsInput } from './guild-create-without-guild-settings.input';

@InputType()
export class GuildUpsertWithoutGuildSettingsInput {

    @Field(() => GuildUpdateWithoutGuildSettingsInput, {nullable:false})
    @Type(() => GuildUpdateWithoutGuildSettingsInput)
    update!: GuildUpdateWithoutGuildSettingsInput;

    @Field(() => GuildCreateWithoutGuildSettingsInput, {nullable:false})
    @Type(() => GuildCreateWithoutGuildSettingsInput)
    create!: GuildCreateWithoutGuildSettingsInput;
}
