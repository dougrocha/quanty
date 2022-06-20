import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Guild_tier } from '../prisma/guild-tier.enum';
import { SubscriptionUncheckedCreateNestedOneWithoutGuildInput } from '../subscription/subscription-unchecked-create-nested-one-without-guild.input';
import { GuildPluginsUncheckedCreateNestedOneWithoutGuildInput } from '../guild-plugins/guild-plugins-unchecked-create-nested-one-without-guild.input';

@InputType()
export class GuildUncheckedCreateWithoutGuildSettingsInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Guild_tier, {nullable:true})
    tier?: keyof typeof Guild_tier;

    @Field(() => String, {nullable:true})
    prefix?: string;

    @Field(() => SubscriptionUncheckedCreateNestedOneWithoutGuildInput, {nullable:true})
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutGuildInput;

    @Field(() => GuildPluginsUncheckedCreateNestedOneWithoutGuildInput, {nullable:true})
    guildPlugins?: GuildPluginsUncheckedCreateNestedOneWithoutGuildInput;
}
