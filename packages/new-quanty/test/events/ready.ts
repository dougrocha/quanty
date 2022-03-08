import { Client } from 'discord.js'

import { Once } from '../../src/decorators/EventDecorators'
import { Event } from '../../src/structures/event/Event'
import { logger, Logger } from '../../src/util/Logger'

@Once('ready')
export class Ready extends Event<'ready'> {
  @logger()
  public logger!: Logger

  run(client: Client<true>): void {
    this.logger.log(`${client.user.username} is logged in.`)
  }
}
