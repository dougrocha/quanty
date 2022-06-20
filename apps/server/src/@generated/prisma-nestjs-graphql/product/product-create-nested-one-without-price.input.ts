import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductCreateWithoutPriceInput } from './product-create-without-price.input';
import { Type } from 'class-transformer';
import { ProductCreateOrConnectWithoutPriceInput } from './product-create-or-connect-without-price.input';
import { ProductWhereUniqueInput } from './product-where-unique.input';

@InputType()
export class ProductCreateNestedOneWithoutPriceInput {

    @Field(() => ProductCreateWithoutPriceInput, {nullable:true})
    @Type(() => ProductCreateWithoutPriceInput)
    create?: ProductCreateWithoutPriceInput;

    @Field(() => ProductCreateOrConnectWithoutPriceInput, {nullable:true})
    @Type(() => ProductCreateOrConnectWithoutPriceInput)
    connectOrCreate?: ProductCreateOrConnectWithoutPriceInput;

    @Field(() => ProductWhereUniqueInput, {nullable:true})
    @Type(() => ProductWhereUniqueInput)
    connect?: ProductWhereUniqueInput;
}
