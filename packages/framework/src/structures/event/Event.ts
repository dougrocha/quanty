import type { Client, ClientEvents } from 'discord.js'
import type EventEmitter from 'node:events'
import { Logger } from '../../util'
import { Part } from '../part/Part'

export abstract class Event<
  E extends keyof ClientEvents = 'invalidated',
  O extends Event.Options = Event.Options,
> extends Part<O> {
  public readonly emitter: EventEmitter | null

  public readonly event!: string | symbol

  public readonly once!: boolean

  private _event: ((...args: unknown[]) => void) | null

  protected readonly logger?: Logger

  public constructor(context: Part.Context, options: O = {} as O) {
    super(context, options)

    this.emitter = this.container.client ?? null

    if (!this.once) this.once = options.once ?? false

    if (!this.event) this.event = options.event ?? this.name

    this.logger = new Logger(`EVENT:${this.name}`)

    this._event =
      this.emitter && this.event
        ? this.once
          ? this._runOnce.bind(this)
          : this.run.bind(this)
        : null

    // If there's no emitter or no listener, disable:
    if (this.emitter === null || this._event === null) this.enabled = false
  }

  public abstract run(
    ...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]
  ): unknown

  public onLoad() {
    if (this._event) {
      const emitter = this.emitter
      if (!emitter) return

      const maxListeners = emitter.getMaxListeners()
      if (maxListeners != 0) emitter.setMaxListeners(maxListeners + 1)

      emitter[this.once ? 'once' : 'on'](this.event, this._event)
    }
    return super.onLoad()
  }

  public onUnload() {
    if (!this.once && this._event) {
      const emitter = this.emitter
      if (!emitter) return

      const maxListeners = emitter.getMaxListeners()
      if (maxListeners !== 0) emitter.setMaxListeners(maxListeners - 1)

      emitter.off(this.event, this._event)
      this._event = null
    }
    return super.onUnload()
  }

  private async _runOnce(...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.run(...(args as any))
    await this.unload()
  }
}

export interface EventOptions extends Part.Options {
  readonly emitter?: keyof Client | EventEmitter

  readonly event?: keyof ClientEvents

  readonly once?: boolean
}

export namespace Event {
  export type Options = EventOptions
  export type Context = Part.Context
}
