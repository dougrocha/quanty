import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  Guild,
  GuildMember,
  Message,
  PermissionString,
  TextBasedChannel,
} from 'discord.js'

import { CommandReturnType } from './old'

import { QuantyClient } from '../../client/Client'

import Timer = NodeJS.Timer

export { Timer }

export declare type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

export declare type Undefined<T> = {
  [P in keyof T]: T[P] | undefined
}

export interface ICommandOptions {
  /**
   * Name of command
   */
  name: string
  /**
   * Description of command
   *
   * Required for slash commands
   */
  description: string
  category: string
  cmdType: CommandsTypeStrings
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
  cooldown: ICooldown
  globalCooldown: number
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
  cmdType: CommandsTypeStrings
  type: ApplicationCommandType
  test: boolean
  ephemeral: boolean
  hidden: boolean
  run: (options: any) => CommandReturnType
  error: (options: any, error: any) => CommandReturnType
}

export interface BaseRunOptions {
  client: QuantyClient
  message: Message
  interaction: CommandInteraction
  args: string[]
  member: GuildMember
  guild: Guild
  channel: TextBasedChannel
  options: CommandInteractionOptionResolver
}

export interface ICooldown {
  uses: number
  timeout: number
  includeOwners: boolean
}

export type IActiveUserCooldown = ICooldown

export interface CooldownObject {
  start: number
  uses: number
  timeout?: Timer
}

export enum CommandTypes {
  SLASH = 'slash',
  MESSAGE = 'message',
}

export type CommandsTypeStrings = keyof typeof CommandTypes
