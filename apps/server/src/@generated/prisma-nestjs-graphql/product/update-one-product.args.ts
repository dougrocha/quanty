import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProductUpdateInput } from './product-update.input';
import { Type } from 'class-transformer';
import { ProductWhereUniqueInput } from './product-where-unique.input';

@ArgsType()
export class UpdateOneProductArgs {

    @Field(() => ProductUpdateInput, {nullable:false})
    @Type(() => ProductUpdateInput)
    data!: ProductUpdateInput;

    @Field(() => ProductWhereUniqueInput, {nullable:false})
    @Type(() => ProductWhereUniqueInput)
    where!: ProductWhereUniqueInput;
}
