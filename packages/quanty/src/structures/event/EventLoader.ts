import path from 'path'

import type { Event } from './Event'
import type { EventRegistry } from './EventRegistry'

import { Messages } from '../../errors'
import { isConstructor } from '../../util'
import { Logger, logger } from '../../util/Logger'
import type { QuantyClient } from '../client/Client'
import type { IQuantyDefaults } from '../client/types/client'
import { container } from '../container'

export class EventLoader {
  private readonly client?: QuantyClient = container.client

  @logger()
  private _logger!: Logger

  private events?: EventRegistry = container.events

  public async loadEvents(
    eventsDir: string | null,
    defaultEvents: boolean | IQuantyDefaults | undefined = true,
  ) {
    this._logger.debug(
      `Starting to load ${
        eventsDir ? `events. Path: ${eventsDir}` : `default events.`
      }`,
    )

    const eventsPath: string = path.resolve(
      defaultEvents
        ? `${__dirname}/base`
        : `${this.client?.baseDirectory || ''}${eventsDir}`,
    )

    const eventFiles: string[] | undefined = await this.client?.globPromise(
      `${eventsPath}/**/!(*.d){.ts,.js}`,
    )

    eventFiles?.map(async file => {
      const event = await require(file)

      const classInstance: new () => Event = event[Object.keys(event)[0]]

      if (!isConstructor(classInstance))
        return this._logger.warn(Messages.EXPORT_INVALID(file, 'event'))

      const eventInstance: Event = new classInstance()

      this.events?.registerEvent(eventInstance)
    })
  }
}
