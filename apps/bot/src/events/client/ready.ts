import { Event, logger, Logger, Once } from '@quanty/framework'
import { Client } from 'discord.js'

import MusicManager from '../../libs/music'

@Once('ready')
export class ReadyEvent extends Event<'ready'> {
  @logger()
  private logger!: Logger

  async run(client: Client<true>) {
    this.logger.log(`${client.user?.tag} is online!`)

    client.user?.setPresence({
      activities: [{ name: 'Things', type: 'PLAYING' }],
      status: 'online',
    })

    // After Bot is connected, Bot will connect to lavalink music player
    MusicManager.getInstance().init(client.user?.id)
  }
}
