import { join } from 'path'

import { Collection } from 'discord.js'

import { StoreRegistry, StoreRegistryEntries } from './StoreRegistry'

import { AbstractConstructor, Ctor, Logger } from '../../util'
import { container, Container } from '../container'
import type { Part } from '../part/Part'
import { globPromise, resolvePath } from '../../util/resolvePath'
import { Loader } from '../../loaders/Loader'
import type { HydratedModuleData, ModuleData } from '../../loaders/types'

export interface StoreOptions<T extends Part> {
  /**
   * The name of the store.
   */
  readonly name: string

  /**
   * The paths that will loaded for the store.
   */
  readonly paths?: readonly string[]

  readonly loader?: Loader<T>
}

export class Store<T extends Part> extends Collection<string, T> {
  private logger?: Logger

  public readonly Constructor: AbstractConstructor<T>
  public readonly name: string
  public readonly paths: Set<string>
  public readonly loader: Loader<T>

  public constructor(
    constructor: AbstractConstructor<T>,
    options: StoreOptions<T>,
  ) {
    super()
    this.Constructor = constructor
    this.name = options.name
    this.paths = new Set(options.paths ?? [])
    this.loader = options.loader ?? Store.defaultLoader()

    this.logger = new Logger(`STORE => ${this.name}`)
  }

  /**
   * A reference to the {@link Container} object for ease of use.
   * @see container
   */
  public get container(): Container {
    return container
  }

  public registerPath(path: string): this {
    const root = resolvePath(path)

    this.paths?.add(root)
    this.logger?.log(`Registering path: '${path}'`)
    return this
  }

  public async load(root: string, path: string) {
    const full = join(root, path)

    const loadedParts = await this.loadPath(full)
    if (!loadedParts) {
      this.logger?.warn(`Skipping '${path}', Found 0 parts.`)
      return null
    }

    const parts = []

    for (const part of loadedParts) {
      parts.push(this.insert(part))
    }

    return Promise.all(parts)
  }

  public async loadAll(): Promise<void> {
    const parts = []

    for (const path of this.paths) {
      for (const part of await this.loadPath(path)) {
        parts.push(part)
      }
    }

    this.logger?.debug(`Found ${parts.length} parts.`)

    await this.unloadAll()
    this.logger?.debug(`Cleared all pieces.`)

    parts.map(async part => {
      await this.insert(part)
    })

    this.loader.onLoadAll(this)
    this.logger?.log(`Successfully loaded all parts.`)
  }

  public async unload(name: string): Promise<T> {
    const part = this.get(name) as T

    if (!part) throw new Error(`Could not find part '${name}'`)

    await this.loader.onUnload(this, part)
    await part.onUnload()
    this.logger?.log(`Unloaded part '${name}'.`)

    this.delete(name)
    this.logger?.debug(`Deleted part '${name}'.`)

    return part
  }

  public async unloadAll(): Promise<T[]> {
    const promises = []
    for (const part of this.values()) {
      promises.push(this.unload(part.name))
    }

    const results = await Promise.all(promises)

    await this.loader.onUnloadAll(this)
    this.logger?.log(`Unloaded all parts.`)
    return results
  }

  public async insert(part: T): Promise<T> {
    if (!part.enabled) return part

    await this.loader.onLoad(this, part)
    await part.onLoad()
    this.logger?.debug(`Loaded new part '${part.name}'.`)

    if (!part.enabled) {
      this.loader.onUnload(this, part)
      await part.onUnload()
      this.logger?.log(`Unloaded part '${part.name}'. Part was disabled onload`)
      return part
    }

    const conflictPart = super.get(part.name)
    if (conflictPart) {
      await this.unload(conflictPart.name)
      this.logger?.warn(
        `Conflicted names with '${conflictPart.name}' and '${part.name}'.`,
      )
    }

    this.set(part.name, part)
    this.logger?.log(`Inserted new part '${part.name}'.`)
    return part
  }

  public construct(Ctor: Ctor, data: HydratedModuleData): T {
    return new Ctor(
      {
        store: this,
        root: data.root,
        path: data.path,
        name: data.name,
      },
      {
        name: data.name,
        enabled: true,
      },
    )
  }

  public async loadPath(path: string) {
    const parts: T[] = []

    let filePaths = []

    if (path.endsWith('.js')) {
      filePaths.push(path)
    } else {
      filePaths = await globPromise(`${path}/**/*.js`)
    }

    for (const filePath of filePaths) {
      const data = this.loader.getPathData(filePath)
      if (!data) {
        this.logger?.warn(
          `Skipping '${filePath}', Could not get full file data.`,
        )
        continue
      }
      const hydratedData = this.hydrateData(path, data)
      for await (const Ctor of this.loader.load(this, hydratedData)) {
        parts.push(this.construct(Ctor, hydratedData))
      }
    }

    return parts
  }

  private hydrateData(root: string, data: ModuleData): HydratedModuleData {
    return { root, ...data }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static defaultLoader(): Loader<any> {
    return new Loader()
  }
}

export namespace Store {
  export const Registry = StoreRegistry
  export type Options<T extends Part> = StoreOptions<T>
  export type RegistryEntries = StoreRegistryEntries
}

