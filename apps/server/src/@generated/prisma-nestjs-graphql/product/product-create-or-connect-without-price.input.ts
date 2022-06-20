import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductWhereUniqueInput } from './product-where-unique.input';
import { Type } from 'class-transformer';
import { ProductCreateWithoutPriceInput } from './product-create-without-price.input';

@InputType()
export class ProductCreateOrConnectWithoutPriceInput {

    @Field(() => ProductWhereUniqueInput, {nullable:false})
    @Type(() => ProductWhereUniqueInput)
    where!: ProductWhereUniqueInput;

    @Field(() => ProductCreateWithoutPriceInput, {nullable:false})
    @Type(() => ProductCreateWithoutPriceInput)
    create!: ProductCreateWithoutPriceInput;
}
