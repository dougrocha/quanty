import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionScalarWhereInput } from './subscription-scalar-where.input';
import { Type } from 'class-transformer';
import { SubscriptionUpdateManyMutationInput } from './subscription-update-many-mutation.input';

@InputType()
export class SubscriptionUpdateManyWithWhereWithoutPriceInput {

    @Field(() => SubscriptionScalarWhereInput, {nullable:false})
    @Type(() => SubscriptionScalarWhereInput)
    where!: SubscriptionScalarWhereInput;

    @Field(() => SubscriptionUpdateManyMutationInput, {nullable:false})
    @Type(() => SubscriptionUpdateManyMutationInput)
    data!: SubscriptionUpdateManyMutationInput;
}
