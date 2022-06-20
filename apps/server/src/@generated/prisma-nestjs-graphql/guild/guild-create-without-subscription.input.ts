import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Guild_tier } from '../prisma/guild-tier.enum';
import { GuildSettingsCreateNestedOneWithoutGuildInput } from '../guild-settings/guild-settings-create-nested-one-without-guild.input';
import { GuildPluginsCreateNestedOneWithoutGuildInput } from '../guild-plugins/guild-plugins-create-nested-one-without-guild.input';

@InputType()
export class GuildCreateWithoutSubscriptionInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Guild_tier, {nullable:true})
    tier?: keyof typeof Guild_tier;

    @Field(() => String, {nullable:true})
    prefix?: string;

    @Field(() => GuildSettingsCreateNestedOneWithoutGuildInput, {nullable:true})
    guildSettings?: GuildSettingsCreateNestedOneWithoutGuildInput;

    @Field(() => GuildPluginsCreateNestedOneWithoutGuildInput, {nullable:true})
    guildPlugins?: GuildPluginsCreateNestedOneWithoutGuildInput;
}
