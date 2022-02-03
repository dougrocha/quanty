import { Feature } from '@quanty/framework'

export const feature: Feature<'guildBanAdd'> = {
  name: `guildBanAdd`,
  once: false,
  run: async (client, ban) => {
    const { guild, user, reason } = ban
  },
}
