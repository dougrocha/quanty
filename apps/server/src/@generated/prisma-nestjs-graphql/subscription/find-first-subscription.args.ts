import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SubscriptionWhereInput } from './subscription-where.input';
import { Type } from 'class-transformer';
import { SubscriptionOrderByWithRelationInput } from './subscription-order-by-with-relation.input';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';
import { Int } from '@nestjs/graphql';
import { SubscriptionScalarFieldEnum } from './subscription-scalar-field.enum';

@ArgsType()
export class FindFirstSubscriptionArgs {

    @Field(() => SubscriptionWhereInput, {nullable:true})
    @Type(() => SubscriptionWhereInput)
    where?: SubscriptionWhereInput;

    @Field(() => [SubscriptionOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<SubscriptionOrderByWithRelationInput>;

    @Field(() => SubscriptionWhereUniqueInput, {nullable:true})
    cursor?: SubscriptionWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [SubscriptionScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof SubscriptionScalarFieldEnum>;
}
