import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PremiumTier } from '../prisma/premium-tier.enum';
import { SubscriptionUncheckedCreateNestedOneWithoutGuildInput } from '../subscription/subscription-unchecked-create-nested-one-without-guild.input';
import { GuildPluginsUncheckedCreateNestedOneWithoutGuildInput } from '../guild-plugins/guild-plugins-unchecked-create-nested-one-without-guild.input';

@InputType()
export class GuildUncheckedCreateWithoutSettingsInput {

    @Field(() => String, {nullable:false})
    guildId!: string;

    @Field(() => PremiumTier, {nullable:true})
    tier?: keyof typeof PremiumTier;

    @Field(() => String, {nullable:false})
    prefix!: string;

    @Field(() => SubscriptionUncheckedCreateNestedOneWithoutGuildInput, {nullable:true})
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutGuildInput;

    @Field(() => GuildPluginsUncheckedCreateNestedOneWithoutGuildInput, {nullable:true})
    guildPlugins?: GuildPluginsUncheckedCreateNestedOneWithoutGuildInput;
}
