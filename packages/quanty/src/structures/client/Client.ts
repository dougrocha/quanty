import 'source-map-support/register'

import 'dotenv'

import { promisify } from 'util'

import { Client, ClientOptions, Snowflake } from 'discord.js'
import glob from 'glob'

import type {
  QuantyClientOptions,
  IQuantyDefaults,
  LogLevels,
} from './types/client'

import { logger, Logger } from '../../util/Logger'
import { getRootData } from '../../util/getRootData'
import { CommandRegistry, CommandLoader } from '../command'
import { container } from '../container'
import { EventRegistry, EventLoader } from '../event'

/**
 * The base {@link Client} for Quanty Framework. When building a Discord bot with this framework, you must either choose to use this class or extend from it.
 *
 * Quanty does have default presets for many of its options. You can choose to configure any option that is available.
 *
 * @see {@link QuantyClientOptions} for all options available.
 */
export class QuantyClient extends Client {
  /**
   * Owners of this discord bot
   */
  public owner?: Snowflake | Snowflake[]

  /**
   * Default prefix for the bot
   */
  public prefix?: string

  public mentionPrefix?: boolean

  public commandsDir = 'commands/'

  public eventsDir = 'events/'

  /**
   * Base directory for bot.
   */
  public baseDirectory?: string = getRootData()?.root

  /**
   * Directory for build files.
   */
  public outDir?: string = 'dist/'

  public defaults?: IQuantyDefaults | boolean = false

  public readonly devGuilds: string[] = []

  /** Default error message that is sent when a command fails. */
  public commandNotFoundError?: string | undefined

  /** Default message that is sent when a user activates a commands cooldown. */
  public rateLimitExceededError?: boolean | undefined

  private _logLevel?: LogLevels | undefined

  private _defaultCommandError?: string

  public commands: CommandRegistry
  public events: EventRegistry

  @logger()
  private _logger!: Logger

  constructor(options: ClientOptions) {
    super(options)

    container.client = this

    const {
      owner,
      prefix,
      mentionPrefix,
      baseDirectory,
      defaults,
      devGuilds,
      logLevel,
      outDir,
    } = options

    ;(process.env.LOGLEVEL as LogLevels) = logLevel || 'WARN'
    this._logLevel = logLevel || 'WARN'

    if (prefix) this.prefix = prefix
    // Mention prefix is @<client.id>
    if (mentionPrefix) this.mentionPrefix = mentionPrefix
    if (outDir) this.outDir = outDir

    if (baseDirectory) {
      this.baseDirectory = baseDirectory
    }

    if (defaults) this.defaults = defaults
    if (devGuilds) {
      if (typeof devGuilds == 'string') {
        this.devGuilds[0] = devGuilds
      } else {
        this.devGuilds = devGuilds
      }
    }

    this.owner = owner

    /**
     * Sets base dir to dist profile
     * Example: dist/src/
     */
    if (outDir) {
      this.baseDirectory = `${this.outDir}${this.baseDirectory}`
    }

    this.commands = new CommandRegistry(this)
    this.events = new EventRegistry(this)

    container.commands = this.commands
    container.events = this.events

    this.handleLoaders()
  }

  /**
   * Starts the bot
   *
   * @returns Your Discord Client
   */
  public async login(token?: string) {
    // Run pre login plugins

    const login = await super.login(token)

    // Run post login plugins
    return login
  }

  /**
   * Set timeout helper.
   * @param callback Callback function that will run when timeout is finished.
   * @param timeout Time in seconds for timeout.
   * @returns
   */
  public setTimeout(callback: (value: unknown) => void, timeout: number) {
    return setTimeout(callback, timeout)
  }

  /**
   * Match files using patterns supported by the shell.
   *
   * This is promise wrapped glob.
   */
  public globPromise = promisify(glob)

  /**
   * Gets default prefix set globally.
   * @returns Default Prefix
   */
  public getPrefix() {
    if (this.prefix) return this.prefix

    return 'q!'
  }

  public checkOwner(userId: Snowflake): boolean {
    return this.owner?.includes(userId) ?? false
  }

  public wait(time: number) {
    return new Promise(res => {
      this.setTimeout(res, time)
    })
  }

  private handleLoaders() {
    // Commands
    const commandLoader = new CommandLoader(this)
    if (this.defaults) {
      void commandLoader.loadCommands(null, this.defaults)
    }
    void commandLoader.loadCommands(this.commandsDir, false)

    // Events
    const eventLoader = new EventLoader()
    if (this.defaults) void eventLoader.loadEvents(null, this.defaults)
    void eventLoader.loadEvents(this.eventsDir, false)

    // Load test commands if guilds exist
    if (this.devGuilds) void commandLoader.loadTestCommands(this.devGuilds)
  }

  // Setters

  public setDefaultCommandError(value: string) {
    this._defaultCommandError = value
  }

  public setLogLevel(value: LogLevels): void {
    this._logLevel = value
  }

  // Getters

  public get defaultCommandError(): string | undefined {
    return this._defaultCommandError
  }

  public get logLevel(): LogLevels | undefined {
    return this._logLevel
  }
}

declare module 'discord.js' {
  interface Client {
    id: Snowflake
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ClientOptions extends QuantyClientOptions {}
}
