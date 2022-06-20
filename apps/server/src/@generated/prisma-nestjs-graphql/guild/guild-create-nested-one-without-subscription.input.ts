import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GuildCreateWithoutSubscriptionInput } from './guild-create-without-subscription.input';
import { Type } from 'class-transformer';
import { GuildCreateOrConnectWithoutSubscriptionInput } from './guild-create-or-connect-without-subscription.input';
import { GuildWhereUniqueInput } from './guild-where-unique.input';

@InputType()
export class GuildCreateNestedOneWithoutSubscriptionInput {

    @Field(() => GuildCreateWithoutSubscriptionInput, {nullable:true})
    @Type(() => GuildCreateWithoutSubscriptionInput)
    create?: GuildCreateWithoutSubscriptionInput;

    @Field(() => GuildCreateOrConnectWithoutSubscriptionInput, {nullable:true})
    @Type(() => GuildCreateOrConnectWithoutSubscriptionInput)
    connectOrCreate?: GuildCreateOrConnectWithoutSubscriptionInput;

    @Field(() => GuildWhereUniqueInput, {nullable:true})
    @Type(() => GuildWhereUniqueInput)
    connect?: GuildWhereUniqueInput;
}
