import 'source-map-support/register'
import 'reflect-metadata'
import 'dotenv'
import { join } from 'path'
import { Client, ClientOptions, Snowflake } from 'discord.js'

import { Logger, logger } from '../../util/Logger'
import { parseClientEnv } from '../../util/env'
import { getVersion } from '../../util/getBotVersion'
import { getRootData, getTsConfig } from '../../util/getRootData'
import { CommandStore } from '../command/CommandStore'
import { Container, container } from '../container'
import { EventStore } from '../event/EventStore'
import { GuardStore } from '../guards/GuardStore'
import { StoreRegistry } from '../store/StoreRegistry'
import type {
  IQuantyDefaults,
  LogLevels,
  QuantyClientOptions,
} from './types/client'

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

  public readonly version = getVersion()

  /**
   * Base directory for bot.
   */
  public baseDirectory?: string = getRootData()?.root

  /**
   * Directory for build files.
   */
  public outDir?: string

  public defaults?: IQuantyDefaults | boolean = false

  public readonly devGuilds: string[] = []

  /** Default error message that is sent when a command fails. */
  public commandNotFoundError?: string | undefined

  /** Default message that is sent when a user activates a commands cooldown. */
  public rateLimitExceededError?: boolean | undefined

  private _logLevel?: LogLevels | undefined

  private _defaultCommandError?: string

  public stores: StoreRegistry

  @logger()
  private _logger!: Logger

  constructor(options: ClientOptions) {
    super(options)

    // Check ClientEnv
    parseClientEnv()

    // Check ClientOptions
    // parseClientOptions()

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

    ;(process.env.LOG_LEVEL as LogLevels) = logLevel || 'WARN'
    this._logLevel = logLevel || 'WARN'

    if (prefix) this.prefix = prefix
    // Mention prefix is @<client.id>
    if (mentionPrefix) this.mentionPrefix = mentionPrefix

    if (outDir) {
      this.outDir = outDir
    } else {
      this.outDir = getTsConfig({}).compilerOptions?.outDir
    }

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

    this.stores = new StoreRegistry()
    container.stores = this.stores

    this.stores
      .register(new CommandStore())
      .register(
        new EventStore().registerPath(join(__dirname, '..', '..', 'events')),
      )
      .register(new GuardStore())
  }

  /**
   * A reference to the {@link Container} object for ease of use.
   * @see container
   */
  public get container(): Container {
    return container
  }

  /**
   * Starts the bot
   *
   * @returns Your Discord Client
   */
  public async login(token?: string) {
    if (this.baseDirectory) this.stores?.registerPath(this.baseDirectory)

    // Run pre login plugins

    // Loads all stores, then call login:
    await Promise.all([...this.stores.values()].map(store => store?.loadAll()))
    // const login = await super.login(token)
    const login = ''

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

  public checkOwner(userId: Snowflake): boolean {
    return this.owner?.includes(userId) ?? false
  }

  public wait(time: number) {
    return new Promise(res => {
      this.setTimeout(res, time)
    })
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
