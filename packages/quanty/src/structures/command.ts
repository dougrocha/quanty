import { Nullable } from 'discord-api-types/utils/internals'
import {
  ApplicationCommandOption,
  ApplicationCommandType,
  Collection,
  PermissionString,
} from 'discord.js'

import Logger from './logger'

import QuantyClient from '../client'
import {
  BaseCommand,
  CommandReturnType,
  CommandTypes,
  MessageRunOptions,
  SlashRunOptions,
} from '../types'

/**
 * Command Class
 */
class Command {
  private client: QuantyClient

  private logger: Logger = new Logger('Command Class', false)

  readonly name: string

  readonly aliases?: string[]

  readonly category?: string

  readonly description: string

  readonly options?: ApplicationCommandOption[]

  readonly isGuildOnly: boolean

  readonly isOwnerOnly: boolean

  readonly nsfw: boolean

  readonly userPermissions?: PermissionString[]

  readonly clientPermissions: PermissionString[]

  readonly expected?: string[]

  readonly format?: string

  readonly minArgs?: number

  readonly maxArgs?: number

  readonly cooldown?: number

  readonly userCooldowns: Collection<string, number> = new Collection()

  readonly globalCooldown?: number

  readonly guildCooldowns: Collection<string, number> = new Collection()

  readonly test: boolean

  readonly cmdType: CommandTypes

  readonly type?: ApplicationCommandType

  readonly run: (options: any) => CommandReturnType

  readonly error?: (options: any, error: any) => CommandReturnType

  readonly ephemeral: boolean

  readonly hidden: boolean

  constructor(
    client: QuantyClient,
    name: string,
    run: (options: any) => CommandReturnType,
    {
      aliases,
      category,
      cooldown,
      description,
      expected,
      format,
      globalCooldown,
      options,
      userPermissions,
      cmdType = 'both',
      maxArgs,
      type,
      minArgs = 1,
      clientPermissions = ['SEND_MESSAGES'],
      isGuildOnly = true,
      nsfw = false,
      isOwnerOnly = false,
      test = false,
      ephemeral = false,
      hidden = false,
    }: BaseCommand,
    error?: (options: any, error: any) => CommandReturnType,
  ) {
    this.client = client
    this.name = name
    this.run = run
    this.error = error
    this.aliases = aliases
    this.category = category
    this.clientPermissions = clientPermissions
    this.cooldown = cooldown
    this.description = description
    this.expected = expected
    this.format = format
    this.minArgs = minArgs
    this.maxArgs = maxArgs
    this.globalCooldown = globalCooldown
    this.options = options
    this.userPermissions = userPermissions
    this.isGuildOnly = isGuildOnly
    this.nsfw = nsfw
    this.isOwnerOnly = isOwnerOnly
    this.type = type
    this.cmdType = cmdType
    this.test = test
    this.ephemeral = ephemeral
    this.hidden = hidden

    if (this.cooldown && this.globalCooldown) {
      throw new Error(
        `Command ${this.name} has both guild and global cooldowns! Please choose one!`,
      )
    }
    if (this.minArgs < 0) {
      throw new Error(`Command ${this.name} has a minArgs below 0!`)
    }
    if (this.maxArgs ?? 0 < -1) {
      throw new Error(`Command ${this.name} has a maxArgs below -1!`)
    }
    if (this.maxArgs !== -1 && this.minArgs > (this.maxArgs ?? 9999)) {
      throw new Error(
        `Command ${this.name} has a minArgs that is higher than the maxArgs!`,
      )
    }
  }

  /**
   * @param options Options for commands
   * Please use all that you can provide in case you need anything in the future.
   */
  async runMsgCommand(options?: Nullable<MessageRunOptions>) {
    if (this.cmdType == 'slash') {
      return
    }

    if (!options) {
      return
    }

    const { message } = options

    if (!message) {
      return
    }

    const reply = await this.run(options)

    if (!reply) {
      return
    }

    await message.reply(reply)
  }

  async runSlashCommand(options?: Nullable<SlashRunOptions>) {
    if (this.cmdType == 'message') {
      return
    }

    if (!options) {
      return
    }

    const { interaction } = options

    if (!interaction) {
      return
    }

    const reply = await this.run(options)

    if (!reply) {
      return
    }

    await interaction.reply(reply)
  }
}

export default Command
