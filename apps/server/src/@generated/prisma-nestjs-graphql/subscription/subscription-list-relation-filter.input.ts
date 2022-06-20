import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionWhereInput } from './subscription-where.input';

@InputType()
export class SubscriptionListRelationFilter {

    @Field(() => SubscriptionWhereInput, {nullable:true})
    every?: SubscriptionWhereInput;

    @Field(() => SubscriptionWhereInput, {nullable:true})
    some?: SubscriptionWhereInput;

    @Field(() => SubscriptionWhereInput, {nullable:true})
    none?: SubscriptionWhereInput;
}
