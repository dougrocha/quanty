import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceCreateWithoutProductInput } from './price-create-without-product.input';
import { Type } from 'class-transformer';
import { PriceCreateOrConnectWithoutProductInput } from './price-create-or-connect-without-product.input';
import { PriceUpsertWithoutProductInput } from './price-upsert-without-product.input';
import { PriceWhereUniqueInput } from './price-where-unique.input';
import { PriceUpdateWithoutProductInput } from './price-update-without-product.input';

@InputType()
export class PriceUncheckedUpdateOneWithoutProductInput {

    @Field(() => PriceCreateWithoutProductInput, {nullable:true})
    @Type(() => PriceCreateWithoutProductInput)
    create?: PriceCreateWithoutProductInput;

    @Field(() => PriceCreateOrConnectWithoutProductInput, {nullable:true})
    @Type(() => PriceCreateOrConnectWithoutProductInput)
    connectOrCreate?: PriceCreateOrConnectWithoutProductInput;

    @Field(() => PriceUpsertWithoutProductInput, {nullable:true})
    @Type(() => PriceUpsertWithoutProductInput)
    upsert?: PriceUpsertWithoutProductInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => Boolean, {nullable:true})
    delete?: boolean;

    @Field(() => PriceWhereUniqueInput, {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    connect?: PriceWhereUniqueInput;

    @Field(() => PriceUpdateWithoutProductInput, {nullable:true})
    @Type(() => PriceUpdateWithoutProductInput)
    update?: PriceUpdateWithoutProductInput;
}
