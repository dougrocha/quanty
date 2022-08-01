import { Guild } from '../../@generated'

export const guildStub = (): Guild => ({
  id: '123',
  prefix: 'q!',
  premium: false,
  guildSettings: {
    id: '123',
    defaultJoinRole: '123',
    djRole: '123',
    globalCooldown: 100,
    musicTimeOut: true,
    nsfw: false,
  },
})
