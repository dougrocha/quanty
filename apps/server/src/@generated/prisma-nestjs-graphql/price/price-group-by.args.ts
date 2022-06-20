import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PriceWhereInput } from './price-where.input';
import { Type } from 'class-transformer';
import { PriceOrderByWithAggregationInput } from './price-order-by-with-aggregation.input';
import { PriceScalarFieldEnum } from './price-scalar-field.enum';
import { PriceScalarWhereWithAggregatesInput } from './price-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { PriceCountAggregateInput } from './price-count-aggregate.input';
import { PriceAvgAggregateInput } from './price-avg-aggregate.input';
import { PriceSumAggregateInput } from './price-sum-aggregate.input';
import { PriceMinAggregateInput } from './price-min-aggregate.input';
import { PriceMaxAggregateInput } from './price-max-aggregate.input';

@ArgsType()
export class PriceGroupByArgs {

    @Field(() => PriceWhereInput, {nullable:true})
    @Type(() => PriceWhereInput)
    where?: PriceWhereInput;

    @Field(() => [PriceOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<PriceOrderByWithAggregationInput>;

    @Field(() => [PriceScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof PriceScalarFieldEnum>;

    @Field(() => PriceScalarWhereWithAggregatesInput, {nullable:true})
    having?: PriceScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => PriceCountAggregateInput, {nullable:true})
    _count?: PriceCountAggregateInput;

    @Field(() => PriceAvgAggregateInput, {nullable:true})
    _avg?: PriceAvgAggregateInput;

    @Field(() => PriceSumAggregateInput, {nullable:true})
    _sum?: PriceSumAggregateInput;

    @Field(() => PriceMinAggregateInput, {nullable:true})
    _min?: PriceMinAggregateInput;

    @Field(() => PriceMaxAggregateInput, {nullable:true})
    _max?: PriceMaxAggregateInput;
}
