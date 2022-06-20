import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PriceAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    unit_amount?: keyof typeof SortOrder;
}
