import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionCreateWithoutCustomerInput } from './subscription-create-without-customer.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateOrConnectWithoutCustomerInput } from './subscription-create-or-connect-without-customer.input';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';

@InputType()
export class SubscriptionCreateNestedOneWithoutCustomerInput {

    @Field(() => SubscriptionCreateWithoutCustomerInput, {nullable:true})
    @Type(() => SubscriptionCreateWithoutCustomerInput)
    create?: SubscriptionCreateWithoutCustomerInput;

    @Field(() => SubscriptionCreateOrConnectWithoutCustomerInput, {nullable:true})
    @Type(() => SubscriptionCreateOrConnectWithoutCustomerInput)
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCustomerInput;

    @Field(() => SubscriptionWhereUniqueInput, {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    connect?: SubscriptionWhereUniqueInput;
}
