import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProductWhereInput } from './product-where.input';
import { Type } from 'class-transformer';
import { ProductOrderByWithRelationInput } from './product-order-by-with-relation.input';
import { ProductWhereUniqueInput } from './product-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ProductScalarFieldEnum } from './product-scalar-field.enum';

@ArgsType()
export class FindFirstProductArgs {

    @Field(() => ProductWhereInput, {nullable:true})
    @Type(() => ProductWhereInput)
    where?: ProductWhereInput;

    @Field(() => [ProductOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ProductOrderByWithRelationInput>;

    @Field(() => ProductWhereUniqueInput, {nullable:true})
    cursor?: ProductWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ProductScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ProductScalarFieldEnum>;
}
