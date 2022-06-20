import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { GuildRelationFilter } from '../guild/guild-relation-filter.input';

@InputType()
export class GuildSettingsWhereInput {

    @Field(() => [GuildSettingsWhereInput], {nullable:true})
    AND?: Array<GuildSettingsWhereInput>;

    @Field(() => [GuildSettingsWhereInput], {nullable:true})
    OR?: Array<GuildSettingsWhereInput>;

    @Field(() => [GuildSettingsWhereInput], {nullable:true})
    NOT?: Array<GuildSettingsWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    defaultJoinRole?: StringFilter;

    @Field(() => BoolFilter, {nullable:true})
    nsfw?: BoolFilter;

    @Field(() => IntFilter, {nullable:true})
    globalCooldown?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    djRole?: StringFilter;

    @Field(() => BoolFilter, {nullable:true})
    musicTimeOut?: BoolFilter;

    @Field(() => GuildRelationFilter, {nullable:true})
    guild?: GuildRelationFilter;
}
