import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PriceCreateInput } from './price-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnePriceArgs {

    @Field(() => PriceCreateInput, {nullable:false})
    @Type(() => PriceCreateInput)
    data!: PriceCreateInput;
}
