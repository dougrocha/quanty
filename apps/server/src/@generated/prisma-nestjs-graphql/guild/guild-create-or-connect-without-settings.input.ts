import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildWhereUniqueInput } from './guild-where-unique.input';
import { Type } from 'class-transformer';
import { GuildCreateWithoutSettingsInput } from './guild-create-without-settings.input';

@InputType()
export class GuildCreateOrConnectWithoutSettingsInput {

    @Field(() => GuildWhereUniqueInput, {nullable:false})
    @Type(() => GuildWhereUniqueInput)
    where!: GuildWhereUniqueInput;

    @Field(() => GuildCreateWithoutSettingsInput, {nullable:false})
    @Type(() => GuildCreateWithoutSettingsInput)
    create!: GuildCreateWithoutSettingsInput;
}
