import { Snowflake } from 'discord.js'

export interface IQuantyConfig {
  owner: Snowflake | Snowflake[]
  prefix?: string
  mentionPrefix?: boolean
  defaultPrefix?: string | 'mention'
  baseDir?: string
  commandDir: string
  eventDir: string
  token: string | undefined
  baseCommands?: boolean
  commandNotFoundError?: string
  rateLimitExceededError?: boolean
  logLevel?: LogLevels

  defaults?: IQuantyDefaults | boolean

  devGuilds?: string | string[]
}

export type LogLevels = 'DEBUG' | 'ALL' | 'WARN' | 'ERROR'

/**
 * Default commands built within Quanty
 */
export interface IQuantyDefaults {
  commands?: IQuantyDefaultCommands | boolean
  events?: IQuantyDefaultEvents | boolean
}
export interface IQuantyDefaultCommands {
  ping?: boolean
  help?: boolean
}
export interface IQuantyDefaultEvents {
  interaction?: boolean
  ready?: boolean
}
