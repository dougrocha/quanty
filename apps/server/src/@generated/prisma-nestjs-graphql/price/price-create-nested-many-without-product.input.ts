import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceCreateWithoutProductInput } from './price-create-without-product.input';
import { Type } from 'class-transformer';
import { PriceCreateOrConnectWithoutProductInput } from './price-create-or-connect-without-product.input';
import { PriceCreateManyProductInputEnvelope } from './price-create-many-product-input-envelope.input';
import { PriceWhereUniqueInput } from './price-where-unique.input';

@InputType()
export class PriceCreateNestedManyWithoutProductInput {

    @Field(() => [PriceCreateWithoutProductInput], {nullable:true})
    @Type(() => PriceCreateWithoutProductInput)
    create?: Array<PriceCreateWithoutProductInput>;

    @Field(() => [PriceCreateOrConnectWithoutProductInput], {nullable:true})
    @Type(() => PriceCreateOrConnectWithoutProductInput)
    connectOrCreate?: Array<PriceCreateOrConnectWithoutProductInput>;

    @Field(() => PriceCreateManyProductInputEnvelope, {nullable:true})
    @Type(() => PriceCreateManyProductInputEnvelope)
    createMany?: PriceCreateManyProductInputEnvelope;

    @Field(() => [PriceWhereUniqueInput], {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    connect?: Array<PriceWhereUniqueInput>;
}
