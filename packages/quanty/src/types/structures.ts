import { Collection } from 'discord.js'
import { Socket } from 'socket.io-client'
import { Command } from 'structures'
import { BaseFeature } from 'types'

import { guildsDocument, guildsObject, guilds } from './mongoose.gen'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFeatureHandler {
  features: Collection<string, BaseFeature>
}

export interface ICommandHandler {
  readonly categories: Set<string>

  readonly commands: Collection<string, Command>
  readonly aliases: Collection<string, Command>
  readonly cooldowns: Collection<string, number>

  /**
   * @returns {Command} Returns all commands.
   */
  getCommands(): Command[] | undefined

  /**
   * Gets a single command when supplied with an existing name.
   * @returns {Command} Returns a single command.
   */
  getCommand(name: string): Command | undefined

  /**
   * Deletes all commands
   */
  sweepCommands(): void
  /**
   * Deletes Commands
   * @param name Name of Command
   */
  deleteCommand(name: string): void
}

export interface IGuildManager {
  readonly guilds: Collection<string, guildsDocument>

  findGuild(guildId: string): guildsDocument | undefined
  updateGuildById(
    guildId: string,
    data: guildsDocument,
  ): guildsDocument | undefined
  getPrefixAndUpdate(
    guildId: string,
    prefix: string,
  ): Promise<guildsDocument | undefined>
  getPrefix(guildId: string): string
}

export interface ILogger {
  /**
   * Debug Logger - Only visible when `Debug` is true in Client Config.
   * @param msg Message Content
   * @param extra Extra Objects
   */
  debug(msg: string, ...extra: any[]): void
  /**
   * Warn Logger - Only visible when `Show Warn` is true in Client Config.
   * @param msg Message Content
   * @param error Error Object
   */
  warn(msg: string, ...error: any[]): void
  /**
   * Error Logger - Logs error message along with error object.
   * @param msg Message Content
   * @param error Error Object
   */
  error(msg: string, error?: any): void
  /**
   * Info Logger - Logs informational text.
   *
   * Useful for common init logs.
   * @param msg Message Content
   */
  info(msg: string): void
  /**
   * Success Logger - Sends a success log with big green check mark.
   * @param msg Message Content
   */
  success(msg: string): void
  /**
   * Fatal Logger - Sends a fatal message warning of possible failure.
   *
   * Please use only when needed, use warn or error if possible.
   * @param msg Message Content | Error Object
   * @param error Error Object
   */
  fatal(msg: string | Error, error?: any): void
}

export type GuildCollection = Collection<string, guildsDocument>

export interface IPluginManager {
  createGuild(guildId: string): Promise<guildsDocument>
  createAllGuilds(): Promise<guildsObject[]>
  getGuild(guildId: string): Promise<guildsObject>
}

export interface IWebSocketManager {
  socket: Socket | undefined

  receivePrefixUpdate(): void
  receiveAutoMod(): void
  receiveModerationPlugin(): void
  receiveBlacklistedWords(): void
  receiveImmortality(): void
  receiveMusicPlugin(): void
  receiveMusicChannel(): void
}

export interface IDatabase {
  ping(): Promise<number>
}

export enum GuildSettingsEnum {
  ANIME = 'anime',
  MODERATION = 'moderation',
  MUSIC = 'music',
  BANNEDWORDS = 'blacklistedWords',
  CUSTOMCOMMAND = 'customCommands',
  PREFIX = 'prefix',
}

export type GuildSettingsType = keyof typeof GuildSettingsEnum

type GuildObject<T extends GuildSettingsEnum> = Pick<guilds, T>

type Keys<T> = T extends Record<string, infer U> ? U : never

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
  : never
