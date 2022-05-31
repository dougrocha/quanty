import { Guilds, PremiumTiers } from '@quanty/schemas'

export const guildStub = (): Guilds => ({
  guildId: '123',
  prefix: 'q!',
  logs: [
    {
      action: 'deleteTest',
      user: { id: '123123123', username: 'slash', discriminator: '0001' },
      guildId: '123123123123',
    },
  ],
  plugins: {
    guildId: '123',
    blacklistedWords: ['fuck', 'bitch'],
  },
  defaultJoinRole: '123123123',
  logChannel: '123123123',
  maxTickets: 10,
  premium: PremiumTiers.FREE,
  banLogs: [
    {
      bannedUser: { id: '123123123', username: 'slash', discriminator: '0001' },
      guildId: '123123',
      issuedBy: { id: '123123123', username: 'slash', discriminator: '0001' },
      issuedOn: new Date(),
      reason: 'bad',
    },
  ],
})
