import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumSubscription_tierFieldUpdateOperationsInput } from '../prisma/enum-subscription-tier-field-update-operations.input';
import { EnumSubscription_statusFieldUpdateOperationsInput } from '../prisma/enum-subscription-status-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';

@InputType()
export class SubscriptionUncheckedUpdateWithoutCustomerInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => EnumSubscription_tierFieldUpdateOperationsInput, {nullable:true})
    tier?: EnumSubscription_tierFieldUpdateOperationsInput;

    @Field(() => EnumSubscription_statusFieldUpdateOperationsInput, {nullable:true})
    status?: EnumSubscription_statusFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    current_period_end?: DateTimeFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cancel_at_period_end?: BoolFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    guildId?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    priceId?: StringFieldUpdateOperationsInput;
}
