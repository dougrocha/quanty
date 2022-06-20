import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CustomerCreateWithoutSubscriptionInput } from './customer-create-without-subscription.input';
import { Type } from 'class-transformer';
import { CustomerCreateOrConnectWithoutSubscriptionInput } from './customer-create-or-connect-without-subscription.input';
import { CustomerUpsertWithoutSubscriptionInput } from './customer-upsert-without-subscription.input';
import { CustomerWhereUniqueInput } from './customer-where-unique.input';
import { CustomerUpdateWithoutSubscriptionInput } from './customer-update-without-subscription.input';

@InputType()
export class CustomerUpdateOneRequiredWithoutSubscriptionInput {

    @Field(() => CustomerCreateWithoutSubscriptionInput, {nullable:true})
    @Type(() => CustomerCreateWithoutSubscriptionInput)
    create?: CustomerCreateWithoutSubscriptionInput;

    @Field(() => CustomerCreateOrConnectWithoutSubscriptionInput, {nullable:true})
    @Type(() => CustomerCreateOrConnectWithoutSubscriptionInput)
    connectOrCreate?: CustomerCreateOrConnectWithoutSubscriptionInput;

    @Field(() => CustomerUpsertWithoutSubscriptionInput, {nullable:true})
    @Type(() => CustomerUpsertWithoutSubscriptionInput)
    upsert?: CustomerUpsertWithoutSubscriptionInput;

    @Field(() => CustomerWhereUniqueInput, {nullable:true})
    @Type(() => CustomerWhereUniqueInput)
    connect?: CustomerWhereUniqueInput;

    @Field(() => CustomerUpdateWithoutSubscriptionInput, {nullable:true})
    @Type(() => CustomerUpdateWithoutSubscriptionInput)
    update?: CustomerUpdateWithoutSubscriptionInput;
}
