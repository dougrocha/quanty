import { registerEnumType } from '@nestjs/graphql';

export enum Subscription_status {
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED",
    INCOMPLETE = "INCOMPLETE"
}


registerEnumType(Subscription_status, { name: 'Subscription_status', description: undefined })
