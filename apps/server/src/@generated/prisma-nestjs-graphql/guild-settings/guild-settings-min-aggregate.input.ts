import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class GuildSettingsMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    defaultJoinRole?: true;

    @Field(() => Boolean, {nullable:true})
    nsfw?: true;

    @Field(() => Boolean, {nullable:true})
    globalCooldown?: true;

    @Field(() => Boolean, {nullable:true})
    djRole?: true;

    @Field(() => Boolean, {nullable:true})
    musicTimeOut?: true;
}
