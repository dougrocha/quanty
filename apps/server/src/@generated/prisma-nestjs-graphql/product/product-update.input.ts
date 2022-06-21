import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { EnumProduct_tierFieldUpdateOperationsInput } from '../prisma/enum-product-tier-field-update-operations.input';
import { PriceUpdateManyWithoutProductInput } from '../price/price-update-many-without-product.input';

@InputType()
export class ProductUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => EnumProduct_tierFieldUpdateOperationsInput, {nullable:true})
    tier?: EnumProduct_tierFieldUpdateOperationsInput;

    @Field(() => PriceUpdateManyWithoutProductInput, {nullable:true})
    price?: PriceUpdateManyWithoutProductInput;
}