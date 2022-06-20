import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionCreateWithoutPriceInput } from './subscription-create-without-price.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateOrConnectWithoutPriceInput } from './subscription-create-or-connect-without-price.input';
import { SubscriptionCreateManyPriceInputEnvelope } from './subscription-create-many-price-input-envelope.input';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';

@InputType()
export class SubscriptionCreateNestedManyWithoutPriceInput {

    @Field(() => [SubscriptionCreateWithoutPriceInput], {nullable:true})
    @Type(() => SubscriptionCreateWithoutPriceInput)
    create?: Array<SubscriptionCreateWithoutPriceInput>;

    @Field(() => [SubscriptionCreateOrConnectWithoutPriceInput], {nullable:true})
    @Type(() => SubscriptionCreateOrConnectWithoutPriceInput)
    connectOrCreate?: Array<SubscriptionCreateOrConnectWithoutPriceInput>;

    @Field(() => SubscriptionCreateManyPriceInputEnvelope, {nullable:true})
    @Type(() => SubscriptionCreateManyPriceInputEnvelope)
    createMany?: SubscriptionCreateManyPriceInputEnvelope;

    @Field(() => [SubscriptionWhereUniqueInput], {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    connect?: Array<SubscriptionWhereUniqueInput>;
}
