import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCustomerInput } from './user-create-without-customer.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCustomerInput } from './user-create-or-connect-without-customer.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutCustomerInput {

    @Field(() => UserCreateWithoutCustomerInput, {nullable:true})
    @Type(() => UserCreateWithoutCustomerInput)
    create?: UserCreateWithoutCustomerInput;

    @Field(() => UserCreateOrConnectWithoutCustomerInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCustomerInput)
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: UserWhereUniqueInput;
}
