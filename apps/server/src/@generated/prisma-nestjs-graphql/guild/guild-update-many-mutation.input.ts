import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumGuild_tierFieldUpdateOperationsInput } from '../prisma/enum-guild-tier-field-update-operations.input';

@InputType()
export class GuildUpdateManyMutationInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => EnumGuild_tierFieldUpdateOperationsInput, {nullable:true})
    tier?: EnumGuild_tierFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    prefix?: StringFieldUpdateOperationsInput;
}
