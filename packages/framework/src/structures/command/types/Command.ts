import type {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  Guild,
  InteractionReplyOptions,
  MessagePayload,
  PermissionsString,
  TextBasedChannel,
  User,
} from 'discord.js'

import type { ICooldownOptions } from './Cooldown'

import type { QuantyClient } from '../../client/Client'

export interface ICommandOptions {
  /**
   * Name of command
   */
  commandName: string
  /**
   * Description of command
   *
   * Required for slash commands
   */
  description: string
  /**
   * Category of command
   *  Required for slash commands
   *  @default 'General'
   * @type {string}
   * @memberof ICommandOptions
   */
  category: string
  /**
   * Aliases of command
   * @default []
   * @optional
   * @type string | string[]
   * @example ['!help', '!commands']
   * @example ['!help', '!commands', '!cmds']
   */
  aliases: string | string[]
  /**
   * Options for command
   * @see ApplicationCommandOptionData
   */
  options: ApplicationCommandOptionData[]
  /**
   * Whether the command can only be used in a guild
   * @default false
   * @type {boolean}
   * @memberof ICommandOptions
   * @since 0.0.1
   * @example
   * guildOnly: true
   * @example
   * guildOnly: false
   */
  guildOnly: boolean
  /**
   * Whether the command can only be used by guild owner
   * @default false
   * @type {boolean}
   * @memberof ICommandOptions
   * @since 0.0.1
   * @example
   * ownerOnly: true
   * @example
   * ownerOnly: false
   */
  ownerOnly: boolean
  /**
   * Whether the command can only be used in NSFW channels
   * @default false
   * @type {boolean}
   * @memberof ICommandOptions
   * @since 0.0.1
   * @example
   * nsfwOnly: true
   * @example
   * nsfwOnly: false
   */
  nsfwOnly: boolean
  userPermissions: PermissionsString[]
  clientPermissions: PermissionsString[]
  /**
   * Cooldown for users
   */
  cooldown: ICooldownOptions
  guildCooldown: number
  /**
   * Whether the command is a test command
   *
   * Command will be preloaded on bot startup if true
   * @default false
   * @type {boolean}
   * @memberof ICommandOptions
   * @since 0.0.1
   * @example
   * test: true
   * @example
   * test: false
   */
  test: boolean

  type: CommandTypes
}

export type CommandTypes = 'message' | 'slash' | 'context' | 'button'

export interface BaseCommand {
  name: string
  aliases: string[]
  category: string
  description: string
  options: ApplicationCommandOptionData[]
  isGuildOnly: boolean
  isOwnerOnly: boolean
  nsfw: boolean
  userPermissions: PermissionsString[]
  clientPermissions: PermissionsString[]
  expected: string[]
  minArgs: number
  maxArgs: number
  format: string
  cooldown: number
  globalCooldown: number
  type: ApplicationCommandType
  test: boolean
  ephemeral: boolean
  hidden: boolean
  run: (options: any) => CommandReturnType
  error: (options: any, error: any) => CommandReturnType
}

export interface CommandOptions {
  client: QuantyClient
  interaction: CommandInteraction
  user: User
  guild: Guild
  channel: TextBasedChannel
  options: Omit<
    CommandInteractionOptionResolver<CacheType>,
    'getMessage' | 'getFocused'
  >
}

export type CommandReturnObj = InteractionReplyOptions | string | void

export type CommandReturnType = Promise<CommandReturnObj>

export interface IVerifyReturnObj {
  customVerify?: boolean
  guild?: boolean
  nsfw?: boolean
  userPerms?: boolean
  clientPerms?: boolean
  owner?: boolean
  cooldown?: boolean
  dm?: boolean
  channel?: true
}
