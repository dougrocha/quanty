import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { ProductUpdateOneRequiredWithoutPriceInput } from '../product/product-update-one-required-without-price.input';
import { SubscriptionUpdateManyWithoutPriceInput } from '../subscription/subscription-update-many-without-price.input';

@InputType()
export class PriceUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    recurringInterval?: DateTimeFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unit_amount?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    currency?: StringFieldUpdateOperationsInput;

    @Field(() => ProductUpdateOneRequiredWithoutPriceInput, {nullable:true})
    product?: ProductUpdateOneRequiredWithoutPriceInput;

    @Field(() => SubscriptionUpdateManyWithoutPriceInput, {nullable:true})
    subscription?: SubscriptionUpdateManyWithoutPriceInput;
}
