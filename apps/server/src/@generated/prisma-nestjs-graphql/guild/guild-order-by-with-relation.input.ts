import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SubscriptionOrderByWithRelationInput } from '../subscription/subscription-order-by-with-relation.input';
import { GuildSettingsOrderByWithRelationInput } from '../guild-settings/guild-settings-order-by-with-relation.input';
import { GuildPluginsOrderByWithRelationInput } from '../guild-plugins/guild-plugins-order-by-with-relation.input';

@InputType()
export class GuildOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    tier?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    prefix?: keyof typeof SortOrder;

    @Field(() => SubscriptionOrderByWithRelationInput, {nullable:true})
    subscription?: SubscriptionOrderByWithRelationInput;

    @Field(() => GuildSettingsOrderByWithRelationInput, {nullable:true})
    guildSettings?: GuildSettingsOrderByWithRelationInput;

    @Field(() => GuildPluginsOrderByWithRelationInput, {nullable:true})
    guildPlugins?: GuildPluginsOrderByWithRelationInput;
}
