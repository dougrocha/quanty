import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutCustomerInput } from './user-update-without-customer.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCustomerInput } from './user-create-without-customer.input';

@InputType()
export class UserUpsertWithoutCustomerInput {

    @Field(() => UserUpdateWithoutCustomerInput, {nullable:false})
    @Type(() => UserUpdateWithoutCustomerInput)
    update!: UserUpdateWithoutCustomerInput;

    @Field(() => UserCreateWithoutCustomerInput, {nullable:false})
    @Type(() => UserCreateWithoutCustomerInput)
    create!: UserCreateWithoutCustomerInput;
}
