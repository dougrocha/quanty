import type {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  Guild,
  InteractionReplyOptions,
  MessagePayload,
  PermissionString,
  ReplyMessageOptions,
  TextBasedChannel,
  User,
  WebhookEditMessageOptions,
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
  category: string
  aliases: string | string[]
  /**
   * Slash commands options
   */
  options: ApplicationCommandOptionData[]
  guildOnly: boolean
  ownerOnly: boolean
  nsfwOnly: boolean
  userPermissions: PermissionString[]
  clientPermissions: PermissionString[]
  /**
   * Cooldown for users
   */
  cooldown: ICooldownOptions
  guildCooldown: number
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
  userPermissions: PermissionString[]
  clientPermissions: PermissionString[]
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

export interface SlashCommandRunOptions {
  client: QuantyClient
  interaction: CommandInteraction
  user: User
  guild: Guild
  channel: TextBasedChannel
  options: Omit<CommandInteractionOptionResolver, 'getMessage' | 'getFocused'>
}

export type CommandReturnObj =
  | InteractionReplyOptions
  | MessagePayload
  | string
  | void

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
