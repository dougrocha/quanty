import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumGuild_tierFieldUpdateOperationsInput } from '../prisma/enum-guild-tier-field-update-operations.input';
import { SubscriptionUncheckedUpdateOneWithoutGuildInput } from '../subscription/subscription-unchecked-update-one-without-guild.input';
import { GuildSettingsUncheckedUpdateOneWithoutGuildInput } from '../guild-settings/guild-settings-unchecked-update-one-without-guild.input';
import { GuildPluginsUncheckedUpdateOneWithoutGuildInput } from '../guild-plugins/guild-plugins-unchecked-update-one-without-guild.input';

@InputType()
export class GuildUncheckedUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => EnumGuild_tierFieldUpdateOperationsInput, {nullable:true})
    tier?: EnumGuild_tierFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    prefix?: StringFieldUpdateOperationsInput;

    @Field(() => SubscriptionUncheckedUpdateOneWithoutGuildInput, {nullable:true})
    subscription?: SubscriptionUncheckedUpdateOneWithoutGuildInput;

    @Field(() => GuildSettingsUncheckedUpdateOneWithoutGuildInput, {nullable:true})
    guildSettings?: GuildSettingsUncheckedUpdateOneWithoutGuildInput;

    @Field(() => GuildPluginsUncheckedUpdateOneWithoutGuildInput, {nullable:true})
    guildPlugins?: GuildPluginsUncheckedUpdateOneWithoutGuildInput;
}
