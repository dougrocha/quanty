import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildUpdateWithoutGuildPluginsInput } from './guild-update-without-guild-plugins.input';
import { Type } from 'class-transformer';
import { GuildCreateWithoutGuildPluginsInput } from './guild-create-without-guild-plugins.input';

@InputType()
export class GuildUpsertWithoutGuildPluginsInput {

    @Field(() => GuildUpdateWithoutGuildPluginsInput, {nullable:false})
    @Type(() => GuildUpdateWithoutGuildPluginsInput)
    update!: GuildUpdateWithoutGuildPluginsInput;

    @Field(() => GuildCreateWithoutGuildPluginsInput, {nullable:false})
    @Type(() => GuildCreateWithoutGuildPluginsInput)
    create!: GuildCreateWithoutGuildPluginsInput;
}
