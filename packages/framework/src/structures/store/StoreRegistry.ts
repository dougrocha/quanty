import { join } from 'path'

import { Collection } from 'discord.js'

import { getRootData } from '../../util/getRootData'
import { resolvePath } from '../../util/resolvePath'
import { Container, container } from '../container'
import type { Part } from '../part/Part'
import type { GuardStore } from '../guards/GuardStore'
import type { EventStore } from '../event'
import type { CommandStore } from '../command'
import type { Store } from './Store'

export type Key = keyof StoreRegistryEntries
export type Value = StoreRegistryEntries[Key]

/**
 * Registry of all stores.
 *
 * This will hold a collection of all stores.
 *
 * @see {@link Collection} for DiscordJS Collection.
 */
export class StoreRegistry extends Collection<Key, Value> {
  /**
   * A reference to the {@link Container} object for ease of use.
   * @see container
   */
  public get container(): Container {
    return container
  }

  public async load(): Promise<void> {
    const promises: Promise<void>[] = []
    for (const store of this.values() as IterableIterator<Store<Part>>) {
      promises.push(store.loadAll())
    }

    await Promise.all(promises)
  }

  public register<T extends Part>(store: Store<T>): this {
    this.set(store.name as Key, store as unknown as Value)
    return this
  }

  public deregister<T extends Part>(store: Store<T>): this {
    this.delete(store.name as Key)
    return this
  }

  public registerPath(rootPath: string = getRootData().root): void {
    const root = resolvePath(rootPath)
    for (const store of this.values() as IterableIterator<Store<Part>>) {
      store.registerPath(join(root, store.name))
    }
  }
}

export interface StoreRegistry {
  get<K extends Key>(key: K): StoreRegistryEntries[K]
  get(key: string): undefined
  has(key: Key): true
  has(key: string): false
}

/**
 * Entries for stores
 *
 * Use Declare Modules to declare new entries.
 * By default the Store Registry will come with commands and events entries.
 *
 * @example
 * declare module 'quanty' {
 *      export interface StoreRegistryEntries {
 *          commands?: CommandRegistry
 *          events?: EventRegistry
 *
 *          ... Add entries here ...
 *      }
 * }
 */
export interface StoreRegistryEntries {
  commands?: CommandStore
  events?: EventStore
  guards?: GuardStore
}