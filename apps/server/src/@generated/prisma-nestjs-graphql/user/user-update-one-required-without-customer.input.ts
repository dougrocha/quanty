import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCustomerInput } from './user-create-without-customer.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCustomerInput } from './user-create-or-connect-without-customer.input';
import { UserUpsertWithoutCustomerInput } from './user-upsert-without-customer.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutCustomerInput } from './user-update-without-customer.input';

@InputType()
export class UserUpdateOneRequiredWithoutCustomerInput {

    @Field(() => UserCreateWithoutCustomerInput, {nullable:true})
    @Type(() => UserCreateWithoutCustomerInput)
    create?: UserCreateWithoutCustomerInput;

    @Field(() => UserCreateOrConnectWithoutCustomerInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCustomerInput)
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput;

    @Field(() => UserUpsertWithoutCustomerInput, {nullable:true})
    @Type(() => UserUpsertWithoutCustomerInput)
    upsert?: UserUpsertWithoutCustomerInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: UserWhereUniqueInput;

    @Field(() => UserUpdateWithoutCustomerInput, {nullable:true})
    @Type(() => UserUpdateWithoutCustomerInput)
    update?: UserUpdateWithoutCustomerInput;
}
