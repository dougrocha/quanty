import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  Guild,
  GuildMember,
  InteractionReplyOptions,
  PermissionString,
  ReplyMessageOptions,
  TextBasedChannel,
  WebhookEditMessageOptions,
} from 'discord.js'

import { ICooldownOptions } from './Cooldown'

import { Optional } from '../../../util/types'
import { QuantyClient } from '../../client/Client'

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
}

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
  member: GuildMember
  guild: Guild
  channel: TextBasedChannel
  options: Omit<CommandInteractionOptionResolver, 'getMessage' | 'getFocused'>
}

export type CommandReturnType =
  | Promise<CommandReturnObjects>
  | CommandReturnObjects

type CommandReturnObjects =
  | ReplyMessageOptions
  | InteractionReplyOptions
  | WebhookEditMessageOptions
  | string
  | void

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
