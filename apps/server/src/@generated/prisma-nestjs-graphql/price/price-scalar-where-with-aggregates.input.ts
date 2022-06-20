import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class PriceScalarWhereWithAggregatesInput {

    @Field(() => [PriceScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<PriceScalarWhereWithAggregatesInput>;

    @Field(() => [PriceScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<PriceScalarWhereWithAggregatesInput>;

    @Field(() => [PriceScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<PriceScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    recurringInterval?: DateTimeWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    unit_amount?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    currency?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    productId?: StringWithAggregatesFilter;
}
