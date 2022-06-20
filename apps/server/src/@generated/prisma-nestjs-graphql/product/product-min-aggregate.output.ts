import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Product_tier } from '../prisma/product-tier.enum';

@ObjectType()
export class ProductMinAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Product_tier, {nullable:true})
    tier?: keyof typeof Product_tier;
}
