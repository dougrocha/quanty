import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SubscriptionUpdateManyMutationInput } from './subscription-update-many-mutation.input';
import { Type } from 'class-transformer';
import { SubscriptionWhereInput } from './subscription-where.input';

@ArgsType()
export class UpdateManySubscriptionArgs {

    @Field(() => SubscriptionUpdateManyMutationInput, {nullable:false})
    @Type(() => SubscriptionUpdateManyMutationInput)
    data!: SubscriptionUpdateManyMutationInput;

    @Field(() => SubscriptionWhereInput, {nullable:true})
    @Type(() => SubscriptionWhereInput)
    where?: SubscriptionWhereInput;
}
