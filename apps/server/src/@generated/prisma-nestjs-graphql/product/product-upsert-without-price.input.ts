import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductUpdateWithoutPriceInput } from './product-update-without-price.input';
import { Type } from 'class-transformer';
import { ProductCreateWithoutPriceInput } from './product-create-without-price.input';

@InputType()
export class ProductUpsertWithoutPriceInput {

    @Field(() => ProductUpdateWithoutPriceInput, {nullable:false})
    @Type(() => ProductUpdateWithoutPriceInput)
    update!: ProductUpdateWithoutPriceInput;

    @Field(() => ProductCreateWithoutPriceInput, {nullable:false})
    @Type(() => ProductCreateWithoutPriceInput)
    create!: ProductCreateWithoutPriceInput;
}
