import AppleMusic from 'better-erela.js-apple'
import {
  Client,
  ClientOptions,
  MessageEmbed,
  MessageEmbedOptions,
  User,
} from 'discord.js'
import { Manager } from 'erela.js'
import Spotify from 'erela.js-spotify'

import Database from './database/database'
import {
  CommandHandler,
  FeatureHandler,
  GuildManager,
  MessageHandler,
  PluginManager,
  QuantyLogger,
  SlashCommandHandler,
  WebSocket,
} from './structures'
import { ILogger, QuantySettings } from './types'
import { MusicEvent } from './utils/music'

/**
 * QuantyClient
 * @class
 * @extends Discord.Client
 */
class QuantyClient<Ready extends boolean = boolean> extends Client<Ready> {
  public logger: ILogger = new QuantyLogger('Client')

  private readonly config: QuantySettings

  public readonly botOwners: string[]

  public player: Manager

  public WebSocket: WebSocket

  public PluginManager: PluginManager

  public Database: Database

  public readonly commandHandler: CommandHandler

  public featuresHandler: FeatureHandler

  public slashCommandHandler: SlashCommandHandler

  public messageHandler: MessageHandler

  public guildManager: GuildManager

  private readonly WSUrl: string | undefined = ''

  public readonly willWarn: boolean | undefined = true

  private args: any

  /**
   * Quanty Client Constructor
   * @param {QuantySettings} [Config] - Config for this client
   * @param {ClientOptions} [Client_Options] - Settings for Discord Client
   * @param {ManagerOptions} [Player_Options] - Settings for ErelaJs
   */

  constructor(config: QuantySettings, settings?: ClientOptions, args?: any) {
    super(
      settings ?? {
        intents: 32509, // Enables all Intents
      },
    )
    /**
     * Config for Bot
     * @property {object}
     */
    this.config = config

    this.args = args

    /**
     * Owner Id for bot
     * @property {string[]} ownerId
     */
    this.botOwners = config.botOwners

    /**
     * Music bot
     */
    this.player = this.loadMusic(this)

    /**
     * Show Warn toggle
     */
    this.willWarn = config.willWarn ?? false

    /**
     * Websocket URL
     */
    this.WSUrl = this.config.WSUrl

    /**
     * Websocket
     */
    this.WebSocket = new WebSocket(this.WSUrl)

    /**
     * Database using MongoDB
     */
    this.Database = new Database(this, this.config.mongoUri)

    /**
     * Plugin Manager
     */
    this.PluginManager = new PluginManager(this)

    /**
     * Command Handler
     */
    this.commandHandler = new CommandHandler(this, config.commandsDir)

    /**
     * Feature Handler
     */
    this.featuresHandler = new FeatureHandler(this, config.featuresDir)

    /**
     * SlashCommand Handler
     */
    this.slashCommandHandler = new SlashCommandHandler(
      this,
      this.commandHandler,
    )

    /**
     * Guild Manager
     */
    this.guildManager = new GuildManager(this)

    /**
     * Message Handler
     */
    this.messageHandler = new MessageHandler(
      this,
      this.commandHandler,
      this.guildManager,
    )
  }

  /**
   * Starts the bot
   */
  public async start(): Promise<void> {
    const {
      token = '',
      botOwners,
      testServers,
      mongoUri,
      willWarn,
    } = this.config

    if (!token)
      return this.logger.fatal(
        new Error('Token must be specified to start bot'),
      )

    if (willWarn) {
      this.logger.info('Show warn is on. Warnings will come up.')
      if (!botOwners) {
        this.logger.warn('Bot owners have not been set.')
      }
      if (!testServers) {
        this.logger.warn('Test servers have not been set.')
      }
      if (!mongoUri) {
        this.logger.warn(
          'Mongo URL does not exist. Bot will start without database.',
        )
      }
    }
    this.loadMusic(this)

    await this.login(token)
  }

  private loadMusic(client: this): Manager {
    const manager = new Manager({
      nodes: [this.args.nodeConfig],
      send(id, payload) {
        const guild = client.guilds.cache.get(id)
        if (guild) guild.shard.send(payload)
      },
      plugins: [new Spotify(this.args.spotifyConfig), new AppleMusic()],
    })

    MusicEvent(manager, this) // Starts Events for music player

    return (this.player = manager)
  }

  /**
   * Default Embed for QuantyClient
   * @param options Embed Options in Object
   * @param message Content to send as message
   * @returns Creates a discord embed with a random color and a default footer
   */
  public embed(options: MessageEmbedOptions, author: User): MessageEmbed {
    return new MessageEmbed({ ...options, color: 'RANDOM' }).setFooter(
      `${author.tag} | ${this.user?.username}`,
      author.displayAvatarURL({ format: 'png', dynamic: true }),
    )
  }

  /**
   * Will turn Milliseconds into proper time
   * @param {number} millisec - Milliseconds
   * @returns Formatted time
   */
  public msToTime = (millisec: number) => {
    let seconds: any = <unknown>(millisec / 1000).toFixed(0)
    let minutes: any = <unknown>Math.floor(seconds / 60)
    let hours: any = ''
    if (minutes > 59) {
      hours = Math.floor(minutes / 60)
      hours = hours >= 10 ? hours : `0${hours}`
      minutes -= hours * 60
      minutes = minutes >= 10 ? minutes : `0${minutes}`
    }

    seconds = Math.floor(seconds % 60)
    seconds = seconds >= 10 ? seconds : `0${seconds}`
    if (hours != '') {
      return `${hours}:${minutes}:${seconds}`
    }
    return `${minutes}:${seconds}`
  }

  /**
   * @param ms Milliseconds
   * Sleeps process for any amount
   */
  public wait(ms: number) {
    return new Promise(res => {
      setTimeout(res, ms)
    })
  }
}

export default QuantyClient
