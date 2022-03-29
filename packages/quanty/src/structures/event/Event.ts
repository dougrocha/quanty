import type { ClientEvents } from 'discord.js'

import type { QuantyClient } from '../client/Client'

/**
 * Event Class
 * ---
 * Example
 * ```ts
 * export class EventTest extends Event<'message'> {
        run(message: Message<boolean>): void {
            throw new Error('Method not implemented.')
        }
    }
 * ```
 */
export abstract class Event<
  K extends keyof ClientEvents = 'invalidated',
  C extends QuantyClient = QuantyClient,
> {
  public readonly _className!: string

  public client!: C

  public readonly eventName!: keyof ClientEvents | K

  public readonly once!: boolean

  protected constructor(options?: {
    eventName: keyof ClientEvents
    once?: boolean
  }) {
    if (options) {
      this.eventName = options.eventName
      if (options.once) {
        this.once = options.once
      }
    }
  }

  public _init(client: C) {
    this.client = client
    if (!this.eventName)
      throw new TypeError('Cannot registed Event without an event name.')
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  abstract run(...args: ClientEvents[K]): void
}
