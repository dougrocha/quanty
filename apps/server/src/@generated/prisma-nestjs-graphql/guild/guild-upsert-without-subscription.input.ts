import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildUpdateWithoutSubscriptionInput } from './guild-update-without-subscription.input';
import { Type } from 'class-transformer';
import { GuildCreateWithoutSubscriptionInput } from './guild-create-without-subscription.input';

@InputType()
export class GuildUpsertWithoutSubscriptionInput {

    @Field(() => GuildUpdateWithoutSubscriptionInput, {nullable:false})
    @Type(() => GuildUpdateWithoutSubscriptionInput)
    update!: GuildUpdateWithoutSubscriptionInput;

    @Field(() => GuildCreateWithoutSubscriptionInput, {nullable:false})
    @Type(() => GuildCreateWithoutSubscriptionInput)
    create!: GuildCreateWithoutSubscriptionInput;
}
