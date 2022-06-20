import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumGuild_tierFilter } from '../prisma/enum-guild-tier-filter.input';
import { SubscriptionRelationFilter } from '../subscription/subscription-relation-filter.input';
import { GuildSettingsRelationFilter } from '../guild-settings/guild-settings-relation-filter.input';
import { GuildPluginsRelationFilter } from '../guild-plugins/guild-plugins-relation-filter.input';

@InputType()
export class GuildWhereInput {

    @Field(() => [GuildWhereInput], {nullable:true})
    AND?: Array<GuildWhereInput>;

    @Field(() => [GuildWhereInput], {nullable:true})
    OR?: Array<GuildWhereInput>;

    @Field(() => [GuildWhereInput], {nullable:true})
    NOT?: Array<GuildWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => EnumGuild_tierFilter, {nullable:true})
    tier?: EnumGuild_tierFilter;

    @Field(() => StringFilter, {nullable:true})
    prefix?: StringFilter;

    @Field(() => SubscriptionRelationFilter, {nullable:true})
    subscription?: SubscriptionRelationFilter;

    @Field(() => GuildSettingsRelationFilter, {nullable:true})
    guildSettings?: GuildSettingsRelationFilter;

    @Field(() => GuildPluginsRelationFilter, {nullable:true})
    guildPlugins?: GuildPluginsRelationFilter;
}
