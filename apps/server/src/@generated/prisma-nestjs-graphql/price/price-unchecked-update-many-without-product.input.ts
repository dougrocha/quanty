import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PriceCreateWithoutProductInput } from './price-create-without-product.input';
import { Type } from 'class-transformer';
import { PriceCreateOrConnectWithoutProductInput } from './price-create-or-connect-without-product.input';
import { PriceUpsertWithWhereUniqueWithoutProductInput } from './price-upsert-with-where-unique-without-product.input';
import { PriceCreateManyProductInputEnvelope } from './price-create-many-product-input-envelope.input';
import { PriceWhereUniqueInput } from './price-where-unique.input';
import { PriceUpdateWithWhereUniqueWithoutProductInput } from './price-update-with-where-unique-without-product.input';
import { PriceUpdateManyWithWhereWithoutProductInput } from './price-update-many-with-where-without-product.input';
import { PriceScalarWhereInput } from './price-scalar-where.input';

@InputType()
export class PriceUncheckedUpdateManyWithoutProductInput {

    @Field(() => [PriceCreateWithoutProductInput], {nullable:true})
    @Type(() => PriceCreateWithoutProductInput)
    create?: Array<PriceCreateWithoutProductInput>;

    @Field(() => [PriceCreateOrConnectWithoutProductInput], {nullable:true})
    @Type(() => PriceCreateOrConnectWithoutProductInput)
    connectOrCreate?: Array<PriceCreateOrConnectWithoutProductInput>;

    @Field(() => [PriceUpsertWithWhereUniqueWithoutProductInput], {nullable:true})
    @Type(() => PriceUpsertWithWhereUniqueWithoutProductInput)
    upsert?: Array<PriceUpsertWithWhereUniqueWithoutProductInput>;

    @Field(() => PriceCreateManyProductInputEnvelope, {nullable:true})
    @Type(() => PriceCreateManyProductInputEnvelope)
    createMany?: PriceCreateManyProductInputEnvelope;

    @Field(() => [PriceWhereUniqueInput], {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    set?: Array<PriceWhereUniqueInput>;

    @Field(() => [PriceWhereUniqueInput], {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    disconnect?: Array<PriceWhereUniqueInput>;

    @Field(() => [PriceWhereUniqueInput], {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    delete?: Array<PriceWhereUniqueInput>;

    @Field(() => [PriceWhereUniqueInput], {nullable:true})
    @Type(() => PriceWhereUniqueInput)
    connect?: Array<PriceWhereUniqueInput>;

    @Field(() => [PriceUpdateWithWhereUniqueWithoutProductInput], {nullable:true})
    @Type(() => PriceUpdateWithWhereUniqueWithoutProductInput)
    update?: Array<PriceUpdateWithWhereUniqueWithoutProductInput>;

    @Field(() => [PriceUpdateManyWithWhereWithoutProductInput], {nullable:true})
    @Type(() => PriceUpdateManyWithWhereWithoutProductInput)
    updateMany?: Array<PriceUpdateManyWithWhereWithoutProductInput>;

    @Field(() => [PriceScalarWhereInput], {nullable:true})
    @Type(() => PriceScalarWhereInput)
    deleteMany?: Array<PriceScalarWhereInput>;
}
