import {
  ApplicationCommandOption,
  Collection,
  PermissionString,
} from 'discord.js'

import {
  ICommand,
  IBuildMessageCmd,
  IBuildSlashCommand,
  IRunObject,
} from '../types'
import QuantyClient from '../client'
import Logger from './logger'

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
  readonly guildOnly: boolean
  readonly ownerOnly: boolean
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
  readonly testOnly: boolean
  readonly slash: boolean | 'both'
  readonly run: (inputs: any) => Promise<any>
  readonly error?: (inputs: any) => Promise<any>
  readonly ephemeral: boolean
  readonly hidden: boolean

  /**
   *
   * @param {QuantyClient} client Client Object from Discord.js
   * @param name Name of the command
   * @param run Run function of the command
   * @param error Error function fo the command
   * @param {ICommand} extra Optional Parameters for commands
   */
  constructor(
    client: QuantyClient,
    name: string,
    run: (inputs: any) => Promise<any>,
    error: ((options: IRunObject<'any'>) => any) | undefined,
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
      slash = 'both',
      maxArgs,
      minArgs = 1,
      clientPermissions = ['SEND_MESSAGES'],
      guildOnly = true,
      nsfw = false,
      ownerOnly = false,
      testOnly = false,
      ephemeral = false,
      hidden = false,
    }: ICommand<'any'>,
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
    this.guildOnly = guildOnly
    this.nsfw = nsfw
    this.ownerOnly = ownerOnly
    this.slash = slash
    this.testOnly = testOnly
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
  async runMsgCommand(options?: IBuildMessageCmd) {
    if (!options) {
      return
    }

    const { message } = options

    if (this.slash == true) {
      return
    }

    if (!message) {
      return
    }

    const reply = await this.run(options)

    if (!reply) {
      return
    }

    message.reply(reply)
  }

  async runSlashCommand(options?: IBuildSlashCommand) {
    if (!options) {
      return
    }

    const { interaction } = options

    if (this.slash == false) {
      return
    }

    if (!interaction) {
      return
    }

    const reply = await this.run(options)

    if (!reply) {
      return
    }

    interaction.editReply(reply)
  }
}

export default Command
