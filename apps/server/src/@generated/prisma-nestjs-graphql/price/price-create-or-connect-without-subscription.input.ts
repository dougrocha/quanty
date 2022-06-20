import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceWhereUniqueInput } from './price-where-unique.input';
import { Type } from 'class-transformer';
import { PriceCreateWithoutSubscriptionInput } from './price-create-without-subscription.input';

@InputType()
export class PriceCreateOrConnectWithoutSubscriptionInput {

    @Field(() => PriceWhereUniqueInput, {nullable:false})
    @Type(() => PriceWhereUniqueInput)
    where!: PriceWhereUniqueInput;

    @Field(() => PriceCreateWithoutSubscriptionInput, {nullable:false})
    @Type(() => PriceCreateWithoutSubscriptionInput)
    create!: PriceCreateWithoutSubscriptionInput;
}
