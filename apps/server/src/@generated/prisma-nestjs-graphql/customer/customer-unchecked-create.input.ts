import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { SubscriptionUncheckedCreateNestedManyWithoutCustomerInput } from '../subscription/subscription-unchecked-create-nested-many-without-customer.input';

@InputType()
export class CustomerUncheckedCreateInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    @Validator.IsEmail()
    email?: string;

    @Field(() => Boolean, {nullable:true})
    subscriptionId?: boolean;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:true})
    userId?: string;

    @Field(() => SubscriptionUncheckedCreateNestedManyWithoutCustomerInput, {nullable:true})
    subscription?: SubscriptionUncheckedCreateNestedManyWithoutCustomerInput;
}
