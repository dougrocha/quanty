import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class GuildPluginsUncheckedCreateWithoutGuildInput {

    @Field(() => Boolean, {nullable:true})
    autoMod?: boolean;

    @Field(() => Boolean, {nullable:true})
    anime?: boolean;
}
