import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PremiumTier } from '../prisma/premium-tier.enum';
import { SubscriptionCreateNestedOneWithoutGuildInput } from '../subscription/subscription-create-nested-one-without-guild.input';
import { GuildPluginsCreateNestedOneWithoutGuildInput } from '../guild-plugins/guild-plugins-create-nested-one-without-guild.input';

@InputType()
export class GuildCreateWithoutSettingsInput {

    @Field(() => String, {nullable:false})
    guildId!: string;

    @Field(() => PremiumTier, {nullable:true})
    tier?: keyof typeof PremiumTier;

    @Field(() => String, {nullable:false})
    prefix!: string;

    @Field(() => SubscriptionCreateNestedOneWithoutGuildInput, {nullable:true})
    subscription?: SubscriptionCreateNestedOneWithoutGuildInput;

    @Field(() => GuildPluginsCreateNestedOneWithoutGuildInput, {nullable:true})
    guildPlugins?: GuildPluginsCreateNestedOneWithoutGuildInput;
}
