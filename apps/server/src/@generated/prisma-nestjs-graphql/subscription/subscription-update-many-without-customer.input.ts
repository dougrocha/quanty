import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionCreateWithoutCustomerInput } from './subscription-create-without-customer.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateOrConnectWithoutCustomerInput } from './subscription-create-or-connect-without-customer.input';
import { SubscriptionUpsertWithWhereUniqueWithoutCustomerInput } from './subscription-upsert-with-where-unique-without-customer.input';
import { SubscriptionCreateManyCustomerInputEnvelope } from './subscription-create-many-customer-input-envelope.input';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';
import { SubscriptionUpdateWithWhereUniqueWithoutCustomerInput } from './subscription-update-with-where-unique-without-customer.input';
import { SubscriptionUpdateManyWithWhereWithoutCustomerInput } from './subscription-update-many-with-where-without-customer.input';
import { SubscriptionScalarWhereInput } from './subscription-scalar-where.input';

@InputType()
export class SubscriptionUpdateManyWithoutCustomerInput {

    @Field(() => [SubscriptionCreateWithoutCustomerInput], {nullable:true})
    @Type(() => SubscriptionCreateWithoutCustomerInput)
    create?: Array<SubscriptionCreateWithoutCustomerInput>;

    @Field(() => [SubscriptionCreateOrConnectWithoutCustomerInput], {nullable:true})
    @Type(() => SubscriptionCreateOrConnectWithoutCustomerInput)
    connectOrCreate?: Array<SubscriptionCreateOrConnectWithoutCustomerInput>;

    @Field(() => [SubscriptionUpsertWithWhereUniqueWithoutCustomerInput], {nullable:true})
    @Type(() => SubscriptionUpsertWithWhereUniqueWithoutCustomerInput)
    upsert?: Array<SubscriptionUpsertWithWhereUniqueWithoutCustomerInput>;

    @Field(() => SubscriptionCreateManyCustomerInputEnvelope, {nullable:true})
    @Type(() => SubscriptionCreateManyCustomerInputEnvelope)
    createMany?: SubscriptionCreateManyCustomerInputEnvelope;

    @Field(() => [SubscriptionWhereUniqueInput], {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    set?: Array<SubscriptionWhereUniqueInput>;

    @Field(() => [SubscriptionWhereUniqueInput], {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    disconnect?: Array<SubscriptionWhereUniqueInput>;

    @Field(() => [SubscriptionWhereUniqueInput], {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    delete?: Array<SubscriptionWhereUniqueInput>;

    @Field(() => [SubscriptionWhereUniqueInput], {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    connect?: Array<SubscriptionWhereUniqueInput>;

    @Field(() => [SubscriptionUpdateWithWhereUniqueWithoutCustomerInput], {nullable:true})
    @Type(() => SubscriptionUpdateWithWhereUniqueWithoutCustomerInput)
    update?: Array<SubscriptionUpdateWithWhereUniqueWithoutCustomerInput>;

    @Field(() => [SubscriptionUpdateManyWithWhereWithoutCustomerInput], {nullable:true})
    @Type(() => SubscriptionUpdateManyWithWhereWithoutCustomerInput)
    updateMany?: Array<SubscriptionUpdateManyWithWhereWithoutCustomerInput>;

    @Field(() => [SubscriptionScalarWhereInput], {nullable:true})
    @Type(() => SubscriptionScalarWhereInput)
    deleteMany?: Array<SubscriptionScalarWhereInput>;
}
