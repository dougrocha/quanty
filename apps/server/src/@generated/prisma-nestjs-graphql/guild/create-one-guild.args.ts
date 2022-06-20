import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildCreateInput } from './guild-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneGuildArgs {

    @Field(() => GuildCreateInput, {nullable:false})
    @Type(() => GuildCreateInput)
    data!: GuildCreateInput;
}
