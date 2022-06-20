import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProductCreateInput } from './product-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneProductArgs {

    @Field(() => ProductCreateInput, {nullable:false})
    @Type(() => ProductCreateInput)
    data!: ProductCreateInput;
}
