import { Event, logger, Logger, Once } from '@quanty/framework'
import { RateLimitData } from 'discord.js'

@Once('rateLimit')
export class RateLimitEvent extends Event<'rateLimit'> {
  @logger()
  private logger!: Logger

  async run(rateLimitData: RateLimitData) {
    console.log({ rateLimitData })
  }
}
