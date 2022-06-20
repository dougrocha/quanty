import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class GuildSettingsSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    globalCooldown?: keyof typeof SortOrder;
}
