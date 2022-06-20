import { registerEnumType } from '@nestjs/graphql';

export enum GuildPluginsScalarFieldEnum {
    id = "id",
    autoMod = "autoMod",
    anime = "anime"
}


registerEnumType(GuildPluginsScalarFieldEnum, { name: 'GuildPluginsScalarFieldEnum', description: undefined })
