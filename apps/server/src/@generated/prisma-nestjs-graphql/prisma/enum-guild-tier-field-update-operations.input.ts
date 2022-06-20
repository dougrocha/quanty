import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Guild_tier } from './guild-tier.enum';

@InputType()
export class EnumGuild_tierFieldUpdateOperationsInput {

    @Field(() => Guild_tier, {nullable:true})
    set?: keyof typeof Guild_tier;
}
