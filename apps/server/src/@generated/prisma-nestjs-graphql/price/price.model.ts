import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Product } from '../product/product.model';
import { Subscription } from '../subscription/subscription.model';
import { PriceCount } from './price-count.output';

@ObjectType()
export class Price {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => Date, {nullable:false})
    recurringInterval!: Date;

    @Field(() => Int, {nullable:false})
    unit_amount!: number;

    @Field(() => String, {nullable:false})
    currency!: string;

    @Field(() => Product, {nullable:false})
    product?: Product;

    @Field(() => String, {nullable:false})
    productId!: string;

    @Field(() => [Subscription], {nullable:true})
    subscription?: Array<Subscription>;

    @Field(() => PriceCount, {nullable:false})
    _count?: PriceCount;
}
