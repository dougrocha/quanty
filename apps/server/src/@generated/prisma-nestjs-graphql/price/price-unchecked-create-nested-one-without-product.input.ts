import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceCreateWithoutProductInput } from './price-create-without-product.input';
import { Type } from 'class-transformer';
import { PriceCreateOrConnectWithoutProductInput } from './price-create-or-connect-without-product.input';
import { PriceWhereUniqueInput } from './price-where-unique.input';

@InputType()
export class PriceUncheckedCreateNestedOneWithoutProductInput {

    @Field(() => PriceCreateWithoutProductInput, {nullable:true})
    @Type(() => PriceCreateWithoutProductInput)
    create?: PriceCreateWithoutProductInput;

    @Field(() => PriceCreateOrConnectWithoutProductInput, {nullable:true})
    @Type(() => PriceCreateOrConnectWithoutProductInput)
    connectOrCreate?: PriceCreateOrConnectWithoutProductInput;

    @Field(() => PriceWhereUniqueInput, {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    connect?: PriceWhereUniqueInput;
}
