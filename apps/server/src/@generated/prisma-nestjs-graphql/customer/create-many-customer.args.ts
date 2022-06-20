import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CustomerCreateManyInput } from './customer-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCustomerArgs {

    @Field(() => [CustomerCreateManyInput], {nullable:false})
    @Type(() => CustomerCreateManyInput)
    data!: Array<CustomerCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
