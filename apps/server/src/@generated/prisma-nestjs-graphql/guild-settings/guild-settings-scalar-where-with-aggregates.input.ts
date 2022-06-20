import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class GuildSettingsScalarWhereWithAggregatesInput {

    @Field(() => [GuildSettingsScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<GuildSettingsScalarWhereWithAggregatesInput>;

    @Field(() => [GuildSettingsScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<GuildSettingsScalarWhereWithAggregatesInput>;

    @Field(() => [GuildSettingsScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<GuildSettingsScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    defaultJoinRole?: StringWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    nsfw?: BoolWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    globalCooldown?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    djRole?: StringWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    musicTimeOut?: BoolWithAggregatesFilter;
}
