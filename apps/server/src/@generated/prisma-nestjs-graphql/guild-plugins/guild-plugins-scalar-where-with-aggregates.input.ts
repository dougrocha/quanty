import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';

@InputType()
export class GuildPluginsScalarWhereWithAggregatesInput {

    @Field(() => [GuildPluginsScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<GuildPluginsScalarWhereWithAggregatesInput>;

    @Field(() => [GuildPluginsScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<GuildPluginsScalarWhereWithAggregatesInput>;

    @Field(() => [GuildPluginsScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<GuildPluginsScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    autoMod?: BoolWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    anime?: BoolWithAggregatesFilter;
}
