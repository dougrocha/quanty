import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateWithoutPriceInput } from './subscription-create-without-price.input';

@InputType()
export class SubscriptionCreateOrConnectWithoutPriceInput {

    @Field(() => SubscriptionWhereUniqueInput, {nullable:false})
    @Type(() => SubscriptionWhereUniqueInput)
    where!: SubscriptionWhereUniqueInput;

    @Field(() => SubscriptionCreateWithoutPriceInput, {nullable:false})
    @Type(() => SubscriptionCreateWithoutPriceInput)
    create!: SubscriptionCreateWithoutPriceInput;
}
