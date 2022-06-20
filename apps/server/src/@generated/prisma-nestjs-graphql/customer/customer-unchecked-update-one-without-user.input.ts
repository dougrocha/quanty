import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CustomerCreateWithoutUserInput } from './customer-create-without-user.input';
import { Type } from 'class-transformer';
import { CustomerCreateOrConnectWithoutUserInput } from './customer-create-or-connect-without-user.input';
import { CustomerUpsertWithoutUserInput } from './customer-upsert-without-user.input';
import { CustomerWhereUniqueInput } from './customer-where-unique.input';
import { CustomerUpdateWithoutUserInput } from './customer-update-without-user.input';

@InputType()
export class CustomerUncheckedUpdateOneWithoutUserInput {

    @Field(() => CustomerCreateWithoutUserInput, {nullable:true})
    @Type(() => CustomerCreateWithoutUserInput)
    create?: CustomerCreateWithoutUserInput;

    @Field(() => CustomerCreateOrConnectWithoutUserInput, {nullable:true})
    @Type(() => CustomerCreateOrConnectWithoutUserInput)
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput;

    @Field(() => CustomerUpsertWithoutUserInput, {nullable:true})
    @Type(() => CustomerUpsertWithoutUserInput)
    upsert?: CustomerUpsertWithoutUserInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => Boolean, {nullable:true})
    delete?: boolean;

    @Field(() => CustomerWhereUniqueInput, {nullable:true})
    @Type(() => CustomerWhereUniqueInput)
    connect?: CustomerWhereUniqueInput;

    @Field(() => CustomerUpdateWithoutUserInput, {nullable:true})
    @Type(() => CustomerUpdateWithoutUserInput)
    update?: CustomerUpdateWithoutUserInput;
}
