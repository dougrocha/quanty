import { Guilds } from '../../@generated'

export const guildStub = (): Guilds => ({
  id: '123',
  prefix: 'q!',
  premium: false,
  language: 'en_US',
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date(Date.now()),
  timezone: 'America/New_York',
})
