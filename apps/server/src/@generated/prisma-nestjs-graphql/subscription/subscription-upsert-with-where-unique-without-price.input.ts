import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';
import { Type } from 'class-transformer';
import { SubscriptionUpdateWithoutPriceInput } from './subscription-update-without-price.input';
import { SubscriptionCreateWithoutPriceInput } from './subscription-create-without-price.input';

@InputType()
export class SubscriptionUpsertWithWhereUniqueWithoutPriceInput {

    @Field(() => SubscriptionWhereUniqueInput, {nullable:false})
    @Type(() => SubscriptionWhereUniqueInput)
    where!: SubscriptionWhereUniqueInput;

    @Field(() => SubscriptionUpdateWithoutPriceInput, {nullable:false})
    @Type(() => SubscriptionUpdateWithoutPriceInput)
    update!: SubscriptionUpdateWithoutPriceInput;

    @Field(() => SubscriptionCreateWithoutPriceInput, {nullable:false})
    @Type(() => SubscriptionCreateWithoutPriceInput)
    create!: SubscriptionCreateWithoutPriceInput;
}
