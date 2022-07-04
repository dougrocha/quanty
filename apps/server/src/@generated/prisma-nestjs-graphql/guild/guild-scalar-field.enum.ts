import { registerEnumType } from '@nestjs/graphql'

export enum GuildScalarFieldEnum {
  id = 'id',
  premium = 'premium',
  prefix = 'prefix',
}

registerEnumType(GuildScalarFieldEnum, {
  name: 'GuildScalarFieldEnum',
  description: undefined,
})
