import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionCreateManyPriceInput } from './subscription-create-many-price.input';
import { Type } from 'class-transformer';

@InputType()
export class SubscriptionCreateManyPriceInputEnvelope {

    @Field(() => [SubscriptionCreateManyPriceInput], {nullable:false})
    @Type(() => SubscriptionCreateManyPriceInput)
    data!: Array<SubscriptionCreateManyPriceInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
