import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Subscription } from '../subscription/subscription.model';
import { CustomerCount } from './customer-count.output';

@ObjectType()
export class Customer {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    email!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    subscriptionId!: boolean;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => User, {nullable:true})
    user?: User | null;

    @Field(() => String, {nullable:true})
    userId!: string | null;

    @Field(() => [Subscription], {nullable:true})
    subscription?: Array<Subscription>;

    @Field(() => CustomerCount, {nullable:false})
    _count?: CustomerCount;
}
