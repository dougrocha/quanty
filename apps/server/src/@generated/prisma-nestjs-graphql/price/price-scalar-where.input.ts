import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class PriceScalarWhereInput {

    @Field(() => [PriceScalarWhereInput], {nullable:true})
    AND?: Array<PriceScalarWhereInput>;

    @Field(() => [PriceScalarWhereInput], {nullable:true})
    OR?: Array<PriceScalarWhereInput>;

    @Field(() => [PriceScalarWhereInput], {nullable:true})
    NOT?: Array<PriceScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    recurringInterval?: DateTimeFilter;

    @Field(() => IntFilter, {nullable:true})
    unit_amount?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    currency?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    productId?: StringFilter;
}
