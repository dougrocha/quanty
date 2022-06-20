import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionScalarFieldEnum {
    id = "id",
    tier = "tier",
    status = "status",
    current_period_end = "current_period_end",
    cancel_at_period_end = "cancel_at_period_end",
    guildId = "guildId",
    customerId = "customerId",
    priceId = "priceId"
}


registerEnumType(SubscriptionScalarFieldEnum, { name: 'SubscriptionScalarFieldEnum', description: undefined })
