import { Event, logger, Logger, Once } from '@quanty/framework'
import { ActivityType, Client } from 'discord.js'

import { musicManager } from '../../libs'

@Once('ready')
export class ReadyEvent extends Event<'ready'> {
  @logger(ReadyEvent.name)
  private logger!: Logger

  async run(client: Client<true>) {
    this.logger.log(`🤖 ${client.user?.tag} is online!`)

    client.user?.setPresence({
      activities: [{ name: 'Things', type: ActivityType.Playing }],
      status: 'online',
    })

    musicManager.init(client.user?.id)

    console.log('GUILDS:', await client.guilds.fetch())
  }
}
