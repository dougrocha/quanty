import { Collection, CommandInteractionOptionResolver } from 'discord.js'

import { Event } from './Event'

import { logger, Logger } from '../../util/Logger'
import { QuantyClient } from '../client/Client'

export class EventRegistry extends Collection<string, Event> {
  private readonly client: QuantyClient

  @logger()
  private readonly _logger!: Logger

  constructor(client: QuantyClient) {
    super()

    this.client = client
  }

  public registerEvent(event: Event) {
    if (this.get(event._className)) this.delete(event._className)

    this._logger.debug(`Registrating event: ${event._className}`)

    this.set(event._className, event)

    event._init(this.client)

    if (event.once) {
      this.client.once(event.eventName, event.run.bind(event))
    } else {
      this.client.on(event.eventName, event.run.bind(event))
    }
  }
}
