import { registerEnumType } from '@nestjs/graphql';

export enum PremiumTier {
    FREE = "FREE",
    SILVER = "SILVER",
    QUANTUM = "QUANTUM"
}


registerEnumType(PremiumTier, { name: 'PremiumTier', description: undefined })
