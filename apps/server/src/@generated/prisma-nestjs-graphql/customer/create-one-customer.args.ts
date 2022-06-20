import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CustomerCreateInput } from './customer-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCustomerArgs {

    @Field(() => CustomerCreateInput, {nullable:false})
    @Type(() => CustomerCreateInput)
    data!: CustomerCreateInput;
}
