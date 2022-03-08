import path from 'path'

import { Event } from './Event'
import { EventRegistry } from './EventRegistry'

import { Logger, logger } from '../../util/Logger'
import { QuantyClient } from '../client/Client'

export class EventLoader {
  private readonly client: QuantyClient

  @logger()
  private _logger!: Logger

  private events: EventRegistry

  constructor(client: QuantyClient) {
    this.client = client

    this.events = client.events
  }

  public async loadEvents(eventsDir: string | null) {
    this._logger.debug(`Starting to load events. Path: ${eventsDir}`)

    const eventsPath: string = path.resolve(
      `${this.client.baseDir || ''}${eventsDir}`,
    )

    const eventFiles: string[] = await this.client.globPromise(
      `${eventsPath}/**/*.ts`,
    )

    eventFiles.map(async file => {
      const event = await require(file)

      const classInstance: new () => Event = event[Object.keys(event)[0]]
      const eventInstance: Event = new classInstance()

      this.events.registerEvent(eventInstance)
    })
  }
}
