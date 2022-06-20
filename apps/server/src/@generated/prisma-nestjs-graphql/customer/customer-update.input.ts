import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneWithoutCustomerInput } from '../user/user-update-one-without-customer.input';
import { SubscriptionUpdateManyWithoutCustomerInput } from '../subscription/subscription-update-many-without-customer.input';

@InputType()
export class CustomerUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    email?: NullableStringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    subscriptionId?: BoolFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneWithoutCustomerInput, {nullable:true})
    user?: UserUpdateOneWithoutCustomerInput;

    @Field(() => SubscriptionUpdateManyWithoutCustomerInput, {nullable:true})
    subscription?: SubscriptionUpdateManyWithoutCustomerInput;
}
