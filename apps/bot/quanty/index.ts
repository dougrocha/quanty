import {
  Client,
  ClientOptions,
  MessageEmbed,
  MessageEmbedOptions,
  User,
} from 'discord.js';
import { Manager } from 'erela.js';

import {
  QuantyLogger,
  WebSocket,
  PluginManager,
  CommandHandler,
  FeatureHandler,
  SlashCommandHandler,
  MessageHandler,
  GuildManager,
} from './structures';

import Database from './database';

import { QuantySettings } from './types';
import SlashCommands from './structures/slashCommands';
import AppleMusic from 'better-erela.js-apple';
import Spotify from 'erela.js-spotify';
import { nodeConfig, spotifyConfig } from './util/clientConfig';
import client from '../src';
import { MusicEvent } from '../src/utils/music';

/**
 * QuantyClient
 * @class
 * @extends Discord.Client
 */
class QuantyClient extends Client {
  public logger: QuantyLogger = new QuantyLogger('Client');

  private readonly config: QuantySettings;
  public readonly botOwners: string[];

  public player: Manager;

  public WebSocket: WebSocket;
  public PluginManager: PluginManager;
  public Database: Database;
  public commandHandler: CommandHandler;
  public featuresHandler: FeatureHandler;
  public slashCommandHandler: SlashCommandHandler;
  public messageHandler: MessageHandler;
  public guildManager: GuildManager;

  private readonly WSUrl: string | undefined = '';
  public readonly showWarn: boolean | undefined = true;

  /**
   * Quanty Client Constructor
   * @param {QuantySettings} [Config] - Config for this client
   * @param {ClientOptions} [Client_Options] - Settings for Discord Client
   * @param {ManagerOptions} [Player_Options] - Settings for ErelaJs
   */

  constructor(config: QuantySettings, settings?: ClientOptions) {
    super(
      settings
        ? settings
        : {
            intents: 32509, // Enables all Intents
          },
    );
    /**
     * Config for Bot
     * @property {object}
     */
    this.config = config;

    /**
     * Owner Id for bot
     * @property {string[]} ownerId
     */
    this.botOwners = config.botOwners;

    /**
     * Music bot
     */
    this.player = new Manager({
      nodes: [nodeConfig],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
      plugins: [new Spotify(spotifyConfig), new AppleMusic()],
    });

    /**
     * Show Warn toggle
     */
    this.showWarn = config.showWarn;

    /**
     * Websocket URL
     */
    this.WSUrl = this.config.WSUrl;

    /**
     * Websocket
     */
    this.WebSocket = new WebSocket(this.WSUrl);

    /**
     * Database using MongoDB
     */
    this.Database = new Database(this.config.mongoUri, this);

    /**
     * Plugin Manager
     */
    this.PluginManager = new PluginManager(this);

    /**
     * Command Handler
     */
    this.commandHandler = new CommandHandler(this, config.commandsDir);

    /**
     * Feature Handler
     */
    this.featuresHandler = new FeatureHandler(this, config.featuresDir);

    /**
     * SlashCommand Handler
     */
    this.slashCommandHandler = new SlashCommands(this, this.commandHandler);

    /**
     * Guild Manager
     */
    this.guildManager = new GuildManager();

    /**
     * Message Handler
     */
    this.messageHandler = new MessageHandler(
      this,
      this.commandHandler,
      this.guildManager,
    );

    this.start();
  }

  /**
   * Starts the bot
   */
  public async start(): Promise<void> {
    const {
      token = '',
      testToken = '',
      botOwners,
      testServers,
      mongoUri,
      showWarn = true,
    } = this.config;

    if (!token)
      return this.logger.fatal(
        new Error('Token must be specified to start bot'),
      );

    if (showWarn) {
      this.logger.info('Show warn is on. Warnings will come up.');
      if (!process.env.PRODUCTION && !testToken) {
        this.logger.fatal(
          new Error(
            'Bot cannot start on dev mode without a test token. Please provide a test token in the client config.',
          ),
        );
      }
      if (!botOwners) {
        this.logger.warn('Bot owners have not been set.');
      }
      if (!testServers) {
        this.logger.warn('Test servers have not been set.');
      }
      if (!mongoUri) {
        this.logger.warn(
          'Mongo URL does not exist. Bot will start without database.',
        );
      }
    }

    await this.login(process.env.PRODUCTION ? token : testToken);

    MusicEvent(this); // Starts Events for music player
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
    );
  }

  /**
   * Will turn Milliseconds into proper time
   * @param {number} millisec - Milliseconds
   * @returns Formatted time
   */
  public msToTime = (millisec: number) => {
    let seconds: any = <unknown>(millisec / 1000).toFixed(0);
    let minutes: any = <unknown>Math.floor(seconds / 60);
    let hours: any = '';
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      hours = hours >= 10 ? hours : '0' + hours;
      minutes = minutes - hours * 60;
      minutes = minutes >= 10 ? minutes : '0' + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    if (hours != '') {
      return hours + ':' + minutes + ':' + seconds;
    }
    return minutes + ':' + seconds;
  };

  /**
   * @param ms Milliseconds
   * Sleeps process for any amount
   */
  public wait(ms: number) {
    return new Promise((res) => {
      setTimeout(res, ms);
    });
  }
}

export default QuantyClient;
