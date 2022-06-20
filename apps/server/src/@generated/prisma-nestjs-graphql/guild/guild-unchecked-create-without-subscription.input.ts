import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Guild_tier } from '../prisma/guild-tier.enum';
import { GuildSettingsUncheckedCreateNestedOneWithoutGuildInput } from '../guild-settings/guild-settings-unchecked-create-nested-one-without-guild.input';
import { GuildPluginsUncheckedCreateNestedOneWithoutGuildInput } from '../guild-plugins/guild-plugins-unchecked-create-nested-one-without-guild.input';

@InputType()
export class GuildUncheckedCreateWithoutSubscriptionInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Guild_tier, {nullable:true})
    tier?: keyof typeof Guild_tier;

    @Field(() => String, {nullable:true})
    prefix?: string;

    @Field(() => GuildSettingsUncheckedCreateNestedOneWithoutGuildInput, {nullable:true})
    guildSettings?: GuildSettingsUncheckedCreateNestedOneWithoutGuildInput;

    @Field(() => GuildPluginsUncheckedCreateNestedOneWithoutGuildInput, {nullable:true})
    guildPlugins?: GuildPluginsUncheckedCreateNestedOneWithoutGuildInput;
}
