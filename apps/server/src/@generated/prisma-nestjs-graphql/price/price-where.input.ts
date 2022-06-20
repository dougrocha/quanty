import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { ProductRelationFilter } from '../product/product-relation-filter.input';
import { SubscriptionListRelationFilter } from '../subscription/subscription-list-relation-filter.input';

@InputType()
export class PriceWhereInput {

    @Field(() => [PriceWhereInput], {nullable:true})
    AND?: Array<PriceWhereInput>;

    @Field(() => [PriceWhereInput], {nullable:true})
    OR?: Array<PriceWhereInput>;

    @Field(() => [PriceWhereInput], {nullable:true})
    NOT?: Array<PriceWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    recurringInterval?: DateTimeFilter;

    @Field(() => IntFilter, {nullable:true})
    unit_amount?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    currency?: StringFilter;

    @Field(() => ProductRelationFilter, {nullable:true})
    product?: ProductRelationFilter;

    @Field(() => StringFilter, {nullable:true})
    productId?: StringFilter;

    @Field(() => SubscriptionListRelationFilter, {nullable:true})
    subscription?: SubscriptionListRelationFilter;
}
