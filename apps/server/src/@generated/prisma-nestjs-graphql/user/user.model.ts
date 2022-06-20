import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Customer } from '../customer/customer.model';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    username!: string;

    @Field(() => String, {nullable:false})
    discriminator!: string;

    @Field(() => String, {nullable:true})
    email!: string | null;

    @Field(() => String, {nullable:true})
    avatar!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => String, {nullable:true})
    locale!: string | null;

    @HideField()
    accessToken!: string | null;

    @HideField()
    refreshToken!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    acceptedTermsAndConditions!: boolean;

    @Field(() => Customer, {nullable:true})
    customer?: Customer | null;
}
