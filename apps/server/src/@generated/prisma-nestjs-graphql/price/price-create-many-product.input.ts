import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class PriceCreateManyProductInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => Date, {nullable:false})
    recurringInterval!: Date | string;

    @Field(() => Int, {nullable:false})
    unit_amount!: number;

    @Field(() => String, {nullable:false})
    currency!: string;
}
