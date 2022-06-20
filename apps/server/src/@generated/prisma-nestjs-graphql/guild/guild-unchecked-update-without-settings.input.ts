import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumPremiumTierFieldUpdateOperationsInput } from '../prisma/enum-premium-tier-field-update-operations.input';
import { SubscriptionUncheckedUpdateOneWithoutGuildInput } from '../subscription/subscription-unchecked-update-one-without-guild.input';
import { GuildPluginsUncheckedUpdateOneWithoutGuildInput } from '../guild-plugins/guild-plugins-unchecked-update-one-without-guild.input';

@InputType()
export class GuildUncheckedUpdateWithoutSettingsInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    guildId?: StringFieldUpdateOperationsInput;

    @Field(() => EnumPremiumTierFieldUpdateOperationsInput, {nullable:true})
    tier?: EnumPremiumTierFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    prefix?: StringFieldUpdateOperationsInput;

    @Field(() => SubscriptionUncheckedUpdateOneWithoutGuildInput, {nullable:true})
    subscription?: SubscriptionUncheckedUpdateOneWithoutGuildInput;

    @Field(() => GuildPluginsUncheckedUpdateOneWithoutGuildInput, {nullable:true})
    guildPlugins?: GuildPluginsUncheckedUpdateOneWithoutGuildInput;
}
