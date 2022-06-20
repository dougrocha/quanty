import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';

@InputType()
export class GuildPluginsUncheckedUpdateWithoutGuildInput {

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    autoMod?: BoolFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    anime?: BoolFieldUpdateOperationsInput;
}
