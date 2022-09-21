import type { Awaitable } from 'discord.js'
import type { Part } from '../structures/part/Part'
import type { Store } from '../structures/store/Store'
import type { Constructor, Ctor } from '../util'

export interface ModuleData {
  name: string

  path: string

  extension: string
}

export interface HydratedModuleData extends ModuleData {
  root: string
}

export interface FilteredResults {
  constructor: Ctor
  hydratedData: HydratedModuleData
}

export type ImportResult<T extends Part> = Awaitable<
  Constructor<T> & Record<PropertyKey, unknown>
>

export type AsyncImportResult<T extends Part> = Promise<
  Constructor<T> & Record<PropertyKey, unknown>
>

export type LoaderEntry<T extends Part> = Ctor<
  ConstructorParameters<typeof Part>,
  T
>

export type AsyncLoadResult<T extends Part> = AsyncIterableIterator<
  LoaderEntry<T>
>

export type PathDataResult = ModuleData | null

export interface ILoader<T extends Part> {
  supportedExtensions?: Set<string>

  getPathData(path: string): PathDataResult

  importFile(file: ModuleData): ImportResult<T>

  load(store: Store<T>, data: ModuleData): AsyncLoadResult<T>

  onLoad(store: Store<T>, part: T): Awaitable<unknown>

  onLoadAll(store: Store<T>): Awaitable<unknown>

  onUnload(store: Store<T>, part: T): Awaitable<unknown>

  onUnloadAll(store: Store<T>): Awaitable<unknown>

  onError(error: Error, path: string): void
}
