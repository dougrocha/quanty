import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { EnumGuild_tierWithAggregatesFilter } from '../prisma/enum-guild-tier-with-aggregates-filter.input';

@InputType()
export class GuildScalarWhereWithAggregatesInput {

    @Field(() => [GuildScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<GuildScalarWhereWithAggregatesInput>;

    @Field(() => [GuildScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<GuildScalarWhereWithAggregatesInput>;

    @Field(() => [GuildScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<GuildScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => EnumGuild_tierWithAggregatesFilter, {nullable:true})
    tier?: EnumGuild_tierWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    prefix?: StringWithAggregatesFilter;
}
