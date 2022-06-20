import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { GuildOrderByWithRelationInput } from '../guild/guild-order-by-with-relation.input';

@InputType()
export class GuildPluginsOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    autoMod?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    anime?: keyof typeof SortOrder;

    @Field(() => GuildOrderByWithRelationInput, {nullable:true})
    guild?: GuildOrderByWithRelationInput;
}
