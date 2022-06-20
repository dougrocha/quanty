import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { GuildUpdateOneWithoutGuildSettingsInput } from '../guild/guild-update-one-without-guild-settings.input';

@InputType()
export class GuildSettingsUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    defaultJoinRole?: StringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    nsfw?: BoolFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    globalCooldown?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    djRole?: StringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    musicTimeOut?: BoolFieldUpdateOperationsInput;

    @Field(() => GuildUpdateOneWithoutGuildSettingsInput, {nullable:true})
    guild?: GuildUpdateOneWithoutGuildSettingsInput;
}
