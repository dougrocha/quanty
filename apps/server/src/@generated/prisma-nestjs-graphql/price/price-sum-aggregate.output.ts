import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PriceSumAggregate {

    @Field(() => Int, {nullable:true})
    unit_amount?: number;
}
