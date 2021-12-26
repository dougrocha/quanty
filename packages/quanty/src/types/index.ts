import {
  ApplicationCommandOption,
  ApplicationCommandType,
  AutocompleteInteraction,
  ButtonInteraction,
  ClientEvents,
  CommandInteraction,
  CommandInteractionOptionResolver,
  ContextMenuInteraction,
  Guild,
  GuildMember,
  InteractionReplyOptions,
  Message,
  PermissionString,
  ReplyMessageOptions,
  TextBasedChannel,
  WebhookEditMessageOptions,
} from 'discord.js'
import QuantyClient from 'index'

export * from './structures'

export interface QuantySettings {
  token: string | undefined
  mongoUri?: string
  botOwners: string[]
  commandsDir: string
  featuresDir: string
  testServers?: string[]
  willWarn?: boolean
  WSUrl?: string
}

export interface ISpotifyConfig {
  clientID: string | undefined
  clientSecret: string | undefined
  playlistLimit: number
  albumLimit: number
  convertUnresolved?: null
}

export interface INodeConfig {
  host?: string | undefined
  port?: number
  password?: string | undefined
}

/**
 *
 */
export type Command = MsgCommand | SlashCommand | SlashMsgCommand

export type CommandTypes =
  | 'message'
  | 'slash'
  | 'both'
  | 'context'
  | 'button'
  | 'autocomplete'

export interface BaseCommand {
  name: string
  aliases?: string[]
  category: string
  description: string
  options?: ApplicationCommandOption[]
  isGuildOnly?: boolean
  isOwnerOnly?: boolean
  nsfw?: boolean
  userPermissions?: PermissionString[]
  clientPermissions?: PermissionString[]
  expected?: string[]
  minArgs?: number
  maxArgs?: number
  format?: string
  cooldown?: number
  globalCooldown?: number
  test?: boolean
  ephemeral?: boolean
  hidden?: boolean
  run: (options: any) => CommandReturnType
  error?: (options: any, error: any) => CommandReturnType
}

interface MsgCommand extends BaseCommand {
  cmdType: 'message'
  run: (
    options: Omit<RunOptions<'message'>, 'interaction' | 'options'>,
  ) => CommandReturnType
  error?: (
    options: Omit<RunOptions<'message'>, 'interaction' | 'options'>,
    error: CommandErrorOptions,
  ) => CommandReturnType
}

interface SlashCommand extends BaseCommand {
  cmdType: 'slash'
  run: (
    options: Omit<RunOptions<'slash'>, 'message' | 'args'>,
  ) => CommandReturnType
  error?: (
    options: Omit<RunOptions<'slash'>, 'message' | 'args'>,
    error: CommandErrorOptions,
  ) => CommandReturnType
}

interface SlashMsgCommand extends BaseCommand {
  cmdType?: 'both'
  run: (options: RunOptions<'both'>) => CommandReturnType
  error?: (
    options: RunOptions<'both'>,
    error: CommandErrorOptions,
  ) => CommandReturnType
}

export interface ContextCommand
  extends Pick<BaseCommand, 'name' | 'description' | 'category'> {
  type: Exclude<ApplicationCommandType, 'CHAT_INPUT'>
  run: (options: RunOptions<'context'>) => CommandReturnType
  error?: (
    options: RunOptions<'context'>,
    error: CommandErrorOptions,
  ) => CommandReturnType
}

export interface BaseRunOptions {
  client: QuantyClient
  message: Message
  interaction: CommandInteraction
  args: string[]
  member: GuildMember
  guild: Guild
  channel: TextBasedChannel
  options: CommandRunOptions
}

interface RunOptions<T extends CommandTypes | 'any'> {
  client: QuantyClient
  message: Message
  interaction: T extends keyof InteractionType ? InteractionType[T] : null
  args: string[]
  member: T extends 'any' ? GuildMember | null : GuildMember
  guild: T extends 'any' ? Guild | null : Guild
  channel: T extends 'any' ? TextBasedChannel | null : TextBasedChannel
  options: T extends 'slash' | 'context' | 'autocomplete'
    ? CommandRunOptions[T]
    : T extends 'both'
    ? CommandRunOptions['slash']
    : null
}

export type MessageRunOptions = Omit<
  RunOptions<'message'>,
  'interaction' | 'options'
>
export type SlashRunOptions = Omit<RunOptions<'slash'>, 'message' | 'args'>

type InteractionType = {
  slash: CommandInteraction
  context: ContextMenuInteraction
  button: ButtonInteraction
  autocomplete: AutocompleteInteraction
}

type CommandErrorOptions = {
  code: number
  content: number
}

type CommandRunOptions = {
  slash: Omit<CommandInteractionOptionResolver, 'getMessage' | 'getFocused'>
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
  >
  autocomplete: Omit<CommandInteractionOptionResolver, 'getMessage'>
}

type CommandReturnType = Promise<
  | ReplyMessageOptions
  | InteractionReplyOptions
  | WebhookEditMessageOptions
  | void
>

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
 *  run: async (client, message) => {}
 * }
 */

export interface Feature<K extends keyof ClientEvents> {
  name: K
  once?: boolean
  run: (client: QuantyClient, ...args: ClientEvents[K]) => any
}

export interface BaseFeature {
  name: string
  once?: boolean
  run: (client: QuantyClient, ...args: string[]) => Promise<void>
}
