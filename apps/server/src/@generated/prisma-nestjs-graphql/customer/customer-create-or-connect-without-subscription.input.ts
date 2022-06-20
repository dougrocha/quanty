import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CustomerWhereUniqueInput } from './customer-where-unique.input';
import { Type } from 'class-transformer';
import { CustomerCreateWithoutSubscriptionInput } from './customer-create-without-subscription.input';

@InputType()
export class CustomerCreateOrConnectWithoutSubscriptionInput {

    @Field(() => CustomerWhereUniqueInput, {nullable:false})
    @Type(() => CustomerWhereUniqueInput)
    where!: CustomerWhereUniqueInput;

    @Field(() => CustomerCreateWithoutSubscriptionInput, {nullable:false})
    @Type(() => CustomerCreateWithoutSubscriptionInput)
    create!: CustomerCreateWithoutSubscriptionInput;
}
