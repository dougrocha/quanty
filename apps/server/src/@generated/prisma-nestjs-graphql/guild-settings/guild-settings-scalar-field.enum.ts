import { registerEnumType } from '@nestjs/graphql'

export enum GuildSettingsScalarFieldEnum {
  id = 'id',
  defaultJoinRole = 'defaultJoinRole',
  nsfw = 'nsfw',
  globalCooldown = 'globalCooldown',
  djRole = 'djRole',
  musicTimeOut = 'musicTimeOut',
}

registerEnumType(GuildSettingsScalarFieldEnum, {
  name: 'GuildSettingsScalarFieldEnum',
  description: undefined,
})
