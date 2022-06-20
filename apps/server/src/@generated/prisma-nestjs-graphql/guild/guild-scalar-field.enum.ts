import { registerEnumType } from '@nestjs/graphql';

export enum GuildScalarFieldEnum {
    id = "id",
    tier = "tier",
    prefix = "prefix"
}


registerEnumType(GuildScalarFieldEnum, { name: 'GuildScalarFieldEnum', description: undefined })
