import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumSubscription_tierFilter } from '../prisma/enum-subscription-tier-filter.input';
import { EnumSubscription_statusFilter } from '../prisma/enum-subscription-status-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { GuildRelationFilter } from '../guild/guild-relation-filter.input';
import { CustomerRelationFilter } from '../customer/customer-relation-filter.input';
import { PriceRelationFilter } from '../price/price-relation-filter.input';

@InputType()
export class SubscriptionWhereInput {

    @Field(() => [SubscriptionWhereInput], {nullable:true})
    AND?: Array<SubscriptionWhereInput>;

    @Field(() => [SubscriptionWhereInput], {nullable:true})
    OR?: Array<SubscriptionWhereInput>;

    @Field(() => [SubscriptionWhereInput], {nullable:true})
    NOT?: Array<SubscriptionWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => EnumSubscription_tierFilter, {nullable:true})
    tier?: EnumSubscription_tierFilter;

    @Field(() => EnumSubscription_statusFilter, {nullable:true})
    status?: EnumSubscription_statusFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    current_period_end?: DateTimeFilter;

    @Field(() => BoolFilter, {nullable:true})
    cancel_at_period_end?: BoolFilter;

    @Field(() => GuildRelationFilter, {nullable:true})
    guild?: GuildRelationFilter;

    @Field(() => StringFilter, {nullable:true})
    guildId?: StringFilter;

    @Field(() => CustomerRelationFilter, {nullable:true})
    customer?: CustomerRelationFilter;

    @Field(() => StringFilter, {nullable:true})
    customerId?: StringFilter;

    @Field(() => PriceRelationFilter, {nullable:true})
    price?: PriceRelationFilter;

    @Field(() => StringFilter, {nullable:true})
    priceId?: StringFilter;
}
