import type { Awaitable } from 'discord.js'
import { container, Container } from '../container'
import type { Store } from '../store/Store'
import { PartLocation, PartLocationJSON } from './PartLocation'

interface PartContext {
  /**
   * The root of the Part from which is was loaded.
   */
  readonly root: string

  /**
   * The name of the Part.
   */
  readonly name: string

  /**
   * The path of the Part.
   */
  readonly path: string

  /**
   * The store in which the part is in
   */
  readonly store: Store<Part>
}

interface PartOptions {
  /**
   * The name of the Part.
   */
  readonly name?: string

  /**
   * If this part is enabled
   */
  readonly enabled?: boolean

  /**
   * Set the name of the Part to the constructor name of the object
   */
  readonly setConstructorName?: boolean
}

export class Part<O extends PartOptions = PartOptions> {
  public readonly store: Store<Part>

  public readonly name!: string

  public enabled: boolean

  public readonly location: PartLocation

  public readonly options: O

  constructor(context: PartContext, options: PartOptions = {}) {
    this.store = context.store
    this.location = new PartLocation(context.path, context.root)
    if (!this.name) this.name = options.name ?? context.name
    if (options.setConstructorName) this.name = this.constructor.name
    this.options = options as O
    this.enabled = options.enabled ?? true
  }

  public get container(): Container {
    return container
  }

  public onLoad(): Awaitable<unknown> {
    return undefined
  }

  public onUnload(): Awaitable<unknown> {
    return undefined
  }

  public async unload() {
    await this.store.unload(this.name)
    this.enabled = false
  }

  public async reload() {
    await this.store.load(this.location.root, this.location.relative)
  }

  public toJSON(): PartJSON {
    return {
      location: this.location.toJSON(),
      name: this.name,
      enabled: this.enabled,
      options: this.options,
    }
  }
}

export namespace Part {
  export type Options = PartOptions
  export type Context = PartContext
  export type JSON = PartJSON
}

export interface PartJSON {
  location: PartLocationJSON
  name: string
  enabled: boolean
  options: PartOptions
}