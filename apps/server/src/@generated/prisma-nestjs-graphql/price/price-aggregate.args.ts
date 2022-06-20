import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PriceWhereInput } from './price-where.input';
import { Type } from 'class-transformer';
import { PriceOrderByWithRelationInput } from './price-order-by-with-relation.input';
import { PriceWhereUniqueInput } from './price-where-unique.input';
import { Int } from '@nestjs/graphql';
import { PriceCountAggregateInput } from './price-count-aggregate.input';
import { PriceAvgAggregateInput } from './price-avg-aggregate.input';
import { PriceSumAggregateInput } from './price-sum-aggregate.input';
import { PriceMinAggregateInput } from './price-min-aggregate.input';
import { PriceMaxAggregateInput } from './price-max-aggregate.input';

@ArgsType()
export class PriceAggregateArgs {

    @Field(() => PriceWhereInput, {nullable:true})
    @Type(() => PriceWhereInput)
    where?: PriceWhereInput;

    @Field(() => [PriceOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PriceOrderByWithRelationInput>;

    @Field(() => PriceWhereUniqueInput, {nullable:true})
    cursor?: PriceWhereUniqueInput;

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
