import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionCreateWithoutCustomerInput } from './subscription-create-without-customer.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateOrConnectWithoutCustomerInput } from './subscription-create-or-connect-without-customer.input';
import { SubscriptionUpsertWithoutCustomerInput } from './subscription-upsert-without-customer.input';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';
import { SubscriptionUpdateWithoutCustomerInput } from './subscription-update-without-customer.input';

@InputType()
export class SubscriptionUpdateOneWithoutCustomerInput {

    @Field(() => SubscriptionCreateWithoutCustomerInput, {nullable:true})
    @Type(() => SubscriptionCreateWithoutCustomerInput)
    create?: SubscriptionCreateWithoutCustomerInput;

    @Field(() => SubscriptionCreateOrConnectWithoutCustomerInput, {nullable:true})
    @Type(() => SubscriptionCreateOrConnectWithoutCustomerInput)
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCustomerInput;

    @Field(() => SubscriptionUpsertWithoutCustomerInput, {nullable:true})
    @Type(() => SubscriptionUpsertWithoutCustomerInput)
    upsert?: SubscriptionUpsertWithoutCustomerInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => Boolean, {nullable:true})
    delete?: boolean;

    @Field(() => SubscriptionWhereUniqueInput, {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    connect?: SubscriptionWhereUniqueInput;

    @Field(() => SubscriptionUpdateWithoutCustomerInput, {nullable:true})
    @Type(() => SubscriptionUpdateWithoutCustomerInput)
    update?: SubscriptionUpdateWithoutCustomerInput;
}
