import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PriceWhereInput } from './price-where.input';
import { Type } from 'class-transformer';
import { PriceOrderByWithRelationInput } from './price-order-by-with-relation.input';
import { PriceWhereUniqueInput } from './price-where-unique.input';
import { Int } from '@nestjs/graphql';
import { PriceScalarFieldEnum } from './price-scalar-field.enum';

@ArgsType()
export class FindFirstPriceArgs {

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

    @Field(() => [PriceScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PriceScalarFieldEnum>;
}
