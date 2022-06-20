import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceWhereUniqueInput } from './price-where-unique.input';
import { Type } from 'class-transformer';
import { PriceCreateWithoutProductInput } from './price-create-without-product.input';

@InputType()
export class PriceCreateOrConnectWithoutProductInput {

    @Field(() => PriceWhereUniqueInput, {nullable:false})
    @Type(() => PriceWhereUniqueInput)
    where!: PriceWhereUniqueInput;

    @Field(() => PriceCreateWithoutProductInput, {nullable:false})
    @Type(() => PriceCreateWithoutProductInput)
    create!: PriceCreateWithoutProductInput;
}
