import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateWithoutCustomerInput } from './subscription-create-without-customer.input';

@InputType()
export class SubscriptionCreateOrConnectWithoutCustomerInput {

    @Field(() => SubscriptionWhereUniqueInput, {nullable:false})
    @Type(() => SubscriptionWhereUniqueInput)
    where!: SubscriptionWhereUniqueInput;

    @Field(() => SubscriptionCreateWithoutCustomerInput, {nullable:false})
    @Type(() => SubscriptionCreateWithoutCustomerInput)
    create!: SubscriptionCreateWithoutCustomerInput;
}
