import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildUpdateManyMutationInput } from './guild-update-many-mutation.input';
import { Type } from 'class-transformer';
import { GuildWhereInput } from './guild-where.input';

@ArgsType()
export class UpdateManyGuildArgs {

    @Field(() => GuildUpdateManyMutationInput, {nullable:false})
    @Type(() => GuildUpdateManyMutationInput)
    data!: GuildUpdateManyMutationInput;

    @Field(() => GuildWhereInput, {nullable:true})
    @Type(() => GuildWhereInput)
    where?: GuildWhereInput;
}
