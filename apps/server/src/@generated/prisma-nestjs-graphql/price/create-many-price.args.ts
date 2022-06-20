import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PriceCreateManyInput } from './price-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyPriceArgs {

    @Field(() => [PriceCreateManyInput], {nullable:false})
    @Type(() => PriceCreateManyInput)
    data!: Array<PriceCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
