import { Guilds } from 'src/schemas'

export const guildStub = (): Guilds => ({
  guildId: '123',
  prefix: 'q!',
  anime: {
    nsfw: false,
    plugin: true,
  },
  blacklistedWords: ['bad', 'words'],
  customCommands: [
    {
      description: 'description',
      id: '123',
      name: 'customCommand',
    },
  ],
  logs: [{ action: 'deleteTest', name: 'slash', updatedAt: Date.now() }],
  moderation: {
    autoMod: true,
    plugin: false,
  },
  music: {
    channel: '123',
    immortal: true,
    plugin: true,
  },
  premium: true,
})
