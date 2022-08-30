import { basename, extname } from 'path'
import type { Part } from '../structures/part/Part'
import type { Store } from '../structures/store/store'

import { classExtends, isClass, Logger, logger } from '../util'
import type {
  AsyncImportResult,
  AsyncLoadResult,
  ILoader,
  LoaderEntry,
  ModuleData,
  PathDataResult,
} from './types'

export class Loader<T extends Part> implements ILoader<T> {
  @logger()
  logger?: Logger

  public getPathData(path: string): PathDataResult {
    const extension = extname(path)

    if (extension !== '.js') return null

    const baseName = basename(path, extension)

    if (!baseName) return null

    return {
      path: path,
      name: baseName,
      extension: extension,
    }
  }

  public async importFile(file: ModuleData): AsyncImportResult<T> {
    return await import(`${process.cwd()}/${file.path}`)
  }

  public async *load(store: Store<T>, data: ModuleData): AsyncLoadResult<T> {
    let exists = false
    const file = await this.importFile(data)

    for (const value of Object.values(file)) {
      if (isClass(value) && classExtends(value, store.Constructor)) {
        exists = true
        yield value as LoaderEntry<T>
      }
    }

    if (!exists) {
      throw new Error('No valid part found @ ' + file)
    }
  }

  public onLoad(store: Store<T>, part: T): unknown {
    return undefined
  }

  public onLoadAll(store: Store<T>): unknown {
    return undefined
  }

  public onUnload(store: Store<T>, part: T): unknown {
    return undefined
  }

  public onUnloadAll(store: Store<T>): unknown {
    return undefined
  }

  public onError(error: Error, path: string): void {
    this.logger?.error(`Error loading ${path}: ${error}`)
  }
}
