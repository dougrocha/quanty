import type { QuantyClient } from './client'
import type { CommandRegistry } from './command'
import type { EventRegistry } from './event'

import type { Logger } from '../util'

export interface Container {
  commands?: CommandRegistry
  events?: EventRegistry
  client?: QuantyClient
  logger?: Logger
}

export const container: Container = {}
