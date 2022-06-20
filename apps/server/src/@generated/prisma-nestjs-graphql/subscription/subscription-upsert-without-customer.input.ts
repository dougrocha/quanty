import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionUpdateWithoutCustomerInput } from './subscription-update-without-customer.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateWithoutCustomerInput } from './subscription-create-without-customer.input';

@InputType()
export class SubscriptionUpsertWithoutCustomerInput {

    @Field(() => SubscriptionUpdateWithoutCustomerInput, {nullable:false})
    @Type(() => SubscriptionUpdateWithoutCustomerInput)
    update!: SubscriptionUpdateWithoutCustomerInput;

    @Field(() => SubscriptionCreateWithoutCustomerInput, {nullable:false})
    @Type(() => SubscriptionCreateWithoutCustomerInput)
    create!: SubscriptionCreateWithoutCustomerInput;
}
