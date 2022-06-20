import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildWhereInput } from './guild-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyGuildArgs {

    @Field(() => GuildWhereInput, {nullable:true})
    @Type(() => GuildWhereInput)
    where?: GuildWhereInput;
}
