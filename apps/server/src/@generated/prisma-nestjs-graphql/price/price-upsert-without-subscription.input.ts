import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceUpdateWithoutSubscriptionInput } from './price-update-without-subscription.input';
import { Type } from 'class-transformer';
import { PriceCreateWithoutSubscriptionInput } from './price-create-without-subscription.input';

@InputType()
export class PriceUpsertWithoutSubscriptionInput {

    @Field(() => PriceUpdateWithoutSubscriptionInput, {nullable:false})
    @Type(() => PriceUpdateWithoutSubscriptionInput)
    update!: PriceUpdateWithoutSubscriptionInput;

    @Field(() => PriceCreateWithoutSubscriptionInput, {nullable:false})
    @Type(() => PriceCreateWithoutSubscriptionInput)
    create!: PriceCreateWithoutSubscriptionInput;
}
