import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class PriceAvgAggregate {

    @Field(() => Float, {nullable:true})
    unit_amount?: number;
}
