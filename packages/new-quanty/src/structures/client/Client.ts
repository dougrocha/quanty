import 'dotenv'

import { Client, ClientOptions, Snowflake } from 'discord.js'

import { IQuantyConfig, IQuantyDefaultCommands } from './typings/IQuantyClient'

import { logger, Logger } from '../../util/Logger'
import { CommandLoader } from '../command/CommandLoader'
import { CommandRegistry } from '../command/CommandRegistry'
import { EventLoader } from '../event/EventLoader'
import { EventRegistry } from '../event/EventRegistry'

export class QuantyClient extends Client {
  public owner: Snowflake | Snowflake[]

  public prefix?: string | string[]

  public mentionPrefix?: boolean

  public commandDir: string

  public eventDir: string

  public baseDir = 'dist/'

  public defaultCommands?: IQuantyDefaultCommands | boolean = false

  public readonly devGuilds?: string | string[]

  public commands: CommandRegistry

  public events: EventRegistry

  /**
   * This is named _token because token is used by discord.js
   */
  private readonly _token: string

  @logger()
  public readonly _logger!: Logger

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
      defaultCommands,
      devGuilds,
      logLevel,
    } = quanty

    process.env.LOGLEVEL = logLevel || 'WARN'

    if (prefix) this.prefix = prefix
    if (mentionPrefix !== undefined) this.mentionPrefix = mentionPrefix
    if (baseDir) this.baseDir = baseDir
    if (defaultCommands) this.defaultCommands = defaultCommands
    if (devGuilds) this.devGuilds = devGuilds

    this._token = token
    this.owner = owner

    this.commandDir = commandDir
    this.eventDir = eventDir

    this.checkConfig()

    this.commands = new CommandRegistry(this)
    const commandLoader = new CommandLoader(this)
    if (defaultCommands) {
      void commandLoader.loadCommands(null, this.defaultCommands)
    }
    void commandLoader.loadCommands(this.commandDir, false)

    this.events = new EventRegistry(this)
    const eventLoader = new EventLoader(this)
    void eventLoader.loadEvents(this.eventDir)
  }

  public async start(): Promise<this> {
    await this.login(this._token)

    return this
  }

  public checkConfig() {
    this._logger.debug('error')
  }

  public setTimeout(callback: () => void, timeout: number) {
    return setTimeout(callback, timeout)
  }
}
