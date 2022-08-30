import type { QuantyClient } from './client'

import type { StoreRegistry } from './store/StoreRegistry'

export interface Container {
  stores?: StoreRegistry
  client?: QuantyClient
}

/**
 * The global container for Quanty Framework.
 * @see {@link Container}
 *
 * @example
 * import { container } from 'quanty'
 *
 * const stores = new StoreRegistry()
 * container.stores = stores
 *
 * container.stores.register(new Store())
 */
export const container: Container = {}
