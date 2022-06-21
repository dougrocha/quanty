import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ProductCreateNestedOneWithoutPriceInput } from '../product/product-create-nested-one-without-price.input';
import { SubscriptionCreateNestedManyWithoutPriceInput } from '../subscription/subscription-create-nested-many-without-price.input';

@InputType()
export class PriceCreateInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Date, {nullable:false})
    recurringInterval!: Date | string;

    @Field(() => Int, {nullable:false})
    unit_amount!: number;

    @Field(() => String, {nullable:false})
    currency!: string;

    @Field(() => ProductCreateNestedOneWithoutPriceInput, {nullable:false})
    product!: ProductCreateNestedOneWithoutPriceInput;

    @Field(() => SubscriptionCreateNestedManyWithoutPriceInput, {nullable:true})
    subscription?: SubscriptionCreateNestedManyWithoutPriceInput;
}