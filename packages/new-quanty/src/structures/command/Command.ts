import {
  ApplicationCommandOptionData,
  PermissionString,
  Collection,
  Snowflake,
} from 'discord.js'

import {
  CommandsTypeStrings,
  CooldownObject,
  ICommandOptions,
  ICooldown,
} from './typings/Command'

import { Logger, logger } from '../../util/Logger'
import { QuantyClient } from '../client/Client'

export abstract class Command<C extends QuantyClient = QuantyClient>
  implements ICommandOptions
{
  private client!: C

  public _className!: string

  @logger()
  private _logger!: Logger

  public cmdType!: CommandsTypeStrings

  public name!: string

  public description!: string

  public category!: string

  public aliases!: string | string[]

  public options!: ApplicationCommandOptionData[]

  public guildOnly!: boolean

  public ownerOnly!: boolean

  public nsfwOnly!: boolean

  public userPermissions!: PermissionString[]

  public clientPermissions!: PermissionString[]

  public cooldown!: ICooldown

  public userCooldowns: Collection<Snowflake, CooldownObject> = new Collection()

  public globalCooldown!: number

  public guildCooldowns: Collection<Snowflake, number> = new Collection()

  protected constructor(commandOptions?: ICommandOptions) {
    if (commandOptions) {
      if (commandOptions.name) this.name = commandOptions.name
      if (commandOptions.description)
        this.description = commandOptions.description
      if (commandOptions.category) this.category = commandOptions.category
      if (commandOptions.ownerOnly) this.ownerOnly = commandOptions.ownerOnly
      if (commandOptions.guildOnly) this.guildOnly = commandOptions.guildOnly
      if (commandOptions.aliases) this.aliases = commandOptions.aliases
      if (commandOptions.cooldown) this.cooldown = commandOptions.cooldown
      if (commandOptions.globalCooldown)
        this.globalCooldown = commandOptions.globalCooldown
      if (commandOptions.options) this.options = commandOptions.options
      if (commandOptions.userPermissions)
        this.userPermissions = commandOptions.userPermissions
      if (commandOptions.clientPermissions)
        this.clientPermissions = commandOptions.clientPermissions
    }

    this.verifyOptions()
  }

  public _init(client: C): this {
    this.client = client
    if (!this.name)
      throw new TypeError('Cannot register command without a name.')
    if (!this.description && this.cmdType == 'SLASH')
      throw new TypeError('Cannot register slash command without a description')

    return this
  }

  public userCooldown(userId: Snowflake): CooldownObject | null {
    if (this.client.owner.includes(userId) || !this.cooldown) return null

    let cooldown = this.userCooldowns.get(userId)

    if (!cooldown) {
      cooldown = {
        start: Date.now(),
        uses: 0,
        timeout: this.client.setTimeout(() => {
          this.userCooldowns.delete(userId)
        }, this.cooldown.timeout * 1000),
      }

      this.userCooldowns.set(userId, cooldown)
    }

    return cooldown
  }

  abstract run(): void

  abstract error(): void

  private verifyOptions() {
    const log = this._logger.debug

    if (this.cooldown && this.globalCooldown) {
      log(
        `Command ${this.name} has both guild and global cooldowns! Please choose one!`,
      )
    }
  }
}
