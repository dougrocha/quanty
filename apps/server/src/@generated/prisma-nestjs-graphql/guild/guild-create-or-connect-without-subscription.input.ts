import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildWhereUniqueInput } from './guild-where-unique.input';
import { Type } from 'class-transformer';
import { GuildCreateWithoutSubscriptionInput } from './guild-create-without-subscription.input';

@InputType()
export class GuildCreateOrConnectWithoutSubscriptionInput {

    @Field(() => GuildWhereUniqueInput, {nullable:false})
    @Type(() => GuildWhereUniqueInput)
    where!: GuildWhereUniqueInput;

    @Field(() => GuildCreateWithoutSubscriptionInput, {nullable:false})
    @Type(() => GuildCreateWithoutSubscriptionInput)
    create!: GuildCreateWithoutSubscriptionInput;
}
