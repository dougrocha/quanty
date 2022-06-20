import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumPremiumTierFieldUpdateOperationsInput } from '../prisma/enum-premium-tier-field-update-operations.input';
import { SubscriptionUpdateOneWithoutGuildInput } from '../subscription/subscription-update-one-without-guild.input';
import { GuildPluginsUpdateOneWithoutGuildInput } from '../guild-plugins/guild-plugins-update-one-without-guild.input';

@InputType()
export class GuildUpdateWithoutSettingsInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    guildId?: StringFieldUpdateOperationsInput;

    @Field(() => EnumPremiumTierFieldUpdateOperationsInput, {nullable:true})
    tier?: EnumPremiumTierFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    prefix?: StringFieldUpdateOperationsInput;

    @Field(() => SubscriptionUpdateOneWithoutGuildInput, {nullable:true})
    subscription?: SubscriptionUpdateOneWithoutGuildInput;

    @Field(() => GuildPluginsUpdateOneWithoutGuildInput, {nullable:true})
    guildPlugins?: GuildPluginsUpdateOneWithoutGuildInput;
}
