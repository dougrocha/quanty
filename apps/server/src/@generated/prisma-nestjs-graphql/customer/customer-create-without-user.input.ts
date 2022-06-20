import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { SubscriptionCreateNestedManyWithoutCustomerInput } from '../subscription/subscription-create-nested-many-without-customer.input';

@InputType()
export class CustomerCreateWithoutUserInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    @Validator.IsEmail()
    email?: string;

    @Field(() => Boolean, {nullable:true})
    subscriptionId?: boolean;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => SubscriptionCreateNestedManyWithoutCustomerInput, {nullable:true})
    subscription?: SubscriptionCreateNestedManyWithoutCustomerInput;
}
