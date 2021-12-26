import QuantyClient, { Feature } from '@quanty/framework'

export const feature: Feature<'ready'> = {
  name: 'ready',
  once: true,
  run: async (client: QuantyClient) => {
    client.logger.success(`${client.user?.tag} is online!`)

    client.user?.setPresence({
      activities: [{ name: 'Things', type: 'PLAYING' }],
      status: 'online',
    })

    // After Bot is connected, Bot will connect to lavalink music player
    client.player.init(client.user?.id)
  },
}
