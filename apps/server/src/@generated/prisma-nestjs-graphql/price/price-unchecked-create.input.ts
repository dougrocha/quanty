import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { SubscriptionUncheckedCreateNestedManyWithoutPriceInput } from '../subscription/subscription-unchecked-create-nested-many-without-price.input';

@InputType()
export class PriceUncheckedCreateInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Date, {nullable:false})
    recurringInterval!: Date | string;

    @Field(() => Int, {nullable:false})
    unit_amount!: number;

    @Field(() => String, {nullable:false})
    currency!: string;

    @Field(() => String, {nullable:false})
    productId!: string;

    @Field(() => SubscriptionUncheckedCreateNestedManyWithoutPriceInput, {nullable:true})
    subscription?: SubscriptionUncheckedCreateNestedManyWithoutPriceInput;
}
