import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GuildSettingsCreateManyInput } from './guild-settings-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyGuildSettingsArgs {

    @Field(() => [GuildSettingsCreateManyInput], {nullable:false})
    @Type(() => GuildSettingsCreateManyInput)
    data!: Array<GuildSettingsCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
