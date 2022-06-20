import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CustomerWhereUniqueInput } from './customer-where-unique.input';
import { Type } from 'class-transformer';
import { CustomerCreateWithoutUserInput } from './customer-create-without-user.input';

@InputType()
export class CustomerCreateOrConnectWithoutUserInput {

    @Field(() => CustomerWhereUniqueInput, {nullable:false})
    @Type(() => CustomerWhereUniqueInput)
    where!: CustomerWhereUniqueInput;

    @Field(() => CustomerCreateWithoutUserInput, {nullable:false})
    @Type(() => CustomerCreateWithoutUserInput)
    create!: CustomerCreateWithoutUserInput;
}
