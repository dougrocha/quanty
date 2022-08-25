import type { Message } from 'discord.js'

import { Event, logger, Logger, On } from '../../src'

@On('messageCreate')
export class MessageEvent extends Event<'messageCreate'> {
  @logger()
  private logger!: Logger

  async run(message: Message) {
    // Console.log('New message create event fired:', message.content)
  }
}
