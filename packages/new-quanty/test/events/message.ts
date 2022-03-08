import { Message } from 'discord.js'

import { On } from '../../src/decorators/EventDecorators'
import { Event } from '../../src/structures/event/Event'
import { logger, Logger } from '../../src/util/Logger'

@On('messageCreate')
export class MessageHandler extends Event<'messageCreate'> {
  @logger()
  public logger!: Logger

  async run(message: Message<boolean>): Promise<void> {
    console.log('through')
    this.logger.log(message.content)
  }
}
