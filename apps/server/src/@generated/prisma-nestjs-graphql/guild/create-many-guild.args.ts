import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildCreateManyInput } from './guild-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyGuildArgs {

    @Field(() => [GuildCreateManyInput], {nullable:false})
    @Type(() => GuildCreateManyInput)
    data!: Array<GuildCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
