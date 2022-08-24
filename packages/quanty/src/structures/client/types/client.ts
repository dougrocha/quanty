import type { Snowflake } from 'discord.js'

export interface QuantyClientOptions {
  /**
   * Owners of this discord bot
   */
  owner?: Snowflake | Snowflake[]
  /**
   * Default prefix for the bot
   */
  prefix?: string
  mentionPrefix?: boolean
  /**
   * Base directory for bot.
   */
  baseDirectory?: string
  /**
   * ``Typescript only``
   *
   * Directory for build files.
   *
   */
  outDir?: string
  /**
   * Directory of all commands.
   */
  commandDir?: string
  /**
   * Directory of all events.
   */
  eventDir?: string
  /** Default message that is sent when a user activates a commands cooldown. */
  commandNotFoundError?: string
  rateLimitExceededError?: boolean
  logLevel?: LogLevels

  /**
   * Default commands and events built in with Quantify
   *
   * @see {@link IQuantyDefaults} for default options
   *
   * Active all default commands
   * @example
   * ```
   * defaults: true
   * ```
   *
   * Activate either command or events
   * @example
   * ```
   *  defaults {
   *    commands: true
   *    events: false
   *  }
   * ```
   *
   * Activate specific commands
   * @example
   * ```
   *  defaults {
   *    commands: {
   *      ping: true,
   *      help: false
   *    }
   *    events: false
   *  }
   * ```
   *
   */
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
