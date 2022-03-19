import {
  ApplicationCommandOptionData,
  PermissionString,
  Collection,
  Snowflake,
  Interaction,
  CommandInteraction,
  TextChannel,
  DMChannel,
} from 'discord.js'

import {
  AsyncCommandReturnType,
  ICommandOptions,
  IVerifyReturnObj,
  SlashCommandRunOptions,
} from './types/Command'
import { CooldownObject, ICooldownOptions } from './types/Cooldown'

import { CommandVerificationError } from '../../errors/Errors'
import { Logger, logger } from '../../util/Logger'
import { QuantyClient } from '../client/Client'

export abstract class Command<C extends QuantyClient = QuantyClient>
  implements ICommandOptions
{
  private client!: C

  public _className!: string

  @logger()
  private _logger!: Logger

  public commandName!: string

  public description!: string

  public category!: string

  public aliases!: string | string[]

  public options!: ApplicationCommandOptionData[]

  public guildOnly!: boolean

  public ownerOnly!: boolean

  public nsfwOnly!: boolean

  public userPermissions!: PermissionString[]

  public clientPermissions!: PermissionString[]

  public extendedVerify!: (
    interaction: Interaction,
    client: C,
  ) => IVerifyReturnObj

  public customVerify!: (
    interaction: Interaction,
    client: C,
  ) => IVerifyReturnObj

  public test!: boolean

  public cooldown!: ICooldownOptions

  public userCooldowns: Collection<Snowflake, CooldownObject> = new Collection()

  public guildCooldown!: number

  public guildCooldowns: Collection<Snowflake, number> = new Collection()

  protected constructor(commandOptions?: ICommandOptions) {
    if (commandOptions) {
      if (commandOptions.commandName)
        this.commandName = commandOptions.commandName
      if (commandOptions.description)
        this.description = commandOptions.description
      if (commandOptions.category) this.category = commandOptions.category
      if (commandOptions.ownerOnly) this.ownerOnly = commandOptions.ownerOnly
      if (commandOptions.guildOnly) this.guildOnly = commandOptions.guildOnly
      if (commandOptions.aliases) this.aliases = commandOptions.aliases
      if (commandOptions.cooldown) this.cooldown = commandOptions.cooldown
      if (commandOptions.guildCooldown)
        this.guildCooldown = commandOptions.guildCooldown
      if (commandOptions.options) this.options = commandOptions.options
      if (commandOptions.userPermissions)
        this.userPermissions = commandOptions.userPermissions
      if (commandOptions.clientPermissions)
        this.clientPermissions = commandOptions.clientPermissions
    }
  }

  public _init(client: C): this {
    this.client = client
    if (!this.commandName)
      throw new TypeError('Cannot register a command without a name.')

    return this
  }

  public getUserCooldown(userId: Snowflake): CooldownObject | null {
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

  abstract run(options?: SlashCommandRunOptions): AsyncCommandReturnType

  abstract error(): void

  private async verifyOptions(
    interaction: CommandInteraction,
    client: C,
  ): Promise<IVerifyReturnObj> {
    if (!client && !this.client)
      throw new CommandVerificationError(
        `Command: ${this.commandName} cannot verify without client.`,
      )
    if (this.cooldown && this.guildCooldown)
      throw new CommandVerificationError(
        `Command: ${this.commandName} has both user and guild cooldowns. Please choose one!`,
      )

    if (this.customVerify !== undefined) {
      this.customVerify(interaction, client)
      return { customVerify: true }
    }

    if (this.extendedVerify !== undefined) {
      this.extendedVerify(interaction, client)
    }

    const { guild, channel, user } = interaction

    if (this.ownerOnly && !this.client.checkOwner(user.id))
      return { owner: true }

    if (this.cooldown) {
      const cooldown = this.getUserCooldown(user.id)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      cooldown!.uses++

      if (cooldown && cooldown.uses > this.cooldown.uses) {
        const timeout =
          (cooldown.start + this.cooldown.timeout * 1000 - Date.now()) / 1000
        await interaction.reply(
          `This command is on cooldown for ${timeout.toFixed(2)} seconds`,
        )
        return { cooldown: true }
      }
    }

    if (
      this.userPermissions &&
      user.id != guild?.ownerId &&
      interaction.memberPermissions?.has(this.userPermissions)
    )
      return { userPerms: true }

    if (
      this.client.user &&
      channel &&
      this.clientPermissions &&
      guild?.members.cache
        .get(this.client.user?.id)
        ?.permissionsIn(channel?.id)
        .missing(this.clientPermissions)
    )
      return { clientPerms: true }

    if (guild && this.nsfwOnly && (channel as TextChannel).nsfw)
      return { nsfw: true }
    if (this.guildOnly && !guild) return { guild: true }
    if (channel as DMChannel) return { dm: true }

    return { channel: true }
  }
}
