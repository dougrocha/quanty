import { registerEnumType } from '@nestjs/graphql';

export enum Subscription_tier {
    FREE = "FREE",
    SILVER = "SILVER",
    QUANTUM = "QUANTUM"
}


registerEnumType(Subscription_tier, { name: 'Subscription_tier', description: undefined })
