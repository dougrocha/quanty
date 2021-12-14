import QuantyClient from '..';

import {
  ApplicationCommandType,
  PermissionString,
  ClientEvents,
  Message,
  Collection,
  CommandInteraction,
  ContextMenuInteraction,
  TextBasedChannels,
  GuildMember,
  Guild,
  ApplicationCommandOption,
  AutocompleteInteraction,
  ButtonInteraction,
  CommandInteractionOptionResolver,
  WebhookEditMessageOptions,
  InteractionReplyOptions,
  ReplyMessageOptions,
} from 'discord.js';

import { APIMessage } from 'discord-api-types/v9';

import Command from '../structures/command';
import { guildsDocument, guildsObject, guilds } from './mongoose.gen';

export interface MemeType {
  title: string;
  postLink: string;
  url: string;
  subreddit: string;
  ups: string;
}

export interface QuantySettings {
  token: string | undefined;
  testToken?: string;
  mongoUri?: string;
  botOwners: string[];
  commandsDir: string;
  featuresDir: string;
  testServers?: string[];
  devMode?: boolean;
  showWarn?: boolean;
  WSUrl?: string;
}

export interface ISpotifyEnv {
  clientID: string;
  clientSecret: string;
  playlistLimit: number;
  albumLimit: number;
  convertUnresolved?: null;
}

export interface INodeConfig {
  host: string;
  port: string;
  password: string;
}

interface IRunObjectBase<T extends keyof ICommandTypes> {
  client: QuantyClient;
  message: T extends 'message' ? ICommandTypes[T] : undefined;
  interaction: T extends 'message' ? undefined : ICommandTypes[T];
  args: string[];
}

type IRunObjectPartial<T extends keyof ICommandTypes> = {
  options: ICommandOptionTypes[T];
  member: T extends 'any' ? GuildMember | null : GuildMember;
  guild: T extends 'any' ? Guild | null : Guild;
  channel: T extends 'any' ? TextBasedChannels | null : TextBasedChannels;
};

export type IBuildSlashCommand<T extends keyof ICommandTypes = 'any'> = Omit<
  IRunObject<T>,
  'interaction' | 'options' | 'args' | 'message'
> & {
  message?: T extends 'message' ? ICommandTypes[T] : undefined;
  interaction: ICommandTypes['regular'];
  options: ICommandOptionTypes['regular'];
  args?: string[];
};

export type IBuildMessageCmd = Omit<
  IRunObject<'message'>,
  'interaction' | 'options' | 'member'
> & {
  member?: GuildMember | null;
};

export type IRunObject<T extends keyof ICommandTypes> = IRunObjectBase<T> &
  IRunObjectPartial<T>;

export type IRunSlashCmd<T extends keyof ICommandTypes = 'regular'> = Omit<
  IRunObject<T>,
  'args' | 'message'
>;

type ICommandOptionTypes = {
  regular: Omit<CommandInteractionOptionResolver, 'getMessage' | 'getFocused'>;
  message: undefined;
  context: Omit<
    CommandInteractionOptionResolver,
    | 'getFocused'
    | 'getMentionable'
    | 'getRole'
    | 'getNumber'
    | 'getInteger'
    | 'getString'
    | 'getChannel'
    | 'getBoolean'
    | 'getSubcommandGroup'
    | 'getSubcommand'
  >;
  button: null;
  autocomplete: Omit<CommandInteractionOptionResolver, 'getMessage'>;
  any:
    | CommandInteraction
    | ContextMenuInteraction
    | AutocompleteInteraction
    | ButtonInteraction;
};

type ICommandTypes = {
  regular: CommandInteraction;
  message: Message;
  context: ContextMenuInteraction;
  button: ButtonInteraction;
  autocomplete: AutocompleteInteraction;
  any:
    | CommandInteraction
    | ContextMenuInteraction
    | AutocompleteInteraction
    | ButtonInteraction;
};

interface IMessageCommand<T extends keyof ICommandTypes>
  extends IBaseCommand<T> {
  slash?: false;
  run?: (options: IRunObject<T>) => ICommandReturn;
}
interface ISlashCommand<T extends keyof ICommandTypes> extends IBaseCommand<T> {
  slash?: true;
  run?: (options: IRunObject<T>) => ICommandReturn;
}
interface ISlashMessageCommand<T extends keyof ICommandTypes>
  extends IBaseCommand<T> {
  slash?: 'both';
  run?: (options: IRunObject<T>) => ICommandReturn;
}

/**
 * somehow find a better name for this
 * This type is supposed to automatically fill out the params for commands depending on the slash value.
 * This would help out in properly typing commands later on to make sure I use the proper methods.
 */
export type ICommand<T extends keyof ICommandTypes = 'regular'> =
  | IMessageCommand<T>
  | ISlashCommand<T>
  | ISlashMessageCommand<T>;

export type IContextCommand = ISlashCommand<'context'>;

export type IButtonCommand = ISlashCommand<'button'>;

export type IAutoCompleteCommand = ISlashCommand<'autocomplete'>;

/**
 * Interface for legacy commands using a prefix
 */
export interface IBaseCommand<T extends keyof ICommandTypes = 'any'> {
  name: string;
  aliases?: string[];
  category: string;
  description: string;
  options?: ApplicationCommandOption[];
  guildOnly?: boolean;
  ownerOnly?: boolean;
  nsfw?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
  expected?: string[];
  minArgs?: number;
  maxArgs?: number;
  format?: string;
  cooldown?: number;
  globalCooldown?: number;
  testOnly?: boolean;
  ephemeral?: boolean;
  hidden?: boolean;
  type?: ApplicationCommandType;
  run?: (
    options: IRunObject<T>,
  ) => Promise<
    | ReplyMessageOptions
    | InteractionReplyOptions
    | WebhookEditMessageOptions
    | void
  >;
  error?: (options: IRunObject<T>) => any;
}

type ICommandReturn = Promise<
  | ReplyMessageOptions
  | InteractionReplyOptions
  | WebhookEditMessageOptions
  | void
>;

/**
 * Interface for Features/Events
 *
 * The generic type for FeatureBuilder will have all discord js events.
 * The event use choose will then auto type the params for the run object in your feature.
 * This makes it a bit easier so you're not looking throught Discord.JS Docs every 5 minutes.
 *
 * But just in case,
 * https://discord.js.org/#/docs/main/stable/typedef/WSEventType
 * @example
 * const feature: FeatureBuilder<'ready'> = {
 *  name: 'ready',
 *  run: async (client, message) => {
 *    whatever your heart desires
 *  }
 * }
 */

export interface FeatureBuilder<K extends keyof ClientEvents> {
  name: K;
  once?: boolean;
  run: (
    client: QuantyClient,
    ...args: ClientEvents[K]
  ) => void | PromiseLike<void> | Promise<Message | APIMessage | void>;
}

export interface Feature {
  name: string;
  once?: boolean;
  run: (client: QuantyClient, ...args: string[]) => Promise<void>;
}

export type GuildCollection = Collection<string, guildsDocument>;

export interface IPluginManager {
  createGuild(guildId: string): Promise<guildsDocument>;
  createAllGuilds(): Promise<guildsObject[]>;
  getGuild(guildId: string): Promise<guildsObject>;
}

export interface IWebSocket {
  recieveGuild(): void;
}

export interface IDatabase {
  ping(): Promise<number>;
}

export enum GuildSettingsEnum {
  ANIME = 'anime',
  MODERATION = 'moderation',
  MUSIC = 'music',
  BANNEDWORDS = 'blacklistedWords',
  CUSTOMCOMMAND = 'customCommands',
  PREFIX = 'prefix',
}

export type GuildSettingsType = keyof typeof GuildSettingsEnum;

type GuildObject<T extends GuildSettingsEnum> = Pick<guilds, T>;

type Extract<T> = T extends Record<string, infer U> ? U : never;
type Keys<T> = Extract<T>;

export type GuildResponseType<T> = T extends 'ANIME'
  ? Keys<GuildObject<GuildSettingsEnum.ANIME>>
  : T extends 'MUSIC'
  ? Keys<GuildObject<GuildSettingsEnum.MUSIC>>
  : T extends 'CUSTOMCOMMAND'
  ? Keys<GuildObject<GuildSettingsEnum.CUSTOMCOMMAND>>
  : T extends 'MODERATION'
  ? Keys<GuildObject<GuildSettingsEnum.MODERATION>>
  : T extends 'PREFIX'
  ? Keys<GuildObject<GuildSettingsEnum.PREFIX>>
  : T extends 'BANNEDWORDS'
  ? Keys<GuildObject<GuildSettingsEnum.BANNEDWORDS>>
  : never;

export interface ILoaders {
  loadCommands(dir: string): void;
  loadSlashCommands(dir: string): void;
  loadFeatures(dir: string): void;
}

export interface ICommandHandler {
  /**
   * @returns {Command} Returns all commands.
   */
  getCommands(): Command[] | undefined;

  /**
   * Gets a single command when supplied with an existing name.
   * @returns {Command} Returns a single command.
   */
  getCommand(name: string): Command | undefined;
}

export interface IFeatureHandler {
  /**
   * Directory for all features.
   * @param dir Directory
   */
  loadFeatures(dir: string): Promise<void>;
}

export interface ILogger {
  /**
   * Debug Logger - Only visible when `Debug` is true in Client Config.
   * @param msg Message Content
   * @param extra Extra Objects
   */
  debug(msg: string, ...extra: any[]): void;
  /**
   * Warn Logger - Only visible when `Show Warn` is true in Client Config.
   * @param msg Message Content
   * @param error Error Object
   */
  warn(msg: string, ...error: any[]): void;
  /**
   * Error Logger - Logs error message along with error object.
   * @param msg Message Content
   * @param error Error Object
   */
  error(msg: string, error?: any): void;
  /**
   * Info Logger - Logs informational text.
   *
   * Useful for common init logs.
   * @param msg Message Content
   */
  info(msg: string): void;
  /**
   * Success Logger - Sends a success log with big green check mark.
   * @param msg Message Content
   */
  success(msg: string): void;
  /**
   * Fatal Logger - Sends a fatal message warning of possible failure.
   *
   * Please use only when needed, use warn or error if possible.
   * @param msg Message Content | Error Object
   * @param error Error Object
   */
  fatal(msg: string | Error, error?: any): void;
}
