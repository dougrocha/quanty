import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceCreateWithoutSubscriptionInput } from './price-create-without-subscription.input';
import { Type } from 'class-transformer';
import { PriceCreateOrConnectWithoutSubscriptionInput } from './price-create-or-connect-without-subscription.input';
import { PriceWhereUniqueInput } from './price-where-unique.input';

@InputType()
export class PriceCreateNestedOneWithoutSubscriptionInput {

    @Field(() => PriceCreateWithoutSubscriptionInput, {nullable:true})
    @Type(() => PriceCreateWithoutSubscriptionInput)
    create?: PriceCreateWithoutSubscriptionInput;

    @Field(() => PriceCreateOrConnectWithoutSubscriptionInput, {nullable:true})
    @Type(() => PriceCreateOrConnectWithoutSubscriptionInput)
    connectOrCreate?: PriceCreateOrConnectWithoutSubscriptionInput;

    @Field(() => PriceWhereUniqueInput, {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    connect?: PriceWhereUniqueInput;
}
