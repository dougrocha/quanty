import { Guild } from '../../@generated/prisma-nestjs-graphql'

export const guildStub = (): Guild => ({
  id: '123',
  prefix: 'q!',
  tier: 'FREE',
  guildSettings: {
    id: '123',
    defaultJoinRole: '123',
    djRole: '123',
    globalCooldown: 100,
    musicTimeOut: true,
    nsfw: false,
  },
})
