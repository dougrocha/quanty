import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionUpdateWithoutGuildInput } from './subscription-update-without-guild.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateWithoutGuildInput } from './subscription-create-without-guild.input';

@InputType()
export class SubscriptionUpsertWithoutGuildInput {

    @Field(() => SubscriptionUpdateWithoutGuildInput, {nullable:false})
    @Type(() => SubscriptionUpdateWithoutGuildInput)
    update!: SubscriptionUpdateWithoutGuildInput;

    @Field(() => SubscriptionCreateWithoutGuildInput, {nullable:false})
    @Type(() => SubscriptionCreateWithoutGuildInput)
    create!: SubscriptionCreateWithoutGuildInput;
}
