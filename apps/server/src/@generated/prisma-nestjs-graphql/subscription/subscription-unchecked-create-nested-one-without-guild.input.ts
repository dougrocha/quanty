import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionCreateWithoutGuildInput } from './subscription-create-without-guild.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateOrConnectWithoutGuildInput } from './subscription-create-or-connect-without-guild.input';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';

@InputType()
export class SubscriptionUncheckedCreateNestedOneWithoutGuildInput {

    @Field(() => SubscriptionCreateWithoutGuildInput, {nullable:true})
    @Type(() => SubscriptionCreateWithoutGuildInput)
    create?: SubscriptionCreateWithoutGuildInput;

    @Field(() => SubscriptionCreateOrConnectWithoutGuildInput, {nullable:true})
    @Type(() => SubscriptionCreateOrConnectWithoutGuildInput)
    connectOrCreate?: SubscriptionCreateOrConnectWithoutGuildInput;

    @Field(() => SubscriptionWhereUniqueInput, {nullable:true})
    @Type(() => SubscriptionWhereUniqueInput)
    connect?: SubscriptionWhereUniqueInput;
}
