import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceCreateWithoutSubscriptionInput } from './price-create-without-subscription.input';
import { Type } from 'class-transformer';
import { PriceCreateOrConnectWithoutSubscriptionInput } from './price-create-or-connect-without-subscription.input';
import { PriceUpsertWithoutSubscriptionInput } from './price-upsert-without-subscription.input';
import { PriceWhereUniqueInput } from './price-where-unique.input';
import { PriceUpdateWithoutSubscriptionInput } from './price-update-without-subscription.input';

@InputType()
export class PriceUpdateOneRequiredWithoutSubscriptionInput {

    @Field(() => PriceCreateWithoutSubscriptionInput, {nullable:true})
    @Type(() => PriceCreateWithoutSubscriptionInput)
    create?: PriceCreateWithoutSubscriptionInput;

    @Field(() => PriceCreateOrConnectWithoutSubscriptionInput, {nullable:true})
    @Type(() => PriceCreateOrConnectWithoutSubscriptionInput)
    connectOrCreate?: PriceCreateOrConnectWithoutSubscriptionInput;

    @Field(() => PriceUpsertWithoutSubscriptionInput, {nullable:true})
    @Type(() => PriceUpsertWithoutSubscriptionInput)
    upsert?: PriceUpsertWithoutSubscriptionInput;

    @Field(() => PriceWhereUniqueInput, {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    connect?: PriceWhereUniqueInput;

    @Field(() => PriceUpdateWithoutSubscriptionInput, {nullable:true})
    @Type(() => PriceUpdateWithoutSubscriptionInput)
    update?: PriceUpdateWithoutSubscriptionInput;
}
