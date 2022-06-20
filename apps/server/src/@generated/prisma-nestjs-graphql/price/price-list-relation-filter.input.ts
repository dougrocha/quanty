import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceWhereInput } from './price-where.input';

@InputType()
export class PriceListRelationFilter {

    @Field(() => PriceWhereInput, {nullable:true})
    every?: PriceWhereInput;

    @Field(() => PriceWhereInput, {nullable:true})
    some?: PriceWhereInput;

    @Field(() => PriceWhereInput, {nullable:true})
    none?: PriceWhereInput;
}
