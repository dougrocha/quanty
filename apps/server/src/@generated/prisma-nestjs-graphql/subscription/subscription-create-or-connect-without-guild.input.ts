import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input';
import { Type } from 'class-transformer';
import { SubscriptionCreateWithoutGuildInput } from './subscription-create-without-guild.input';

@InputType()
export class SubscriptionCreateOrConnectWithoutGuildInput {

    @Field(() => SubscriptionWhereUniqueInput, {nullable:false})
    @Type(() => SubscriptionWhereUniqueInput)
    where!: SubscriptionWhereUniqueInput;

    @Field(() => SubscriptionCreateWithoutGuildInput, {nullable:false})
    @Type(() => SubscriptionCreateWithoutGuildInput)
    create!: SubscriptionCreateWithoutGuildInput;
}
