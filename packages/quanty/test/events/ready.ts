import type { Client } from 'discord.js'

import { Event, logger, Logger, Once } from '../../src'

@Once('ready')
export class ReadyEvent extends Event<'ready'> {
  @logger()
  private logger!: Logger

  async run(client: Client) {
    this.logger.log(
      `Client is logged in as: ${client.user?.id || `Unavailable`}`,
    )
  }
}
