import { registerEnumType } from '@nestjs/graphql';

export enum Guild_tier {
    FREE = "FREE",
    SILVER = "SILVER",
    QUANTUM = "QUANTUM"
}


registerEnumType(Guild_tier, { name: 'Guild_tier', description: undefined })
