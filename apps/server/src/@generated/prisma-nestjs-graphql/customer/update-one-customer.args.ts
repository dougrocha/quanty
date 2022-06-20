import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CustomerUpdateInput } from './customer-update.input';
import { Type } from 'class-transformer';
import { CustomerWhereUniqueInput } from './customer-where-unique.input';

@ArgsType()
export class UpdateOneCustomerArgs {

    @Field(() => CustomerUpdateInput, {nullable:false})
    @Type(() => CustomerUpdateInput)
    data!: CustomerUpdateInput;

    @Field(() => CustomerWhereUniqueInput, {nullable:false})
    @Type(() => CustomerWhereUniqueInput)
    where!: CustomerWhereUniqueInput;
}
