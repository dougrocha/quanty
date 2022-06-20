import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceUpdateWithoutProductInput } from './price-update-without-product.input';
import { Type } from 'class-transformer';
import { PriceCreateWithoutProductInput } from './price-create-without-product.input';

@InputType()
export class PriceUpsertWithoutProductInput {

    @Field(() => PriceUpdateWithoutProductInput, {nullable:false})
    @Type(() => PriceUpdateWithoutProductInput)
    update!: PriceUpdateWithoutProductInput;

    @Field(() => PriceCreateWithoutProductInput, {nullable:false})
    @Type(() => PriceCreateWithoutProductInput)
    create!: PriceCreateWithoutProductInput;
}
