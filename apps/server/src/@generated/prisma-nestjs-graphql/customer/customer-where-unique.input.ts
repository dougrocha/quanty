import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class CustomerWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    @Validator.IsEmail()
    email?: string;

    @Field(() => String, {nullable:true})
    userId?: string;
}