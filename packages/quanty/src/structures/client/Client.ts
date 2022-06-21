import 'dotenv'

import { promisify } from 'util'

import { Client, ClientOptions, Snowflake } from 'discord.js'
import glob from 'glob'

import type { IQuantyConfig, IQuantyDefaults, LogLevels } from './types/client'

import { ConfigError, Messages } from '../../errors'
import { logger, Logger } from '../../util/Logger'
import { CommandRegistry, CommandLoader } from '../command'
import { EventRegistry, EventLoader } from '../event'

/**
 * The base {@link Client} for Quanty Framework. When building a Discord bot with this framework, you must either choose to use this class or extend from it.
 *
 * Quanty does have default presets for many of its options. You can choose to configure any option that is available.
 *
 * @see {@link IQuantyConfig} for all options available.
 */
export class QuantyClient extends Client {
  /**
   * Owners of this discord bot
   */
  public owner: Snowflake | Snowflake[]

  /**
   * Default prefix for the bot
   */
  public prefix?: string

  public mentionPrefix?: boolean

  /**
   * Directory of all commands.
   */
  public commandDir = 'commands/'

  /**
   * Directory of all events.
   */
  public eventDir = 'events/'

  /**
   * Base directory for bot.
   */
  public baseDir?: string = 'src/'

  /**
   * ``Typescript only``
   *
   * Directory for build files.
   *
   */
  public outDir?: string = 'dist/'

  public defaults?: IQuantyDefaults | boolean = false

  public readonly devGuilds: string[] = []

  public commands!: CommandRegistry

  public events!: EventRegistry

  /** Default error message that is sent when a command fails. */
  public commandNotFoundError?: string | undefined

  /** Default message that is sent when a user activates a commands cooldown. */
  public rateLimitExceededError?: boolean | undefined

  private _logLevel?: LogLevels | undefined

  private _defaultCommandError?: string

  /**
   * This is named _token because token is used by discord.js
   */
  private readonly _token!: string

  @logger()
  private _logger!: Logger

  public _RegExpPrefix = RegExp(`^<@!?${this.user?.id}>`)

  constructor(quanty: IQuantyConfig, config: ClientOptions) {
    super(config)

    const {
      commandDir,
      eventDir,
      owner,
      token,
      prefix,
      mentionPrefix,
      baseDir,
      defaults,
      devGuilds,
      logLevel,
      outDir,
    } = quanty

    ;(process.env.LOGLEVEL as LogLevels) = logLevel || 'WARN'
    this._logLevel = logLevel || 'WARN'

    if (prefix) this.prefix = prefix
    // Mention prefix is @<client.id>
    if (mentionPrefix) this.mentionPrefix = mentionPrefix
    if (outDir) this.outDir = outDir

    if (baseDir) {
      this.baseDir = baseDir
    }

    if (defaults) this.defaults = defaults
    if (devGuilds) {
      if (typeof devGuilds == 'string') {
        this.devGuilds[0] = devGuilds
      } else {
        this.devGuilds = devGuilds
      }
    }

    if (token) this._token = token

    this.owner = owner

    if (commandDir) this.commandDir = commandDir
    if (eventDir) this.eventDir = eventDir

    /**
     * Sets base dir to dist profile
     * Example: dist/src/
     */
    if (outDir) {
      this.baseDir = `${this.outDir}${this.baseDir}`
    }

    this.checkConfig()

    this.commands = new CommandRegistry(this)
    this.events = new EventRegistry(this)

    this.handleLoaders()
  }

  /**
   * Starts the bot
   *
   * @returns Your Discord Client
   */
  public async start(): Promise<this> {
    await this.login(this._token)

    return this
  }

  /**
   * Will check config to make sure everything is available before running.
   */
  public checkConfig() {
    this._logger.debug('Checking config.')

    let error = false

    if (!this._token || typeof this._token != 'string') {
      this._logger.error(
        new ConfigError(Messages.MISSING_CLIENT_CONFIG('_token')),
      )
      error = true
    }

    if (!this.commandDir || typeof this.commandDir != 'string') {
      this._logger.error(
        new ConfigError(Messages.MISSING_CLIENT_CONFIG('commandDir')),
      )
      error = true
    }

    if (!this.eventDir || typeof this.eventDir != 'string') {
      this._logger.error(
        new ConfigError(Messages.MISSING_CLIENT_CONFIG('eventDir')),
      )
      error = true
    }

    if (error) process.exit(1)

    this._logger.clearLastLine()
    this._logger.debug('✅ Config checked.')
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
    return this.owner.includes(userId)
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
    void commandLoader.loadCommands(this.commandDir, false)

    // Events
    const eventLoader = new EventLoader(this)
    if (this.defaults) void eventLoader.loadEvents(null, this.defaults)
    void eventLoader.loadEvents(this.eventDir, false)

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
