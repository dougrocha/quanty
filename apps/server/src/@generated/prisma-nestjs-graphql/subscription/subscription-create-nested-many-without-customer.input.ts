import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionCreateWithoutCustomerInput } from './subscription-create-without-customer.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateOrConnectWithoutCustomerInput } from './subscription-create-or-connect-without-customer.input';
import { SubscriptionCreateManyCustomerInputEnvelope } from './subscription-create-many-customer-input-envelope.input';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';

@InputType()
export class SubscriptionCreateNestedManyWithoutCustomerInput {

    @Field(() => [SubscriptionCreateWithoutCustomerInput], {nullable:true})
    @Type(() => SubscriptionCreateWithoutCustomerInput)
    create?: Array<SubscriptionCreateWithoutCustomerInput>;

    @Field(() => [SubscriptionCreateOrConnectWithoutCustomerInput], {nullable:true})
    @Type(() => SubscriptionCreateOrConnectWithoutCustomerInput)
    connectOrCreate?: Array<SubscriptionCreateOrConnectWithoutCustomerInput>;

    @Field(() => SubscriptionCreateManyCustomerInputEnvelope, {nullable:true})
    @Type(() => SubscriptionCreateManyCustomerInputEnvelope)
    createMany?: SubscriptionCreateManyCustomerInputEnvelope;

    @Field(() => [SubscriptionWhereUniqueInput], {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    connect?: Array<SubscriptionWhereUniqueInput>;
}
