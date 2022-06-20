import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PriceUpdateManyMutationInput } from './price-update-many-mutation.input';
import { Type } from 'class-transformer';
import { PriceWhereInput } from './price-where.input';

@ArgsType()
export class UpdateManyPriceArgs {

    @Field(() => PriceUpdateManyMutationInput, {nullable:false})
    @Type(() => PriceUpdateManyMutationInput)
    data!: PriceUpdateManyMutationInput;

    @Field(() => PriceWhereInput, {nullable:true})
    @Type(() => PriceWhereInput)
    where?: PriceWhereInput;
}
