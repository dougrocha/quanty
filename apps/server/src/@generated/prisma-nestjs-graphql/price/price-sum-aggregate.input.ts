import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PriceSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    unit_amount?: true;
}
