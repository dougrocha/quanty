import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SubscriptionCreateInput } from './subscription-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneSubscriptionArgs {

    @Field(() => SubscriptionCreateInput, {nullable:false})
    @Type(() => SubscriptionCreateInput)
    data!: SubscriptionCreateInput;
}
