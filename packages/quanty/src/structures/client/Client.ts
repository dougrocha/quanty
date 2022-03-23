import 'dotenv'

import { promisify } from 'util'

import { Client, ClientOptions, Snowflake } from 'discord.js'
import glob from 'glob'

import { IQuantyConfig, IQuantyDefaults, LogLevels } from './types/client'

import { ConfigError, Messages } from '../../errors'
import { logger, Logger } from '../../util/Logger'
import { CommandRegistry, CommandLoader } from '../command'
import { EventRegistry, EventLoader } from '../event'

export class QuantyClient extends Client {
  /**
   * Owners of this discord bot
   */
  public owner: Snowflake | Snowflake[]

  public prefix?: string

  public mentionPrefix?: boolean

  public commandDir: string

  public eventDir: string

  public baseDir?: string

  public defaults?: IQuantyDefaults | boolean = false

  public readonly devGuilds?: string | string[]

  public commands!: CommandRegistry

  public events!: EventRegistry

  /** Default error message that is sent when a command fails. */
  public commandNotFoundError?: string | undefined

  /** Default message that is sent when a user activates a commands cooldown. */
  public cooldownExceededError?: boolean | undefined

  public logLevel?: LogLevels | undefined

  /**
   * This is named _token because token is used by discord.js
   */
  private readonly _token!: string

  @logger()
  public readonly _logger!: Logger

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
    } = quanty

    process.env.LOGLEVEL = logLevel || 'WARN'

    if (prefix) this.prefix = prefix
    if (mentionPrefix) this.mentionPrefix = mentionPrefix
    if (baseDir) this.baseDir = baseDir
    if (defaults) this.defaults = defaults
    if (devGuilds) this.devGuilds = devGuilds
    if (token) this._token = token

    this.owner = owner

    this.commandDir = commandDir
    this.eventDir = eventDir

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
    if (this.devGuilds) {
      void commandLoader.loadTestCommands(this.devGuilds)
    }
  }
}
