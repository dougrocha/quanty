import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildSettingsWhereUniqueInput } from './guild-settings-where-unique.input';
import { Type } from 'class-transformer';
import { GuildSettingsCreateWithoutGuildInput } from './guild-settings-create-without-guild.input';

@InputType()
export class GuildSettingsCreateOrConnectWithoutGuildInput {

    @Field(() => GuildSettingsWhereUniqueInput, {nullable:false})
    @Type(() => GuildSettingsWhereUniqueInput)
    where!: GuildSettingsWhereUniqueInput;

    @Field(() => GuildSettingsCreateWithoutGuildInput, {nullable:false})
    @Type(() => GuildSettingsCreateWithoutGuildInput)
    create!: GuildSettingsCreateWithoutGuildInput;
}
