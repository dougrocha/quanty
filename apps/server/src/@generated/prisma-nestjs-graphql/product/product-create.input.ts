import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Product_tier } from '../prisma/product-tier.enum';
import { PriceCreateNestedManyWithoutProductInput } from '../price/price-create-nested-many-without-product.input';

@InputType()
export class ProductCreateInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Product_tier, {nullable:false})
    tier!: keyof typeof Product_tier;

    @Field(() => PriceCreateNestedManyWithoutProductInput, {nullable:true})
    price?: PriceCreateNestedManyWithoutProductInput;
}
