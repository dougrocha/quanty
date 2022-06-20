import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SubscriptionCreateManyInput } from './subscription-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManySubscriptionArgs {

    @Field(() => [SubscriptionCreateManyInput], {nullable:false})
    @Type(() => SubscriptionCreateManyInput)
    data!: Array<SubscriptionCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
