import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildCreateWithoutSubscriptionInput } from './guild-create-without-subscription.input';
import { Type } from 'class-transformer';
import { GuildCreateOrConnectWithoutSubscriptionInput } from './guild-create-or-connect-without-subscription.input';
import { GuildUpsertWithoutSubscriptionInput } from './guild-upsert-without-subscription.input';
import { GuildWhereUniqueInput } from './guild-where-unique.input';
import { GuildUpdateWithoutSubscriptionInput } from './guild-update-without-subscription.input';

@InputType()
export class GuildUpdateOneRequiredWithoutSubscriptionInput {

    @Field(() => GuildCreateWithoutSubscriptionInput, {nullable:true})
    @Type(() => GuildCreateWithoutSubscriptionInput)
    create?: GuildCreateWithoutSubscriptionInput;

    @Field(() => GuildCreateOrConnectWithoutSubscriptionInput, {nullable:true})
    @Type(() => GuildCreateOrConnectWithoutSubscriptionInput)
    connectOrCreate?: GuildCreateOrConnectWithoutSubscriptionInput;

    @Field(() => GuildUpsertWithoutSubscriptionInput, {nullable:true})
    @Type(() => GuildUpsertWithoutSubscriptionInput)
    upsert?: GuildUpsertWithoutSubscriptionInput;

    @Field(() => GuildWhereUniqueInput, {nullable:true})
    @Type(() => GuildWhereUniqueInput)
    connect?: GuildWhereUniqueInput;

    @Field(() => GuildUpdateWithoutSubscriptionInput, {nullable:true})
    @Type(() => GuildUpdateWithoutSubscriptionInput)
    update?: GuildUpdateWithoutSubscriptionInput;
}
