import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class GuildSettingsSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    globalCooldown?: true;
}
