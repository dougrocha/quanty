import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { SubscriptionCreateNestedManyWithoutPriceInput } from '../subscription/subscription-create-nested-many-without-price.input';

@InputType()
export class PriceCreateWithoutProductInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Date, {nullable:false})
    recurringInterval!: Date | string;

    @Field(() => Int, {nullable:false})
    unit_amount!: number;

    @Field(() => String, {nullable:false})
    currency!: string;

    @Field(() => SubscriptionCreateNestedManyWithoutPriceInput, {nullable:true})
    subscription?: SubscriptionCreateNestedManyWithoutPriceInput;
}
