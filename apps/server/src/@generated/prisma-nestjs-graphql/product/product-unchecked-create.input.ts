import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Product_tier } from '../prisma/product-tier.enum';
import { PriceUncheckedCreateNestedManyWithoutProductInput } from '../price/price-unchecked-create-nested-many-without-product.input';

@InputType()
export class ProductUncheckedCreateInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Product_tier, {nullable:false})
    tier!: keyof typeof Product_tier;

    @Field(() => PriceUncheckedCreateNestedManyWithoutProductInput, {nullable:true})
    price?: PriceUncheckedCreateNestedManyWithoutProductInput;
}
