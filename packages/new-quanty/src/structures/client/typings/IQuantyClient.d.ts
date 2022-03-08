import { Snowflake } from 'discord.js'

export interface IQuantyConfig {
  owner: Snowflake | Snowflake[]
  prefix?: string | string[]
  mentionPrefix?: boolean
  defaultPrefix?: string | 'mention'
  baseDir?: string
  commandDir: string
  eventDir: string
  token: string
  baseCommands?: boolean
  commandNotFoundError?: string
  rateLimitExceededError?: boolean
  logLevel?: LogLevels

  defaultCommands?: IQuantyDefaultCommands | boolean

  devGuilds?: string | string[]
}

export type LogLevels = 'DEBUG' | 'ALL' | 'WARN' | 'ERROR'

/**
 * Default commands built within Quanty
 */
export interface IQuantyDefaultCommands {
  ping?: boolean
  help?: boolean
}
